import { ExtraLocalStorage } from './ExtraLocalStorage.model';

export class MenuLocalStorage {
    meal_id: number;
    mealName: string;
    side_id: number;
    sideName: string;
    drink_id: number;
    drinkName: string;
    quantity: number;
    extras: ExtraLocalStorage[] = [];
    totalPrice: number;
    oneItemPrice: number;
}
