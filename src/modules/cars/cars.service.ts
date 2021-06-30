import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car, newCarsDTO, updateCarsDTO } from './cars.models';

@Injectable()
export class CarsService {
  constructor(@InjectModel('Cars') private readonly carsModel: Model<Car>) {}
  async create(createCarsDto: newCarsDTO) {
    const newCar = new this.carsModel({
      modele: createCarsDto.modele,
      marque: createCarsDto.marque,
      kilometrage: createCarsDto.kilometrage,
      puissance_fiscale: createCarsDto.puissance_fiscale,
    });
    const result = await newCar.save();
    return result;
  }

  findAll() {
    return `This action returns all cars`;
  }

  findOne(id: number) {
    return `This action returns a #${id} car`;
  }

  update(id: number, updateCarDto: updateCarsDTO) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
