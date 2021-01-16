export class DrinkLocalStorage {

    constructor(drink_id: number, quantity: number, name: string) {
        this.drink_id = drink_id;
        this.quantity = quantity;
        this.name = name;
    }

    drink_id: number;
    quantity: number;
    name: string;
}
