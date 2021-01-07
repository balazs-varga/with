import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { LocalStorageService } from 'src/app/shared/localStorage.service';
import { LocationService } from 'src/app/shared/location.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  locationForm: FormGroup;
  nameForAvatar = 'VB';
  loggedInUserName = 'Balázs';
  isLocationPopupShow = false;
  zip = null;
  city = null;

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    public locationService: LocationService,
    private localStorageService: LocalStorageService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getZipAndCityFromLocalStorage();
    this.locationService.isLocationSelectorOpen$.subscribe(res => this.isLocationPopupShow = res);
    this.localStorageService.watchStorage().subscribe((data: string) => {
      this.getZipAndCityFromLocalStorage();
    });
    this.createLocationChangeForm();
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isAllAuthInfoAvailable();
  }

  toggleLocationPopup(): void {
    this.isLocationPopupShow = !this.isLocationPopupShow;
  }

  isLoginPage(): boolean {
    return this.router.url === '/';
  }

  submitByEnterButton(event): void {
    const ENTER_KEY_CODE = 13;
    if (event.keyCode === ENTER_KEY_CODE) {
      if (this.locationForm.valid) {
        this.getZipAndCityName(this.locationForm.get('location').value);
      }
    }
  }

  private getZipAndCityName(zip: string): Subscription {
    return this.http.get<any>(`${environment.apiUrl}/location/zip/${zip}`).subscribe(
      (resp) => {
        if (resp[0]?.city && resp[0]?.zipcode) {
          this.localStorageService.setCity(resp[0].city);
          this.localStorageService.setZip(resp[0].zipcode);
        }
        this.isLocationPopupShow = false;
        this.locationForm.reset();
      }, (error) => {
      }
    );
  }

  private getZipAndCityFromLocalStorage(): void {
    this.zip = this.localStorageService.getZip;
    this.city = this.localStorageService.getCity;
  }

  private createLocationChangeForm(): void {
    this.locationForm = this.fb.group({
      location: ['', [Validators.min(1000), Validators.max(9999)]]
    });
  }
}
