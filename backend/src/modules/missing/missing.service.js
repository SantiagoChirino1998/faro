import MissingPerson from './missing.model.js';
import { cacheGet, cacheSet, cacheInvalidateByPrefix, cacheDelete } from '../../infrastructure/cache.js';

// TTL de caché para lecturas públicas: 5 minutos
const CACHE_TTL = 5 * 60 * 1000;
const STATS_KEY = 'missing:stats';
const LIST_PREFIX = 'missing:list:';

/**
 * Registra una nueva persona desaparecida e invalida la caché del listado
 * y las estadísticas para que la próxima lectura refleje el nuevo registro.
 */
export const registerMissing = async (data, file) => {
  const newPerson = new MissingPerson({
    ...data,
    fotoUrl: file?.path || data.fotoUrl || null, // Cloudinary secure_url from Multer or directly from frontend
  });
  await newPerson.save();

  // Invalidar toda la caché del listado y stats al registrar una persona nueva
  cacheInvalidateByPrefix(LIST_PREFIX);
  cacheDelete(STATS_KEY);

  return newPerson;
};

/**
 * Lista las personas desaparecidas con paginación y búsqueda.
 * Sirve desde caché en memoria si está disponible (TTL: 5 min).
 * Las búsquedas con texto libre no se cachean para evitar
 * acumulación de entradas arbitrarias en memoria.
 */
export const listMissing = async ({ page = 1, limit = 20, search = '', estado = 'DESAPARECIDO', sexo = '' }) => {
  // Solo cachear consultas sin búsqueda de texto libre (navegación normal)
  const shouldCache = !search;
  // Aislamos la caché por estado y sexo para evitar colisiones entre filtros
  const cacheKey = `${LIST_PREFIX}${estado || 'all'}:${sexo || 'all'}:p${page}:l${limit}`;

  if (shouldCache) {
    const cached = cacheGet(cacheKey);
    if (cached) return cached;
  }

  const query = {};

  if (estado) {
    query.estado = estado;
  }

  if (sexo) {
    query.sexo = sexo;
  }

  if (search) {
    // Búsqueda parcial e insensible a mayúsculas/minúsculas en el nombre
    query.nombreCompleto = { $regex: search, $options: 'i' };
  }

  const skip = (Number(page) - 1) * Number(limit);
  const total = await MissingPerson.countDocuments(query);

  const items = await MissingPerson.find(query)
    .select('-__v') // Excluir campo de metadatos interno de mongoose
    .sort({ fechaRegistro: -1 })
    .skip(skip)
    .limit(Number(limit));

  const result = {
    items,
    pagination: {
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    },
  };

  if (shouldCache) {
    cacheSet(cacheKey, result, CACHE_TTL);
  }

  return result;
};

/**
 * Retorna las estadísticas de desaparecidos.
 * Cacheada en memoria durante 5 minutos.
 */
export const getStats = async () => {
  const cached = cacheGet(STATS_KEY);
  if (cached) return cached;

  const total = await MissingPerson.countDocuments();
  const encontrados = await MissingPerson.countDocuments({ estado: 'ENCONTRADO' });
  const desaparecidos = await MissingPerson.countDocuments({ estado: 'DESAPARECIDO' });

  const result = { total, encontrados, desaparecidos };
  cacheSet(STATS_KEY, result, CACHE_TTL);

  return result;
};

/**
 * Marca a una persona desaparecida como ENCONTRADA.
 * Registra los datos cívicos del informante e invalida la caché del listado y estadísticas.
 */
export const markAsFound = async (id, { nombre, email }) => {
  const missing = await MissingPerson.findById(id);
  if (!missing) {
    const error = new Error('No se encontró el registro de la persona.');
    error.status = 404;
    throw error;
  }

  if (missing.estado === 'ENCONTRADO') {
    const error = new Error('Este caso ya ha sido marcado como encontrado anteriormente.');
    error.status = 400;
    throw error;
  }

  // Actualizar estado y guardar informante
  missing.estado = 'ENCONTRADO';
  missing.reportadoEncontradoPor = {
    nombre,
    email,
    fechaReporte: new Date(),
  };

  await missing.save();

  // Invalidar caché pública para que se reflejen los cambios al instante
  cacheInvalidateByPrefix(LIST_PREFIX);
  cacheDelete(STATS_KEY);

  return missing;
};
