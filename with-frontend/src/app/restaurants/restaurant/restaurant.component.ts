import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  isPizzaCreatorShow = false;
  restaurant = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    public authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.subscribeToRouteParams();
  }

  toggleShowPizzaCreator(): void {
    this.isPizzaCreatorShow = !this.isPizzaCreatorShow;
  }

  isLoggedIn(): boolean {
    return this.authService.isAllAuthInfoAvailable();
  }

  private subscribeToRouteParams(): void {
    this.restaurant = this.activatedRoute.snapshot.data.restaurant;
  }
}
