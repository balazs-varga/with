import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantRoutingModule } from './restaurant.routing';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RestaurantsComponent } from './restaurant-list/restaurants.component';

@NgModule({
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    RestaurantsComponent
  ]
})
export class RestaurantModule { }
