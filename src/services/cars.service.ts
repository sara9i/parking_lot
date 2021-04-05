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

export const find = async (car_number: string): Promise<Car> => cars[car_number];
export const validateCarNumber = function(car_number: string){
  //this regex in only for alphanumberic. This means, empty string will also return false which consequently handles for car_number as required field as well
  const regex = /^[A-Z]*[0-9]/
  return regex.test(car_number)
}
const validateFields = function(car: Car){
  return validateCarNumber(car["car_number"]);
}
export const create = async (newCar: Car): Promise<Car> => {
  if(cars[newCar["car_number"]]){
    throw Error("Car Number Must Be Unique!");
  }
  else if(newCar["car_number"] && validateFields(newCar)){
    cars[newCar["car_number"]] = newCar;
    return newCar;
  }
  throw Error("Invalid Fields");
};

  export const update = async (
    car_number: string,
    carUpdate: BaseCar
  ): Promise<Car | null> => {
    const car = await find(car_number);
  
    if (!car) {
      throw Error("Car Not Found!");
    }
    if(car["car_number"] && validateCarNumber(car_number)){
      cars[car_number] = { car_number, ...carUpdate };
      return cars[car_number];
    }
    return null;
  
    
  };

  export const remove = async (car_number: string): Promise<null | void> => {
    
    if(validateCarNumber(car_number)){
      throw Error("Invalid Car Number!");
    }
    const car = await find(car_number);
  
    if (!car) {
      throw Error("Car Not Found!");
    }
  
    delete cars[car_number];
  };