import { Router } from 'express';
import { register, list, stats } from './missing.controller.js';
import validate from '../../shared/middleware/validate.js';
import { registerMissingSchema } from './missing.validation.js';
import { upload } from './middleware/upload.js';

const router = Router();

// Rutas públicas de desaparecidos
router.get('/stats', stats);
router.get('/', list);
router.post('/', upload.single('foto'), validate(registerMissingSchema), register);

export default router;
