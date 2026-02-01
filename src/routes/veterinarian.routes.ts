import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { getAllPets } from '../controllers/veterinarian.controller';

const router = Router();

// Aplica el middleware de autenticación a todas las rutas de este router
router.use(authenticate);

// Ruta protegida por ROL: Solo accesible para usuarios con rol 'veterinarian'
router.get('/pets', authorize("veterinarian"), getAllPets);

export default router;
