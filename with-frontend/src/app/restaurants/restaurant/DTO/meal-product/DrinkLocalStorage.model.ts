export class DrinkLocalStorage {

    constructor(drink_id: number, quantity: number, name: string, totalPrice: number, oneItemPrice: number) {
        this.drink_id = drink_id;
        this.quantity = quantity;
        this.name = name;
        this.totalPrice = totalPrice;
        this.oneItemPrice = oneItemPrice;
    }

    drink_id: number;
    quantity: number;
    name: string;
    totalPrice: number;
    oneItemPrice: number;
}
