import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../auth/auth.service';
import { RestaurantsCommunicationService } from 'src/app/restaurants/restaurants.communication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  searchForm: FormGroup;
  currentPositionErrorMessage = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthenticationService,
    private restaurantsCommunicationService: RestaurantsCommunicationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createSearchForm();
  }

  getLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        this.currentPositionErrorMessage = '';
        resolve({ lng: resp?.coords.longitude, lat: resp?.coords.latitude });
      },
        err => {
          this.showCurrentPositionError(err);
          reject();
        });
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isAllAuthInfoAvailable();
  }

  searchByZip(): Subscription {
    this.currentPositionErrorMessage = '';
    return this.http.get<any>(`${environment.apiUrl}/restaurants/near/zip/` + this.searchForm.get('search').value).subscribe(
      (resp) => {
        this.restaurantsCommunicationService.restaurants = resp;
        this.router.navigateByUrl('/restaurants');
      }
    );
  }

  searchByLocation(): void {
    this.getLocation().then((pos) => {
      return this.http.get<any>(`${environment.apiUrl}/restaurants/near/geo/${pos.lat}/${pos.lng}`).subscribe(
        (resp) => {
          this.restaurantsCommunicationService.restaurants = resp;
          this.router.navigateByUrl('/restaurants');
        }
      );
    });
  }

  private createSearchForm(): void {
    this.searchForm = this.fb.group({
      search: ['', [Validators.min(1000), Validators.max(9999)]]
    });
  }

  private showCurrentPositionError(error): void {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        this.currentPositionErrorMessage = 'Kérjük engedélyezd a helymeghatározást a böngésződben';
        break;
      case error.POSITION_UNAVAILABLE:
        this.currentPositionErrorMessage = 'Helymeghatározási információ nem elérhető';
        break;
      case error.TIMEOUT:
        this.currentPositionErrorMessage = 'Nem sikerült meghatározni a pontos helyet';
        break;
      case error.UNKNOWN_ERROR:
        this.currentPositionErrorMessage = 'Nem sikerült meghatározni a pontos helyet';
        break;
    }
  }
}
