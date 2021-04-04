/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as carsController from "../controllers/carsController";

/**
 * Router Definition
 */

export const carsRouter = express.Router();


/**
 * Controller Definitions
 */

// // GET cars
carsRouter.get("/", async (req: Request, res: Response) => {
  carsController.listCar(req, res);
});

// GET cars/:car_number

carsRouter.get("/:car_number", async (req: Request, res: Response) => {
    carsController.getCar(req, res);
  });

// POST cars

carsRouter.post("/", async (req: Request, res: Response) => {
    carsController.createCar(req, res);
  });

// PUT cars/:car_number

carsRouter.put("/:car_number", async (req: Request, res: Response) => {
    carsController.updateCar(req, res);
  });

// DELETE cars/:car_number
carsRouter.delete("/:car_number", async (req: Request, res: Response) => {
    carsController.deleteCar(req, res);
  });