/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as parkingSlotController from "../controllers/parkingSlotController";
import {parkingSlotRouter} from "./parking_slots.router";
import {carsRouter} from "./cars.router";
export const mainRouter = express.Router();
mainRouter.use('/cars', carsRouter);
mainRouter.use('/parking', parkingSlotRouter);
mainRouter.post("/park", async (req: Request, res: Response) => {
    parkingSlotController.parkCar(req, res);
});
mainRouter.delete("/unpark/:slot_number", async (req: Request, res: Response) => {
    parkingSlotController.unparkCar(req, res);
});
mainRouter.get("/get-info", async (req: Request, res: Response) => {
    parkingSlotController.getInfo(req, res);
});