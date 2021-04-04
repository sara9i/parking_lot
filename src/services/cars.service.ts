// src/cars/cars.service.ts

/**
 * Data Model Interfaces
 */

import { BaseCar, Car } from "../models/car.interface";
import { Cars } from "../models/cars.interface";


/**
 * In-Memory Store
 */
let cars: Cars = {};


/**
 * Service Methods
 */

export const findAll = async (): Promise<Car[]> => Object.values(cars);

export const find = async (car_number: number): Promise<Car> => cars[car_number];
const validateCarNumber = function(car){
  //this regex in only for alphanumberic. This means, empty string will also return false which consequently handles for car_number as required field as well
  const regex = /^[A-Z]*[0-9]/
  return regex.test(car)
}
const validateFields = function(car){
  return validateCarNumber(car["car_number"]);
}
export const create = async (newCar: BaseCar): Promise<Car> => {
  if(newCar["car_number"] && validateFields(car_number)){
    cars[car_number] = newCar;
    return newCar;
  }
  throw Error("Invalid Fields");
};

  export const update = async (
    car_number: number,
    carUpdate: BaseCar
  ): Promise<Car | null> => {
    const car = await find(car_number);
  
    if (!car) {
      throw Error("Car Not Found!");
    }
    if(newCar["car_number"] && validateFields(carUpdate)){
      cars[car_number] = { car_number, ...carUpdate };
      return cars[car_number];
    }
  
    
  };

  export const remove = async (car_number: number): Promise<null | void> => {
    const car = await find(car_number);
  
    if (!car) {
      throw Error("Car Not Found!");
    }
  
    delete cars[car_number];
  };