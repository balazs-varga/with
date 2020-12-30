import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { LocationService } from 'src/app/shared/location.service';

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

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    public locationService: LocationService
  ) { }

  ngOnInit(): void {
    this.locationService.isLocationSelectorOpen$.subscribe(res => this.isLocationPopupShow = res);
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

  private createLocationChangeForm(): void {
    this.locationForm = this.fb.group({
      location: ['', [Validators.min(1000), Validators.max(9999)]]
    });
  }
}
