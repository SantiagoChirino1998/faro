import MissingPerson from './missing.model.js';

export const registerMissing = async (data, file) => {
  const newPerson = new MissingPerson({
    ...data,
    fotoUrl: file?.path || null, // Cloudinary devolverá 'path' como secure_url
  });
  await newPerson.save();
  return newPerson;
};
