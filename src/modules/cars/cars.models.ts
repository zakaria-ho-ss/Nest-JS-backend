import * as mongoose from 'mongoose';

export class newCarsDTO {
  modele: string;
  marque: string;
  kilometrage: number;
  puissance_fiscale: number;
}
export class updateCarsDTO {}

export const CarsSchema = new mongoose.Schema({
  modele: { type: String, required: true },
  marque: { type: String, required: true },
  kilometrage: { type: Number, required: true },
  puissance_fiscale: { type: Number, required: true },
});

export interface Car extends mongoose.Document {
  id: string;
  modele: string;
  marque: string;
  kilometrage: number;
  puissance_fiscale: number;
}
