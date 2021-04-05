// src/items/items.interface.ts

import { Car } from "./car.interface";

export interface Cars {
  [key: string]: Car;
}