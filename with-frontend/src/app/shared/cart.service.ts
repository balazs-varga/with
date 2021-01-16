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
            this.localStorageService.setRestaurantOrderData(restaurantId, restaurantDTO);
        } else {
            const existingRestaurantOrder = this.getExistingRestaurantOrderData(restaurantId);
            existingRestaurantOrder.pizza.push(pizzaDTO);
            this.localStorageService.setRestaurantOrderData(restaurantId, existingRestaurantOrder);
        }
    }

    addDrinkToCart(restaurantId, restaurantDTO: RestaurantLocalStorage, drinkDTO: DrinkLocalStorage): void {
        if (!this.localStorageService.isRestaurandOrderDataAvailable(restaurantId)) {
            this.localStorageService.setRestaurantOrderData(restaurantId, restaurantDTO);
        } else {
            const existingRestaurantOrder = this.getExistingRestaurantOrderData(restaurantId);
            existingRestaurantOrder.drink.push(drinkDTO);
            this.localStorageService.setRestaurantOrderData(restaurantId, existingRestaurantOrder);
        }
    }

    addSideToCart(restaurantId, restaurantDTO: RestaurantLocalStorage, sideDTO: SideLocalStorage): void {
        if (!this.localStorageService.isRestaurandOrderDataAvailable(restaurantId)) {
            this.localStorageService.setRestaurantOrderData(restaurantId, restaurantDTO);
        } else {
            const existingRestaurantOrder = this.getExistingRestaurantOrderData(restaurantId);
            existingRestaurantOrder.side.push(sideDTO);
            this.localStorageService.setRestaurantOrderData(restaurantId, existingRestaurantOrder);
        }
    }

    addMealToCart(restaurantId, restaurantDTO: RestaurantLocalStorage, mealDTO: MealLocalStorage): void {
        if (!this.localStorageService.isRestaurandOrderDataAvailable(restaurantId)) {
            this.localStorageService.setRestaurantOrderData(restaurantId, restaurantDTO);
        } else {
            const existingRestaurantOrder = this.getExistingRestaurantOrderData(restaurantId);
            existingRestaurantOrder.meal.push(mealDTO);
            this.localStorageService.setRestaurantOrderData(restaurantId, existingRestaurantOrder);
        }
    }

    addMenuToCart(restaurantId, restaurantDTO: RestaurantLocalStorage, menuDTO: MenuLocalStorage): void {
        if (!this.localStorageService.isRestaurandOrderDataAvailable(restaurantId)) {
            this.localStorageService.setRestaurantOrderData(restaurantId, restaurantDTO);
        } else {
            const existingRestaurantOrder = this.getExistingRestaurantOrderData(restaurantId);
            existingRestaurantOrder.menu.push(menuDTO);
            this.localStorageService.setRestaurantOrderData(restaurantId, existingRestaurantOrder);
        }
    }

    getExistingRestaurantOrderData(restaurantId): RestaurantLocalStorage {
        let existingRestaurantOrder = new RestaurantLocalStorage();
        existingRestaurantOrder = JSON.parse(this.localStorageService.getRestaurandOrderData(restaurantId));
        return existingRestaurantOrder;
    }
}
