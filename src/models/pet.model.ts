import { Schema, model, Document, Types } from 'mongoose';

// 1. Definir la interfaz TypeScript para la mascota
export interface IPet extends Document {
  name: string;
  species: 'Dog' | 'Cat' | 'Bird' | 'Other'; // Especie de la mascota
  breed: string; // Raza
  age: number;
  owner: Types.ObjectId; // Referencia al ID del dueño (Usuario/Cliente)
}

// 2. Definir el Esquema de Mongoose
const PetSchema = new Schema<IPet>({
  name: { type: String, required: true, trim: true },
  species: { type: String, required: true, enum: ['Dog', 'Cat', 'Bird', 'Other'] },
  breed: { type: String, required: true, trim: true },
  age: { type: Number, required: true, min: 0 },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Establece la relación con el modelo 'User'
});

// 3. Exportar el modelo
export default model<IPet>('Pet', PetSchema);
