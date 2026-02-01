import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { validationResult } from "express-validator";
import { Error } from 'mongoose'; // Importamos tipos de error de Mongoose

export const register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Ahora esperamos 'name', 'email', 'password' y opcionalmente 'role'
    const { name, email, password, role } = req.body; 
    
    // Pasamos el nuevo campo 'name' y 'role' al servicio
    await authService.register(name, email, password, role);

    return res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error: any) {
    // Manejo de errores de Mongoose más general
    if (error.code === 11000) {
      return res.status(409).json({ error: "El email ya está registrado" });
    }
    if (error instanceof Error.ValidationError) {
      return res.status(400).json({ error: error.message });
    }
    console.error(error);
    return res.status(500).json({ error: "Error al registrar el usuario" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const token = await authService.login(email, password);

    return res.json({ token });
  } catch (error: any) {
    if (error.message === "Credenciales inválidas" || error.message === "Usuario no encontrado") {
      return res.status(401).json({ error: error.message });
    }
    console.error(error);
    return res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

