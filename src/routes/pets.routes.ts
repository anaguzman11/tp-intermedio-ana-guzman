import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { createPet, getMyPets } from '../controllers/pet.controller';
import { body } from 'express-validator';

const router = Router();

// Ruta protegida (requiere JWT válido)
router.use(authenticate); 

// POST /api/pets/register: Registrar una nueva mascota para el usuario autenticado
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('species').isIn(['Dog', 'Cat', 'Bird', 'Other']).withMessage('Especie inválida'),
    body('breed').notEmpty().withMessage('La raza es requerida'),
    body('age').isInt({ min: 0 }).withMessage('La edad debe ser un número positivo'),
  ],
  createPet
);

// GET /api/pets/my: Listar las mascotas del usuario autenticado
router.get('/my', getMyPets);

export default router;

