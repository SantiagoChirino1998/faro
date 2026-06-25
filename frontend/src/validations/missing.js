import { z } from 'zod';

const TELEFONO_INTERNACIONAL_REGEX = /^\+?[0-9\s\-]+$/;

export const registerMissingSchema = z.object({
  nombreCompleto: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  sexo: z.enum(['M', 'F', 'Otro'], {
    errorMap: () => ({ message: 'Debe seleccionar un sexo' }),
  }),
  edad: z.coerce.number().int().min(0, 'La edad no puede ser negativa').max(120, 'Edad inválida'),
  ultimaUbicacion: z.string().min(3, 'Indique la última ubicación conocida'),
  telefonoContacto: z
    .string()
    .min(7, 'El teléfono es muy corto')
    .regex(TELEFONO_INTERNACIONAL_REGEX, 'Formato de teléfono inválido (solo números, espacios, guiones o + al inicio)'),
  rasgosParticulares: z.string().optional(),
});
