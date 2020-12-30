import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocationService } from 'src/app/shared/location.service';
import { RestaurantsCommunicationService } from '../restaurants.communication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit, OnDestroy {

  restaurants = [];
  isLoading = false;
  zip = '';

  constructor(
    private restaurantsCommunicationService: RestaurantsCommunicationService,
    private router: Router,
    private http: HttpClient,
    public locationService: LocationService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.zip = params['zip'];
    });

    if (this.zip) {
      this.getRestaurantsByZip(this.zip);
    } else {
      this.restaurants = this.restaurantsCommunicationService.restaurants;
      if (!this.restaurants) {
        this.router.navigateByUrl('');
      }
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.restaurantsCommunicationService.restaurants = [];
    this.locationService.changeIsLocationSelectorOpen(false);
  }

  private getRestaurantsByZip(zip: string): Subscription {
    this.isLoading = true;
    return this.http.get<any>(`${environment.apiUrl}/restaurants/near/zip/` + zip).subscribe(
      (resp) => {
        this.isLoading = false;
        this.restaurants = resp;
      }, (error) => {
        this.isLoading = false;
      }
    );
  }
}
