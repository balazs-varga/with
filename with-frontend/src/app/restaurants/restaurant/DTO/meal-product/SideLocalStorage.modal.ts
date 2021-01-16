export class SideLocalStorage {

    constructor(side_id: number, quantity: number, name: string) {
        this.side_id = side_id;
        this.quantity = quantity;
        this.name = name;
    }

    side_id: number;
    quantity: number;
    name: string;
}
