// src/parking_slots/parking_slots.service.ts

/**
 * Data Model Interfaces
 */

import { BaseSlot, Slot } from "../models/parking_slot.interface";
import { Slots } from "../models/parking_slots.interface";


/**
 * In-Memory Store
 */
let slot_id = 0;
let parking_slots: Slots = {};


/**
 * Service Methods
 */

export const findAll = async (): Promise<Slot[]> => Object.values(parking_slots);

export const find = async (id: number): Promise<Slot> => parking_slots[id];

const validateFields = function(slot){
  return validateSlotNumber(slot["id"])
}

export const validateSlotNumber = function(slot_number){
  return slot_number > 0 && slot_number <= process.env.PARKING_LOT_SIZE;
}

export const create = async (newSlot: BaseSlot): Promise<Slot> => {
  slot_id = newSlot["id"] && newSlot["id"]>0 ? newSlot["id"] :slot_id++;
  if(!validateSlotNumber(slot_id)){
    throw Error("Invalid ID!");
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