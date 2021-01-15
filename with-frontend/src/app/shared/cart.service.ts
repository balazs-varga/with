import { Injectable } from '@angular/core';
import { PizzaLocalStorage } from '../restaurants/restaurant/DTO/pizza/PizzaLocalStorage.model';
import { RestaurantLocalStorage } from '../restaurants/restaurant/DTO/RestaurantLocalStorage.model';
import { LocalStorageService } from './localStorage.service';

@Injectable({ providedIn: 'root' })
export class CartService {

    constructor(
        private localStorageService: LocalStorageService
    ) { }


    addPizzaToCart(restaurantId, restaurantDTO: RestaurantLocalStorage, pizzaDTO: PizzaLocalStorage): void {
        if (!this.localStorageService.isRestaurandOrderDataAvailable(restaurantId)) {
            localStorage.setItem(restaurantId, JSON.stringify(restaurantDTO));
        } else {
            let existingRestaurantOrder = new RestaurantLocalStorage();
            existingRestaurantOrder = JSON.parse(this.localStorageService.getRestaurandOrderData(restaurantId));
            existingRestaurantOrder.pizza.push(pizzaDTO);
            localStorage.setItem(restaurantId, JSON.stringify(existingRestaurantOrder));
        }
    }
}
