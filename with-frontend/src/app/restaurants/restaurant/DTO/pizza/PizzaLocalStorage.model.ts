import { SauceLocalStorage } from './SauceLocalStorage.model';
import { ToppingLocalStorage } from './ToppingLocalStorage.model';

export class PizzaLocalStorage {
    pizzadesigner_base_id: number;
    pizzadesigner_dough_id: number;
    pizzadesigner_size_id: number;
    sizeName: string;
    baseName: string;
    doughName: string;
    quantity: number;
    toppings: ToppingLocalStorage[];
    sauces: SauceLocalStorage[];
    totalPrice: number;
    oneItemPrice: number;
}
