export class SideLocalStorage {

    constructor(side_id: number, name: string, quantity?: number, totalPrice?: number, oneItemPrice?: number) {
        this.side_id = side_id;
        this.quantity = quantity;
        this.name = name;
        this.totalPrice = totalPrice;
        this.oneItemPrice = oneItemPrice;
    }

    side_id: number;
    quantity: number;
    name: string;
    totalPrice: number;
    oneItemPrice: number;
}
