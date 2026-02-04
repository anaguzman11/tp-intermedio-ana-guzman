import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { createPet, getMyPets, getPetById } from '../controllers/pet.controller'; // Importamos getPetById
import { body } from 'express-validator';

const router = Router();

// Todas las rutas de abajo requieren estar logueado
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

// NUEVA RUTA: GET /api/pets/:id : Listar UNA sola mascota por su ID
// El :id es un marcador de posición para el ID real que enviarás desde Insomnia
router.get('/:id', getPetById);

export default router;
