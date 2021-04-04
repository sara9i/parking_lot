// src/cars/cars.service.ts

/**
 * Data Model Interfaces
 */

import { BaseCar, Car } from "../models/car.interface";
import { Cars } from "../models/cars.interface";


/**
 * In-Memory Store
 */
let car_id = 0;
let cars: Cars = {};


/**
 * Service Methods
 */

export const findAll = async (): Promise<Car[]> => Object.values(cars);

export const find = async (id: number): Promise<Car> => cars[id];

export const create = async (newCar: BaseCar): Promise<Car> => {
  newCar["id"] && newCar["id"] > 0 ? null : car_id++;
  
    cars[car_id] = {
      id: car_id,
      ...newCar,
    };
  
    return cars[car_id];
  };

  export const update = async (
    id: number,
    carUpdate: BaseCar
  ): Promise<Car | null> => {
    const car = await find(id);
  
    if (!car) {
      return null;
    }
  
    cars[id] = { id, ...carUpdate };
  
    return cars[id];
  };

  export const remove = async (id: number): Promise<null | void> => {
    const car = await find(id);
  
    if (!car) {
      return null;
    }
  
    delete cars[id];
  };