/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as SlotService from "../services/parking_slots.service";
import * as CarService from "../services/cars.service";
import { BaseSlot, Slot } from "../models/parking_slot.interface";
import { Car } from "../models/car.interface";

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

    return res.status(404).send("slot not found");
  } catch (e) {
    return res.status(500).send(e.message);
  }
}
export const listSlot = async (req: Request, res: Response) => {
  try {
    const slots: Slot[] = await SlotService.findAll();

    return res.status(200).send(slots);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}
export const createSlot = async (req: Request, res: Response) => {
  try {
    const slot: BaseSlot = req.body;

    const newSlot = await SlotService.create(slot);

    return res.status(201).json(newSlot);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e.message);
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

    return res.status(201).json(newSlot);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}
export const deleteSlot = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await SlotService.remove(id);

    return res.sendStatus(204);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

export const parkCar = async (req: Request, res: Response) => {
  try{
    let car_number = req.body.car_number;
    const car: Car = await CarService.find(car_number);
    if(!car){
      throw Error("Car Not Found!");
    }
    if(!CarService.validateCarNumber(car_number)){
      throw Error("Invalid Car Number!");
    }
    let parking = await SlotService.findAll();
    if(!parking || parking.length <= 0){
      return res.status(400).json("Parking is full");
    }
    for (let slot=0; slot<parking.length ; slot++){
      if(!parking[slot]["car_number"] || parking[slot]["car_number"] == ""){
        parking[slot]["car_number"] = car_number;
        parking[slot] = await SlotService.update(parking[slot].id, parking[slot]);
        return res.status(200).json(parking[slot]);
      }
    }
    return res.status(400).json("Parking is full");
  }catch(e){
    return res.status(500).send(e.message);
  }
}
export const unparkCar = async (req: Request, res: Response) => {
  try{
    const slot_number: number = parseInt(req.params.slot_number, 10);
    let parking: Slot = await SlotService.find(slot_number);
    if(!parking){
      return res.status(400).json("Parking Slot not found!");
    }
    if(!SlotService.validateSlotNumber(slot_number)){
      return res.status(400).json("Invalid Slot Number!");
    }
    else if(!parking["car_number"] || parking["car_number"]==""){
      return res.status(200).json("Parking Slot Already Empty!");
    }
    parking.car_number = "";
    await SlotService.update(parking.id, parking);
    return res.status(200).json(`${parking["car_number"]} Successfully Unparked!`);
  }catch(e){
    return res.status(500).send(e.message);
  }
}

export const getInfo = async (req: Request, res: Response) => {
  try{
    const slot_number: number = parseInt(req.param('slot_number'), 10);
    const car_number: string = req.param('car_number');
    let parking: Slot | any = null;
    if(slot_number){
      if(!SlotService.validateSlotNumber(slot_number)){
        return res.status(400).json("Invalid Slot Number!");
      }
      parking = await SlotService.find(slot_number);
      if(!parking || parking.length <= 0){
        return res.status(400).json("Parking Slot not found!");
      }
      return res.status(200).json(parking);
    }else if(car_number){
      console.log("I AM HERE!!!");
      if(!CarService.validateCarNumber(car_number)){
        return res.status(400).json("Invalid Car Number!");
      }
      const car: Car = await CarService.find(car_number);
      if(!car){
        console.log("CAR NOT FOUND!");
        return res.status(400).json("Car Not Found!");
      }else{
        parking = await SlotService.searchByCarNumber(car_number);
        if(!parking || parking.length <= 0){
          return res.status(400).json("Car Not Found In Parking Lot!");
        }
        return res.status(200).json(parking);
      }
    }else{
      return res.status(400).json("Missing Required Fields!");
    }
  }catch(e){
    console.log("I AM IN CATCH!!!");
    console.log(e);
    return res.status(500).send(e.message);
  }
}