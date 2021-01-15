import { PizzaLocalStorage } from "./pizza/PizzaLocalStorage.model";

export class RestaurantLocalStorage {
    restaurant_id: number;
    pizza: PizzaLocalStorage[] = [];
}
