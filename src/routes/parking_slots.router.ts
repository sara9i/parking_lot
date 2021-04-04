/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as parkingSlotController from "../controllers/parkingSlotController";

/**
 * Router Definition
 */

export const parkingSlotRouter = express.Router();


/**
 * Controller Definitions
 */

// // GET cars
parkingSlotRouter.get("/", async (req: Request, res: Response) => {
  parkingSlotController.listSlot(req, res);
});

// GET cars/:id

parkingSlotRouter.get("/:id", async (req: Request, res: Response) => {
    parkingSlotController.getSlot(req, res);
  });

// POST cars

parkingSlotRouter.post("/", async (req: Request, res: Response) => {
    parkingSlotController.createSlot(req, res);
  });

// PUT cars/:id

parkingSlotRouter.put("/:id", async (req: Request, res: Response) => {
    parkingSlotController.updateSlot(req, res);
  });

// DELETE cars/:id
parkingSlotRouter.delete("/:id", async (req: Request, res: Response) => {
    parkingSlotController.deleteSlot(req, res);
  });