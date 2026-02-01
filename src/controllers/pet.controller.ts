import { Request, Response } from 'express';
import Pet from '../models/pet.model';
import { validationResult } from 'express-validator';
import { JwtPayload } from '../services/auth.service';

// Función para registrar una nueva mascota (solo para usuarios logeados)
export const createPet = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // El ID del dueño se obtiene del token JWT que adjuntamos en el middleware authenticate
    const user = (req as any).user as JwtPayload; 
    const ownerId = user.id;

    const { name, species, breed, age } = req.body;

    const newPet = new Pet({
      name,
      species,
      breed,
      age,
      owner: ownerId, // Asignamos el dueño automáticamente
    });

    const savedPet = await newPet.save();
    return res.status(201).json(savedPet);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al registrar la mascota' });
  }
};

// Función para listar las mascotas de un usuario específico
export const getMyPets = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user as JwtPayload;
        const ownerId = user.id;

        // Busca todas las mascotas que coincidan con el ownerId
        const pets = await Pet.find({ owner: ownerId });
        return res.json(pets);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener las mascotas' });
    }
};
