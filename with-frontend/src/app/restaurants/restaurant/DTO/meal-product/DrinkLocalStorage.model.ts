export class DrinkLocalStorage {

    constructor(drink_id: number, quantity: number, name: string, totalPrice: number, oneItemPrice: number, orderItemId: string) {
        this.drink_id = drink_id;
        this.quantity = quantity;
        this.name = name;
        this.totalPrice = totalPrice;
        this.oneItemPrice = oneItemPrice;
        this.orderItemId = orderItemId;
    }

    drink_id: number;
    quantity: number;
    name: string;
    totalPrice: number;
    oneItemPrice: number;
    orderItemId: string;
}
