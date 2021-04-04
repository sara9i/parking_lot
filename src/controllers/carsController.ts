/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as CarService from "../services/cars.service";
import { BaseCar, Car } from "../models/car.interface";

/**
 * Controller Definitions
 */
export const getCar = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const car: Car = await CarService.find(id);

    if (car) {
      return res.status(200).send(car);
    }

    res.status(404).send("car not found");
  } catch (e) {
    res.status(500).send(e.message);
  }
}
export const listCar = async (req: Request, res: Response) => {
  try {
    const cars: Car[] = await CarService.findAll();

    res.status(200).send(cars);
  } catch (e) {
    res.status(500).send(e.message);
  }
}
export const createCar = async (req: Request, res: Response) => {
  try {
    const car: BaseCar = req.body;

    const newCar = await CarService.create(car);

    res.status(201).json(newCar);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
}
export const updateCar = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const carUpdate: Car = req.body;

    const existingCar: Car = await CarService.find(id);

    if (existingCar) {
      const updatedCar = await CarService.update(id, carUpdate);
      return res.status(200).json(updatedCar);
    }

    const newCar = await CarService.create(carUpdate);

    res.status(201).json(newCar);
  } catch (e) {
    res.status(500).send(e.message);
  }
}
export const deleteCar = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await CarService.remove(id);

    res.sendStatus(204);
  } catch (e) {
    res.status(500).send(e.message);
  }
}