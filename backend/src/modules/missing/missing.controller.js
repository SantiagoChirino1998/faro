import { registerMissing } from './missing.service.js';

export const register = async (req, res, next) => {
  try {
    const missing = await registerMissing(req.body, req.file);
    res.status(201).json({ success: true, data: missing });
  } catch (error) {
    next(error);
  }
};
