import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  isPizzaCreatorShow = false;

  constructor(
    public authService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  toggleShowPizzaCreator(): void {
    this.isPizzaCreatorShow = !this.isPizzaCreatorShow;
  }

  isLoggedIn(): boolean {
    return this.authService.isAllAuthInfoAvailable();
  }
}
