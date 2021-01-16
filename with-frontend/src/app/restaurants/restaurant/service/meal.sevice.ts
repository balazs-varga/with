import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { CartService } from 'src/app/shared/cart.service';
import { DrinkLocalStorage } from '../DTO/meal-product/DrinkLocalStorage.model';
import { ExtraLocalStorage } from '../DTO/meal-product/ExtraLocalStorage.model';
import { MealLocalStorage } from '../DTO/meal-product/MealLocalStorage.model';
import { MenuLocalStorage } from '../DTO/meal-product/MenuLocalStorage.model';
import { SideLocalStorage } from '../DTO/meal-product/SideLocalStorage.modal';
import { RestaurantLocalStorage } from '../DTO/RestaurantLocalStorage.model';

@Injectable({
    providedIn: 'root'
})
export class MealService {

    constructor(
        private cartService: CartService
    ) { }

    createSelectedProductForm(product): FormGroup {
        return new FormGroup({
            selectedProductId: new FormControl(product.id, Validators.required),
            selectedSide: new FormControl(null),
            selectedDrink: new FormControl(null),
            selectedExtras: new FormControl([], this.arrayLengthValidator(product.extralimit)),
            quantity: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(20)]),
            oneItemPrice: new FormControl(Math.trunc(product?.price)),
            totalPrice: new FormControl(Math.trunc(product?.price), Validators.required),
            type: new FormControl(product?.type, Validators.required)
        });
    }

    setMenuValidators(selectedProductForm: FormGroup): void {
        selectedProductForm.get('selectedSide').setValidators(Validators.required);
        selectedProductForm.get('selectedDrink').setValidators(Validators.required);
        selectedProductForm.get('selectedSide').updateValueAndValidity();
        selectedProductForm.get('selectedDrink').updateValueAndValidity();
    }

    isMenu(product): boolean {
        return product.type === 'menu';
    }

    isMeal(product): boolean {
        return product.type === 'meal';
    }

    isDrink(product): boolean {
        return product.type === 'drink';
    }

    isSide(product): boolean {
        return product.type === 'side';
    }

    calculateSelectedProductPrice(selectedProductForm: FormGroup, selectedProduct): void {
        selectedProductForm.get('oneItemPrice').setValue(Math.trunc(selectedProduct?.price), { emitEvent: false });
        if (selectedProductForm.value.selectedSide) {
            const side = selectedProduct.sides.find(e => +e.id === +selectedProductForm.value.selectedSide);
            this.addPriceToElementPrice(selectedProductForm, side.price);
        }

        if (selectedProductForm.value.selectedDrink) {
            const drink = selectedProduct.drinks.find(e => +e.id === +selectedProductForm.value.selectedDrink);
            this.addPriceToElementPrice(selectedProductForm, drink.price);
        }

        if (selectedProductForm.value.selectedExtras.length > 0) {
            selectedProductForm.value.selectedExtras.forEach(extraId => {
                if (selectedProduct.extras.some(e => +e.id === +extraId)) {
                    const extra = selectedProduct.extras.find(e => +e.id === +extraId);
                    this.addPriceToElementPrice(selectedProductForm, extra.price);
                }
            });
        }

        selectedProductForm.get('totalPrice').setValue(
            +selectedProductForm.value.oneItemPrice * +selectedProductForm.value.quantity, { emitEvent: false }
        );
    }

    addToCart(selectedProductForm: FormGroup, selectedProduct, restaurantId): Promise<void> {
        return new Promise((resolve) => {
            const restaurantDTO = new RestaurantLocalStorage();
            restaurantDTO.restaurant_id = restaurantId;

            if (this.isDrink(selectedProduct) && selectedProductForm.value.selectedProductId) {
                const drinkDTO = new DrinkLocalStorage(
                    selectedProductForm.value.selectedProductId, selectedProductForm.value.quantity, selectedProduct.name,
                    selectedProductForm.value.totalPrice, selectedProductForm.value.oneItemPrice
                );
                restaurantDTO.drink.push(drinkDTO);
                this.cartService.addDrinkToCart(restaurantId, restaurantDTO, drinkDTO);
            } else if (this.isSide(selectedProduct) && selectedProductForm.value.selectedProductId) {
                const sideDTO = new SideLocalStorage(
                    selectedProductForm.value.selectedProductId, selectedProduct.name, selectedProductForm.value.quantity,
                    selectedProductForm.value.totalPrice, selectedProductForm.value.oneItemPrice
                );
                restaurantDTO.side.push(sideDTO);
                this.cartService.addSideToCart(restaurantId, restaurantDTO, sideDTO);
            } else if (this.isMeal(selectedProduct) && selectedProductForm.value.selectedProductId) {
                const mealDTO = new MealLocalStorage();
                mealDTO.meal_id = selectedProductForm.value.selectedProductId;
                mealDTO.quantity = selectedProductForm.value.quantity;
                mealDTO.totalPrice = selectedProductForm.value.totalPrice;
                mealDTO.oneItemPrice = selectedProductForm.value.oneItemPrice;
                mealDTO.mealName = selectedProduct.name;
                if (selectedProductForm.value.selectedExtras.length > 0) {
                    selectedProductForm.value.selectedExtras.forEach(extraId => {
                        if (selectedProduct.extras.some(e => +e.id === +extraId)) {
                            const extra = selectedProduct.extras.find(e => +e.id === +extraId);
                            const extraDTO = new ExtraLocalStorage(extra.id, extra.name);
                            mealDTO.extras.push(extraDTO);
                        }
                    });
                }
                if (selectedProductForm.value.selectedSide) {
                    mealDTO.side_id = selectedProductForm.value.selectedSide;
                    mealDTO.sideName = selectedProduct.sides.find(e => +e.id === +selectedProductForm.value.selectedSide).name;
                }
                if (selectedProductForm.value.selectedDrink) {
                    mealDTO.drink_id = selectedProductForm.value.selectedDrink;
                    mealDTO.drinkName = selectedProduct.drinks.find(e => +e.id === +selectedProductForm.value.selectedDrink).name;
                }
                restaurantDTO.meal.push(mealDTO);
                this.cartService.addMealToCart(restaurantId, restaurantDTO, mealDTO);
            } else if (this.isMenu(selectedProduct) && selectedProductForm.value.selectedProductId) {
                const menuDTO = new MenuLocalStorage();
                menuDTO.meal_id = selectedProductForm.value.selectedProductId;
                menuDTO.quantity = selectedProductForm.value.quantity;
                menuDTO.totalPrice = selectedProductForm.value.totalPrice;
                menuDTO.oneItemPrice = selectedProductForm.value.oneItemPrice;
                menuDTO.mealName = selectedProduct.name;
                if (selectedProductForm.value.selectedExtras.length > 0) {
                    selectedProductForm.value.selectedExtras.forEach(extraId => {
                        if (selectedProduct.extras.some(e => +e.id === +extraId)) {
                            const extra = selectedProduct.extras.find(e => +e.id === +extraId);
                            const extraDTO = new ExtraLocalStorage(extra.id, extra.name);
                            menuDTO.extras.push(extraDTO);
                        }
                    });
                }
                if (selectedProductForm.value.selectedSide) {
                    menuDTO.side_id = selectedProductForm.value.selectedSide;
                    menuDTO.sideName = selectedProduct.sides.find(e => +e.id === +selectedProductForm.value.selectedSide).name;
                }
                if (selectedProductForm.value.selectedDrink) {
                    menuDTO.drink_id = selectedProductForm.value.selectedDrink;
                    menuDTO.drinkName = selectedProduct.drinks.find(e => +e.id === +selectedProductForm.value.selectedDrink).name;
                }
                restaurantDTO.menu.push(menuDTO);
                this.cartService.addMenuToCart(restaurantId, restaurantDTO, menuDTO);
            }

            resolve();
        });
    }

    private addPriceToElementPrice(selectedProductForm: FormGroup, price): void {
        selectedProductForm.get('oneItemPrice').setValue(+selectedProductForm.get('oneItemPrice').value + +price, { emitEvent: false });
    }

    private arrayLengthValidator(limit): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null =>
            control.value.length > limit
                ? { tooMuch: limit } : null;
    }
}
