import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/localStorage.service';
import { LocationService } from 'src/app/shared/location.service';
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

  localstorageSubscription: Subscription;

  constructor(
    private http: HttpClient,
    public locationService: LocationService,
    private activatedRoute: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.zip = params.zip;

      if (this.zip) {
        this.getZipAndCityName(this.zip);
        this.getRestaurantsByZip(this.zip);
      }

      if (!this.zip) {
        this.router.navigateByUrl('/');
      }
    });

    this.localstorageSubscription = this.localStorageService.watchStorage().subscribe(() => {
      this.router.navigateByUrl('/restaurants?zip=' + this.localStorageService.getZip);
    });
  }

  ngOnDestroy(): void {
    this.localstorageSubscription.unsubscribe();
    this.locationService.changeIsLocationSelectorOpen(false);
  }

  private getZipAndCityName(zip: string): Subscription {
    return this.http.get<any>(`${environment.apiUrl}/location/zip/${zip}`).subscribe(
      (resp) => {
        if (resp[0]?.city && resp[0]?.zipcode) {
          this.localStorageService.setCity(resp[0].city);
          this.localStorageService.setZip(resp[0].zipcode);
        }
      }, (error) => {
      }
    );
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
