export interface BaseSlot {
    car_number: string;
  }
//   There will be scenarios where you only need to assert the item's structure without its id
  export interface Slot extends BaseSlot {
    id: number;
  }