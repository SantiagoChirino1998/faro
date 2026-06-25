import axios from 'axios';

// Usamos una instancia limpia de axios ya que este endpoint es público
// y no necesita interceptores de autenticación
const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

export const registerMissing = async (formData) => {
  const { data } = await publicApi.post('/missing', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const getMissing = async ({ page = 1, limit = 10, search = '', estado = 'DESAPARECIDO' } = {}) => {
  const { data } = await publicApi.get('/missing', {
    params: { page, limit, search, estado },
  });
  return data;
};

export const getStats = async () => {
  const { data } = await publicApi.get('/missing/stats');
  return data.data;
};
