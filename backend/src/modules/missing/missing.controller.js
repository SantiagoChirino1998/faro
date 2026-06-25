import { registerMissing, listMissing, getStats } from './missing.service.js';

export const register = async (req, res, next) => {
  try {
    const missing = await registerMissing(req.body, req.file);
    res.status(201).json({ success: true, data: missing });
  } catch (error) {
    next(error);
  }
};

export const list = async (req, res, next) => {
  try {
    const { page, limit, search, estado } = req.query;
    const result = await listMissing({ page, limit, search, estado });
    res.json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

export const stats = async (req, res, next) => {
  try {
    const result = await getStats();
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
