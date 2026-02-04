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

    const user = (req as any).user as JwtPayload; 
    const ownerId = user.id;

    const { name, species, breed, age } = req.body;

    const newPet = new Pet({
      name,
      species,
      breed,
      age,
      owner: ownerId, 
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

        // Busca todas las mascotas, y **popula** los campos 'name' y 'email' del dueño
        const pets = await Pet.find({ owner: ownerId }).populate('owner', 'name email'); 
        return res.json(pets);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener las mascotas' });
    }
};

// Función para obtener los detalles de una mascota específica por su ID
export const getPetById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Capturamos el ID que viene en la URL de Insomnia

    // findById busca el documento y **popula** los datos del dueño
    const pet = await Pet.findById(id).populate('owner', 'name email');

    if (!pet) {
      return res.status(404).json({ error: "Mascota no encontrada" });
    }

    return res.json(pet); // Devuelve la mascota encontrada con los datos completos del dueño

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener la mascota por ID' });
  }
};
