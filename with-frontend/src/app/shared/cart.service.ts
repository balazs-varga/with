import { Injectable } from '@angular/core';
import { DrinkLocalStorage } from '../restaurants/restaurant/DTO/meal-product/DrinkLocalStorage.model';
import { MealLocalStorage } from '../restaurants/restaurant/DTO/meal-product/MealLocalStorage.model';
import { MenuLocalStorage } from '../restaurants/restaurant/DTO/meal-product/MenuLocalStorage.model';
import { SideLocalStorage } from '../restaurants/restaurant/DTO/meal-product/SideLocalStorage.modal';
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
            this.storeNewRestaurandOrderData(restaurantId, restaurantDTO);
        } else {
            const existingRestaurantOrder = this.getExistingRestaurantOrderData(restaurantId);
            existingRestaurantOrder.pizza.push(pizzaDTO);
            localStorage.setItem(restaurantId, JSON.stringify(existingRestaurantOrder));
        }
    }

    addDrinkToCart(restaurantId, restaurantDTO: RestaurantLocalStorage, drinkDTO: DrinkLocalStorage): void {
        if (!this.localStorageService.isRestaurandOrderDataAvailable(restaurantId)) {
            this.storeNewRestaurandOrderData(restaurantId, restaurantDTO);
        } else {
            const existingRestaurantOrder = this.getExistingRestaurantOrderData(restaurantId);
            existingRestaurantOrder.drink.push(drinkDTO);
            localStorage.setItem(restaurantId, JSON.stringify(existingRestaurantOrder));
        }
    }

    addSideToCart(restaurantId, restaurantDTO: RestaurantLocalStorage, sideDTO: SideLocalStorage): void {
        if (!this.localStorageService.isRestaurandOrderDataAvailable(restaurantId)) {
            this.storeNewRestaurandOrderData(restaurantId, restaurantDTO);
        } else {
            const existingRestaurantOrder = this.getExistingRestaurantOrderData(restaurantId);
            existingRestaurantOrder.side.push(sideDTO);
            localStorage.setItem(restaurantId, JSON.stringify(existingRestaurantOrder));
        }
    }

    addMealToCart(restaurantId, restaurantDTO: RestaurantLocalStorage, mealDTO: MealLocalStorage): void {
        if (!this.localStorageService.isRestaurandOrderDataAvailable(restaurantId)) {
            this.storeNewRestaurandOrderData(restaurantId, restaurantDTO);
        } else {
            const existingRestaurantOrder = this.getExistingRestaurantOrderData(restaurantId);
            existingRestaurantOrder.meal.push(mealDTO);
            localStorage.setItem(restaurantId, JSON.stringify(existingRestaurantOrder));
        }
    }

    addMenuToCart(restaurantId, restaurantDTO: RestaurantLocalStorage, menuDTO: MenuLocalStorage): void {
        if (!this.localStorageService.isRestaurandOrderDataAvailable(restaurantId)) {
            this.storeNewRestaurandOrderData(restaurantId, restaurantDTO);
        } else {
            const existingRestaurantOrder = this.getExistingRestaurantOrderData(restaurantId);
            existingRestaurantOrder.menu.push(menuDTO);
            localStorage.setItem(restaurantId, JSON.stringify(existingRestaurantOrder));
        }
    }

    private storeNewRestaurandOrderData(restaurantId, restaurantDTO: RestaurantLocalStorage): void {
        localStorage.setItem(restaurantId, JSON.stringify(restaurantDTO));
    }

    private getExistingRestaurantOrderData(restaurantId): RestaurantLocalStorage {
        let existingRestaurantOrder = new RestaurantLocalStorage();
        existingRestaurantOrder = JSON.parse(this.localStorageService.getRestaurandOrderData(restaurantId));
        return existingRestaurantOrder;
    }
}
