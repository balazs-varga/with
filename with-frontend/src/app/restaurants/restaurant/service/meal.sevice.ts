import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { CartService } from 'src/app/shared/cart.service';

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

    private addPriceToElementPrice(selectedProductForm: FormGroup, price): void {
        selectedProductForm.get('oneItemPrice').setValue(+selectedProductForm.get('oneItemPrice').value + +price, { emitEvent: false });
    }

    private arrayLengthValidator(limit): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null =>
            control.value.length > limit
                ? { tooMuch: limit } : null;
    }
}
