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
