import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { CarsSchema } from './cars.models';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Cars', schema: CarsSchema }])],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
