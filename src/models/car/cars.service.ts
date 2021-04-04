// src/cars/cars.service.ts

/**
 * Data Model Interfaces
 */

import { BaseCar, Car } from "../../interfaces/car.interface";
import { Cars } from "../../interfaces/cars.interface";


/**
 * In-Memory Store
 */
let cars: Cars = {};


/**
 * Service Methods
 */

export const findAll = async (): Promise<Car[]> => Object.values(cars);

export const find = async (id: number): Promise<Car> => cars[id];

export const create = async (newCar: BaseCar): Promise<Car> => {
    const id = new Date().valueOf();
  
    cars[id] = {
      id,
      ...newCar,
    };
  
    return cars[id];
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