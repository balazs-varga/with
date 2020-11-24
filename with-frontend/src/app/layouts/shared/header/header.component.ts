import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/auth.service';

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
    private router: Router
  ) { }

  ngOnInit(): void {
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
