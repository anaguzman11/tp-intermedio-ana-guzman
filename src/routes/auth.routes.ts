import { Router } from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/auth.controller';

const router = Router();

// Ruta POST para registrar un nuevo usuario
router.post(
  '/register',
  [
    // Validación básica con express-validator
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('email').isEmail().withMessage('El email debe ser válido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    // body('role') es opcional y se valida en el modelo (enum)
  ],
  register
);

// Ruta POST para iniciar sesión
router.post(
  '/login',
  [
    // Validación básica de login
    body('email').isEmail().withMessage('El email debe ser válido'),
    body('password').notEmpty().withMessage('La contraseña es requerida'),
  ],
  login
);

export default router;

