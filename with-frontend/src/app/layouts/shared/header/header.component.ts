import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { LocationService } from 'src/app/shared/location.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  nameForAvatar = 'VB';
  loggedInUserName = 'Balázs';
  isLocationPopupShow = false;

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    public locationService: LocationService
  ) { }

  ngOnInit(): void {
    this.locationService.isLocationSelectorOpen$.subscribe(res => this.isLocationPopupShow = res)
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
}
