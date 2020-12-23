import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/shared/location.service';
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
    private router: Router,
    public locationService: LocationService
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
    this.locationService.changeIsLocationSelectorOpen(false);
  }
}
