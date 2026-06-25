import { Router } from 'express';
import { register } from './missing.controller.js';
import validate from '../../shared/middleware/validate.js';
import { registerMissingSchema } from './missing.validation.js';
import { upload } from './middleware/upload.js';

const router = Router();

// Ruta 100% pública para registrar desaparecidos
router.post('/', upload.single('foto'), validate(registerMissingSchema), register);

export default router;
