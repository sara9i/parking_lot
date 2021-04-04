// src/items/items.interface.ts

import { Slot } from "./parking_slot.interface";

export interface Slots {
  [key: number]: Slot;
}