import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RestaurantService {

    restaurant: any = null;

    restaurantChange: Subject<any> = new Subject<any>();

    constructor()  {
    }

    setRestaurant(restaurant): void {
        this.restaurant = restaurant;
        this.restaurantChange.next(restaurant);
    }
}
