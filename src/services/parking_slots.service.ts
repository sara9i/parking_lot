// src/parking_slots/parking_slots.service.ts

/**
 * Data Model Interfaces
 */

import { BaseSlot, Slot } from "../models/parking_slot.interface";
import { Slots } from "../models/parking_slots.interface";
import * as CarService from "./cars.service";
import { Car } from "../models/car.interface";


/**
 * In-Memory Store
 */
let slot_id = 0;
let parking_slots: Slots = {};
let car_indexed_slots: any = {};


/**
 * Service Methods
 */

export const findAll = async (): Promise<Slot[]> => Object.values(parking_slots);

export const find = async (id: number): Promise<Slot> => parking_slots[id];
export const searchByCarNumber = async (car_number: string): Promise<Slot> => car_indexed_slots[car_number];

const validateFields = function(slot){
  return validateSlotNumber(slot["id"])
}

export const validateSlotNumber = function(slot_number){
  return slot_number > 0 && slot_number <= process.env.PARKING_LOT_SIZE;
}

export const create = async (newSlot: BaseSlot): Promise<Slot> => {
  slot_id = newSlot["id"] && newSlot["id"]>0 ? newSlot["id"] :++slot_id;
  if(!validateSlotNumber(slot_id)){
    throw Error(`Invalid ID ${slot_id}!`);
  }
  if(newSlot["car_number"]){
    const car: Car = await CarService.find(newSlot["car_number"]);
      if(!car){
        throw Error("Car Not Found!");
      }
      if(!CarService.validateCarNumber(newSlot["car_number"])){
        throw Error("Invalid Car Number");
      }else if(car_indexed_slots[newSlot.car_number]){
        throw Error("Car Already Parked!");
      }
      else{
        car_indexed_slots[newSlot.car_number] = {
          id: slot_id,
          ...newSlot,
        };
      }
  }
  
  parking_slots[slot_id] = {
    id: slot_id,
    ...newSlot,
  };
  
    return parking_slots[slot_id];
  };

  export const update = async (
    id: number,
    parking_slotUpdate: BaseSlot
  ): Promise<Slot | null> => {
    if(!validateSlotNumber(id)){
      throw Error("Invalid ID!");
    }
    const parking_slot = await find(id);
  
    if (!parking_slot) {
      throw Error("Parking Slot Not Found!");
    }
    if(parking_slotUpdate["car_number"]){
      if(!CarService.validateCarNumber(parking_slotUpdate["car_number"])){
        throw Error("Invalid Car Number");
      }else{
        car_indexed_slots[parking_slotUpdate.car_number] = parking_slotUpdate;
      }
    }
  
    parking_slots[id] = { id, ...parking_slotUpdate };
  
    return parking_slots[id];
  };

  export const remove = async (id: number): Promise<null | void> => {
    if(!validateSlotNumber(id)){
      throw Error("Invalid ID!");
    }
    const parking_slot = await find(id);
  
    if (!parking_slot) {
      throw Error("Parking Slot Not Found!");
    }
  
    delete parking_slots[id];
  };