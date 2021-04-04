/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as SlotService from "../services/parking_slots.service";
import { BaseSlot, Slot } from "../models/parking_slot.interface";

/**
 * Controller Definitions
 */
export const getSlot = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const slot: Slot = await SlotService.find(id);

    if (slot) {
      return res.status(200).send(slot);
    }

    res.status(404).send("slot not found");
  } catch (e) {
    res.status(500).send(e.message);
  }
}
export const listSlot = async (req: Request, res: Response) => {
  try {
    const slots: Slot[] = await SlotService.findAll();

    res.status(200).send(slots);
  } catch (e) {
    res.status(500).send(e.message);
  }
}
export const createSlot = async (req: Request, res: Response) => {
  try {
    const slot: BaseSlot = req.body;

    const newSlot = await SlotService.create(slot);

    res.status(201).json(newSlot);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
}
export const updateSlot = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const slotUpdate: Slot = req.body;

    const existingSlot: Slot = await SlotService.find(id);

    if (existingSlot) {
      const updatedSlot = await SlotService.update(id, slotUpdate);
      return res.status(200).json(updatedSlot);
    }

    const newSlot = await SlotService.create(slotUpdate);

    res.status(201).json(newSlot);
  } catch (e) {
    res.status(500).send(e.message);
  }
}
export const deleteSlot = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await SlotService.remove(id);

    res.sendStatus(204);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

