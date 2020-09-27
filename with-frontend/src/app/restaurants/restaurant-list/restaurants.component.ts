import { Component, OnDestroy, OnInit } from '@angular/core';
import { RestaurantsCommunicationService } from '../restaurants.communication.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit, OnDestroy {

  restaurants = [];

  constructor(
    private restaurantsCommunicationService: RestaurantsCommunicationService
  ) {
    this.restaurants = this.restaurantsCommunicationService.restaurants;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.restaurantsCommunicationService.restaurants = [];
  }

}
