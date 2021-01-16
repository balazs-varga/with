import { ExtraLocalStorage } from './ExtraLocalStorage.model';

export class MealLocalStorage {
    meal_id: number;
    mealName: string;
    side_id: number;
    sideName: string;
    drink_id: number;
    drinkName: string;
    quantity: number;
    extras: ExtraLocalStorage[] = [];
}
