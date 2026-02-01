import bcrypt from "bcrypt";
// Importamos el modelo User que creamos anteriormente (asumo que se llama user.model.ts)
import User, { IUser } from "../models/users.model"; 
import jwt, { SignOptions } from "jsonwebtoken";

// Define los tipos de rol permitidos
export type UserRole = 'client' | 'veterinarian' | 'admin';

// Define la estructura del payload del JWT
export interface JwtPayload {
  id: string;
  name: string; // Usamos 'name' en lugar de 'username'
  role: UserRole;
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET no definido");
}

const secretKey: string = process.env.JWT_SECRET;

/**
 * Registra un nuevo usuario
 */
export const register = async (
  name: string,
  email: string,
  password: string,
  role: UserRole = 'client' // Por defecto es cliente si no se especifica
): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 10);

  // Creamos una nueva instancia del modelo de usuario
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role, // Asignamos el rol
  });

  const savedUser = await newUser.save();

  return savedUser.id; // Retorna el ID del usuario creado
};

/**
 * Inicia sesión y genera un token JWT
 */
export const login = async (
  email: string,
  password: string,
): Promise<string> => {
  const invalidCredentialsError = new Error("Credenciales inválidas");

  // Buscamos al usuario por email usando el modelo
  const user = await User.findOne({ email });
  if (!user) throw new Error("Usuario no encontrado"); // Mensaje de error más específico

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw invalidCredentialsError;

  /**
   * Payload del token JWT
   */
  const payload: JwtPayload = {
    id: user.id,
    name: user.name, // Usamos 'name'
    role: user.role, 
  };

  /**
   * Configuración del token JWT
   */
  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN as any) || "1h",
    issuer: "patitas-felices-api", // Cambiamos el emisor
  };

  /**
   * Generación del token JWT
   */
  return jwt.sign(payload, secretKey, options);
};
