import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantsCommunicationService } from '../restaurants.communication.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit, OnDestroy {

  restaurants = [];

  constructor(
    private restaurantsCommunicationService: RestaurantsCommunicationService,
    private router: Router
  ) {
    this.restaurants = this.restaurantsCommunicationService.restaurants;
    if (!this.restaurants) {
      this.router.navigateByUrl('');
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.restaurantsCommunicationService.restaurants = [];
  }
}
