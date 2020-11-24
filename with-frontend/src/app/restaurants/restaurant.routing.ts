import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicLayoutComponent } from '../layouts/basic-layout/basic-layout.component';
import { RestaurantsComponent } from './restaurant-list/restaurants.component';
import { RestaurantComponent } from './restaurant/restaurant.component';

const routes: Routes = [
    {
        path: '', component: BasicLayoutComponent, children: [
            {
                path: 'restaurants', component: RestaurantsComponent
            },
            {
                path: 'restaurants/:id', component: RestaurantComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RestaurantRoutingModule { }
