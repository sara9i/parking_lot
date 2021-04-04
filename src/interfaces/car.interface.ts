export interface BaseCar {
    name: string;
    price: number;
    description: string;
    image: string;
  }
//   There will be scenarios where you only need to assert the item's structure without its id
  export interface Car extends BaseCar {
    id: number;
  }