import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
        private localStorageService: LocalStorageService,
        private router: Router
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

    resetOrder(restaurantId): void {
        this.localStorageService.clearRestaurantOrderStorage(restaurantId);
    }

    calculateTotalPrice(order: RestaurantLocalStorage): number {
        let totalPrice = 0;
        if (order) {
            if (order.drink.length > 0) {
                order.drink.forEach(e => {
                    totalPrice += +e.totalPrice;
                });
            }
            if (order.meal.length > 0) {
                order.meal.forEach(e => {
                    totalPrice += +e.totalPrice;
                });
            }
            if (order.menu.length > 0) {
                order.menu.forEach(e => {
                    totalPrice += +e.totalPrice;
                });
            }
            if (order.pizza.length > 0) {
                order.pizza.forEach(e => {
                    totalPrice += +e.totalPrice;
                });
            }
            if (order.side.length > 0) {
                order.side.forEach(e => {
                    totalPrice += +e.totalPrice;
                });
            }
        }
        return totalPrice;
    }

    calculateOrderAmount(order): number {
        let orderAmount = 0;
        if (order) {
            if (order.drink.length > 0) {
                order.drink.forEach(e => {
                    orderAmount += +e.quantity;
                });
            }
            if (order.meal.length > 0) {
                order.meal.forEach(e => {
                    orderAmount += +e.quantity;
                });
            }
            if (order.menu.length > 0) {
                order.menu.forEach(e => {
                    orderAmount += +e.quantity;
                });
            }
            if (order.pizza.length > 0) {
                order.pizza.forEach(e => {
                    orderAmount += +e.quantity;
                });
            }
            if (order.side.length > 0) {
                order.side.forEach(e => {
                    orderAmount += +e.quantity;
                });
            }
        }
        return orderAmount;
    }

    removeSelectedOrderItem(orderItem, restaurantId: number): void {
        const existingOrderData = JSON.parse(this.localStorageService.getRestaurandOrderData(restaurantId));

        if (existingOrderData) {
            if (existingOrderData.drink.some(e => e.orderItemId === orderItem.orderItemId)) {
                const drinks = existingOrderData.drink;
                const index =  drinks.findIndex(e => e.orderItemId === orderItem.orderItemId);
                if (index > -1) {
                    drinks.splice(index, 1);
                }
                existingOrderData.drink = drinks;
            } else if (existingOrderData.meal.some(e => e.orderItemId === orderItem.orderItemId)) {
                const meals = existingOrderData.meal;
                const index =  meals.findIndex(e => e.orderItemId === orderItem.orderItemId);
                if (index > -1) {
                    meals.splice(index, 1);
                }
                existingOrderData.meal = meals;
            } else if (existingOrderData.menu.some(e => e.orderItemId === orderItem.orderItemId)) {
                const menus = existingOrderData.menu;
                const index =  menus.findIndex(e => e.orderItemId === orderItem.orderItemId);
                if (index > -1) {
                    menus.splice(index, 1);
                }
                existingOrderData.menu = menus;
            } else if (existingOrderData.side.some(e => e.orderItemId === orderItem.orderItemId)) {
                const sides = existingOrderData.side;
                const index =  sides.findIndex(e => e.orderItemId === orderItem.orderItemId);
                if (index > -1) {
                    sides.splice(index, 1);
                }
                existingOrderData.side = sides;
            } else if (existingOrderData.pizza.some(e => e.orderItemId === orderItem.orderItemId)) {
                const pizzas = existingOrderData.pizza;
                const index =  pizzas.findIndex(e => e.orderItemId === orderItem.orderItemId);
                if (index > -1) {
                    pizzas.splice(index, 1);
                }
                existingOrderData.pizza = pizzas;
            }
            this.localStorageService.setRestaurantOrderData(restaurantId, existingOrderData);
        }
    }

    order(restaurantDTO: any): void {
        this.router.navigateByUrl('/checkout/' + restaurantDTO.lowercasename);
    }
}
