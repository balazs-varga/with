import { DrinkLocalStorage } from './meal-product/DrinkLocalStorage.model';
import { MealLocalStorage } from './meal-product/MealLocalStorage.model';
import { MenuLocalStorage } from './meal-product/MenuLocalStorage.model';
import { SideLocalStorage } from './meal-product/SideLocalStorage.modal';
import { PizzaLocalStorage } from './pizza/PizzaLocalStorage.model';

export class RestaurantLocalStorage {

    restaurant_id: number;
    pizza: PizzaLocalStorage[] = [];
    meal: MealLocalStorage[] = [];
    drink: DrinkLocalStorage[] = [];
    side: SideLocalStorage[] = [];
    menu: MenuLocalStorage[] = [];
}
