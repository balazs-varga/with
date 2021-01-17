import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CartService } from 'src/app/shared/cart.service';
import { PizzaLocalStorage } from '../DTO/pizza/PizzaLocalStorage.model';
import { SauceLocalStorage } from '../DTO/pizza/SauceLocalStorage.model';
import { ToppingLocalStorage } from '../DTO/pizza/ToppingLocalStorage.model';
import { RestaurantLocalStorage } from '../DTO/RestaurantLocalStorage.model';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  constructor(
    private cartService: CartService
  ) { }

  createPizzaForm(): FormGroup {
    return new FormGroup({
      pizzadesigner_size_id: new FormControl(null, Validators.required),
      pizzadesigner_dough_id: new FormControl(null, Validators.required),
      pizzadesigner_base_id: new FormControl(null, Validators.required),
      sauces: new FormControl([]),
      quantity: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(20)]),
      oneItemPrice: new FormControl(0),
      totalPrice: new FormControl(0, Validators.required)
    });
  }

  calculatePizzaPrice(pizzaForm: FormGroup, pizza: any): void {
    pizzaForm.get('oneItemPrice').setValue(0, { emitEvent: false });
    if (pizzaForm.get('pizzadesigner_size_id').value) {
      const size = pizza.sizes.find(e => +e.id === +pizzaForm.value.pizzadesigner_size_id);
      this.addPriceToElementPrice(pizzaForm, size.price);
    }

    if (pizzaForm.get('pizzadesigner_dough_id').value) {
      const dough = this.getDoughsOfSelectedPizzaSize(pizzaForm, pizza).find(e => +e.id === +pizzaForm.value.pizzadesigner_dough_id);
      this.addPriceToElementPrice(pizzaForm, dough.price);
    }

    if (pizzaForm.get('pizzadesigner_base_id').value) {
      const base = this.getBasesOfSelectedPizzaSize(pizzaForm, pizza).find(e => +e.id === +pizzaForm.value.pizzadesigner_base_id);
      this.addPriceToElementPrice(pizzaForm, base.price);
    }

    if (pizzaForm.get('toppings')?.value.length > 0) {
      const meatsOfSize = this.getMeatsOfSelectedPizzaSize(pizzaForm, pizza);
      const cheesesOfSize = this.getCheesesOfSelectedPizzaSize(pizzaForm, pizza);
      const vegetablesOfSize = this.getVegetablesOfSelectedPizzaSize(pizzaForm, pizza);
      const fruitsOfSize = this.getFruitsOfSelectedPizzaSize(pizzaForm, pizza);
      const othersOfSize = this.getOthersOfSelectedPizzaSize(pizzaForm, pizza);

      pizzaForm.value.toppings.forEach(toppingId => {
        if (meatsOfSize.some(e => +e.id === +toppingId)) {
          const meat = meatsOfSize.find(e => +e.id === +toppingId);
          this.addPriceToElementPrice(pizzaForm, meat.price);
        } else if (cheesesOfSize.some(e => +e.id === +toppingId)) {
          const cheese = cheesesOfSize.find(e => +e.id === +toppingId);
          this.addPriceToElementPrice(pizzaForm, cheese.price);
        } else if (vegetablesOfSize.some(e => +e.id === +toppingId)) {
          const vegetable = vegetablesOfSize.find(e => +e.id === +toppingId);
          this.addPriceToElementPrice(pizzaForm, vegetable.price);
        } else if (fruitsOfSize.some(e => +e.id === +toppingId)) {
          const fruit = fruitsOfSize.find(e => +e.id === +toppingId);
          this.addPriceToElementPrice(pizzaForm, fruit.price);
        } else if (othersOfSize.some(e => +e.id === +toppingId)) {
          const other = othersOfSize.find(e => +e.id === +toppingId);
          this.addPriceToElementPrice(pizzaForm, other.price);
        }
      });
    }

    if (pizzaForm.get('sauces').value.length > 0) {
      const saucesOfSize = this.getSaucesOfSelectedPizzaSize(pizzaForm, pizza);
      pizzaForm.value.sauces.forEach(toppingId => {
        const sauce = saucesOfSize.find(e => +e.id === +toppingId);
        this.addPriceToElementPrice(pizzaForm, sauce.price);
      });
    }

    pizzaForm.get('totalPrice').setValue(+pizzaForm.value.oneItemPrice * +pizzaForm.value.quantity, { emitEvent: false });
  }

  resetPizzaForm(pizzaForm: FormGroup): void {
    pizzaForm.patchValue({
      pizzadesigner_dough_id: null,
      pizzadesigner_base_id: null,
      sauces: [],
      quantity: 1,
      oneItemPrice: 0,
      totalPrice: 0
    }, { emitEvent: false });
  }


  getDoughsOfSelectedPizzaSize(pizzaForm: FormGroup, pizza: any): any[] {
    if (pizzaForm.get('pizzadesigner_size_id').value) {
      const pizzaSize = pizza.sizes.filter(e => e.id === +pizzaForm.get('pizzadesigner_size_id').value);
      return pizzaSize[0].doughs;
    }
    return [];
  }

  getBasesOfSelectedPizzaSize(pizzaForm: FormGroup, pizza: any): any[] {
    if (pizzaForm.get('pizzadesigner_size_id').value) {
      const pizzaSize = pizza.sizes.filter(e => e.id === +pizzaForm.get('pizzadesigner_size_id').value);
      return pizzaSize[0].bases;
    }
    return [];
  }

  getMeatsOfSelectedPizzaSize(pizzaForm: FormGroup, pizza: any): any[] {
    if (pizzaForm.get('pizzadesigner_size_id').value) {
      const pizzaSize = pizza.sizes.filter(e => e.id === +pizzaForm.get('pizzadesigner_size_id').value);
      return pizzaSize[0].toppings.meats;
    }
    return [];
  }

  getCheesesOfSelectedPizzaSize(pizzaForm: FormGroup, pizza: any): any[] {
    if (pizzaForm.get('pizzadesigner_size_id').value) {
      const pizzaSize = pizza.sizes.filter(e => e.id === +pizzaForm.get('pizzadesigner_size_id').value);
      return pizzaSize[0].toppings.cheeses;
    }
    return [];
  }

  getVegetablesOfSelectedPizzaSize(pizzaForm: FormGroup, pizza: any): any[] {
    if (pizzaForm.get('pizzadesigner_size_id').value) {
      const pizzaSize = pizza.sizes.filter(e => e.id === +pizzaForm.get('pizzadesigner_size_id').value);
      return pizzaSize[0].toppings.vegetables;
    }
    return [];
  }

  getFruitsOfSelectedPizzaSize(pizzaForm: FormGroup, pizza: any): any[] {
    if (pizzaForm.get('pizzadesigner_size_id').value) {
      const pizzaSize = pizza.sizes.filter(e => e.id === +pizzaForm.get('pizzadesigner_size_id').value);
      return pizzaSize[0].toppings.fruits;
    }
    return [];
  }

  getOthersOfSelectedPizzaSize(pizzaForm: FormGroup, pizza: any): any[] {
    if (pizzaForm.get('pizzadesigner_size_id').value) {
      const pizzaSize = pizza.sizes.filter(e => e.id === +pizzaForm.get('pizzadesigner_size_id').value);
      return pizzaSize[0].toppings.others;
    }
    return [];
  }

  getSaucesOfSelectedPizzaSize(pizzaForm: FormGroup, pizza: any): any[] {
    if (pizzaForm.get('pizzadesigner_size_id').value) {
      const pizzaSize = pizza.sizes.filter(e => e.id === +pizzaForm.get('pizzadesigner_size_id').value);
      return pizzaSize[0].sauces;
    }
    return [];
  }

  decreasePizzaQuantity(pizzaForm: FormGroup): void {
    if (pizzaForm.get('quantity').value !== 1) {
      pizzaForm.get('quantity').setValue(pizzaForm.get('quantity').value - 1);
    }
  }

  increasePizzaQuantity(pizzaForm: FormGroup): void {
    if (pizzaForm.get('quantity').value < 20) {
      pizzaForm.get('quantity').setValue(pizzaForm.get('quantity').value + 1);
    }
  }

  addToCart(pizzaForm: FormGroup, pizzaDesigner, restaurantId): Promise<void> {
    return new Promise((resolve) => {
      let pizzaDTO = new PizzaLocalStorage();
      pizzaDTO = pizzaForm.getRawValue();
      pizzaDTO.orderItemId = uuid.v4();

      const dough = this.getDoughsOfSelectedPizzaSize(pizzaForm, pizzaDesigner).find(e => +e.id === +pizzaDTO.pizzadesigner_dough_id);
      pizzaDTO.doughName = dough.name;

      const base = this.getBasesOfSelectedPizzaSize(pizzaForm, pizzaDesigner).find(e => +e.id === +pizzaDTO.pizzadesigner_base_id);
      pizzaDTO.baseName = base.name;

      const size = pizzaDesigner.sizes.find(e => +e.id === +pizzaDTO.pizzadesigner_size_id);
      pizzaDTO.sizeName = size.size + ' cm';

      if (pizzaForm.get('sauces').value.length > 0) {
        pizzaDTO.sauces = [];
        const sauces = this.getSaucesOfSelectedPizzaSize(pizzaForm, pizzaDesigner);

        pizzaForm.value.sauces.forEach(sauceId => {
          const sauce = sauces.find(e => +e.id === +sauceId);
          pizzaDTO.sauces.push(new SauceLocalStorage(sauceId, sauce.name));
        });
      }

      if (pizzaForm.get('toppings').value.length > 0) {
        pizzaDTO.toppings = [];
        const meatsOfSize = this.getMeatsOfSelectedPizzaSize(pizzaForm, pizzaDesigner);
        const cheesesOfSize = this.getCheesesOfSelectedPizzaSize(pizzaForm, pizzaDesigner);
        const vegetablesOfSize = this.getVegetablesOfSelectedPizzaSize(pizzaForm, pizzaDesigner);
        const fruitsOfSize = this.getFruitsOfSelectedPizzaSize(pizzaForm, pizzaDesigner);
        const othersOfSize = this.getOthersOfSelectedPizzaSize(pizzaForm, pizzaDesigner);

        pizzaForm.value.toppings.forEach(toppingId => {
          if (meatsOfSize.some(e => +e.id === +toppingId)) {
            const meat = meatsOfSize.find(e => +e.id === +toppingId);
            pizzaDTO.toppings.push(new ToppingLocalStorage(meat.id, meat.name));
          } else if (cheesesOfSize.some(e => +e.id === +toppingId)) {
            const cheese = cheesesOfSize.find(e => +e.id === +toppingId);
            pizzaDTO.toppings.push(new ToppingLocalStorage(cheese.id, cheese.name));
          } else if (vegetablesOfSize.some(e => +e.id === +toppingId)) {
            const vegetable = vegetablesOfSize.find(e => +e.id === +toppingId);
            pizzaDTO.toppings.push(new ToppingLocalStorage(vegetable.id, vegetable.name));
          } else if (fruitsOfSize.some(e => +e.id === +toppingId)) {
            const fruit = fruitsOfSize.find(e => +e.id === +toppingId);
            pizzaDTO.toppings.push(new ToppingLocalStorage(fruit.id, fruit.name));
          } else if (othersOfSize.some(e => +e.id === +toppingId)) {
            const other = othersOfSize.find(e => +e.id === +toppingId);
            pizzaDTO.toppings.push(new ToppingLocalStorage(other.id, other.name));
          }
        });
      }

      const restaurantDTO = new RestaurantLocalStorage();
      restaurantDTO.restaurant_id = restaurantId;
      restaurantDTO.pizza.push(pizzaDTO);

      this.cartService.addPizzaToCart(restaurantId, restaurantDTO, pizzaDTO);

      resolve();
    });
  }

  private addPriceToElementPrice(pizzaForm: FormGroup, price): void {
    pizzaForm.get('oneItemPrice').setValue(+pizzaForm.get('oneItemPrice').value + +price, { emitEvent: false });
  }
}
