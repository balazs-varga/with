import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../shared/localStorage.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  searchForm: FormGroup;
  currentPositionErrorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthenticationService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createSearchForm();
  }

  getLocation(): Promise<any> {
    this.isLoading = true;
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        this.currentPositionErrorMessage = '';
        resolve({ lng: resp?.coords.longitude, lat: resp?.coords.latitude });
      },
        err => {
          this.showCurrentPositionError(err);
          this.isLoading = false;
          reject();
        });
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isAllAuthInfoAvailable();
  }

  searchByZip(): void {
    this.currentPositionErrorMessage = '';
    this.router.navigateByUrl('/restaurants?zip=' + this.searchForm.get('search').value);
  }

  searchByLocation(): void {
    this.getLocation().then((pos) => {
      return this.http.get<any>(`${environment.apiUrl}/location/geo/${pos.lat}/${pos.lng}`).subscribe(
        (resp) => {
          this.isLoading = false;
          if (resp[0]?.city && resp[0]?.zipcode) {
            this.localStorageService.setCity(resp[0].city);
            this.localStorageService.setZip(resp[0].zipcode);
            this.router.navigateByUrl('/restaurants?zip=' + resp[0].zipcode);
          }
        }, (error) => {
          this.isLoading = false;
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
