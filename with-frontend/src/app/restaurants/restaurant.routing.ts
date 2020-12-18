import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicLayoutComponent } from '../layouts/basic-layout/basic-layout.component';
import { RestaurantsComponent } from './restaurant-list/restaurants.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RestaurantResolver } from './restaurant/restaurant.resolver';

const routes: Routes = [
    {
        path: '', component: BasicLayoutComponent, children: [
            {
                path: 'restaurants', component: RestaurantsComponent, pathMatch: 'full'
            },
            {
                path: 'restaurants/:lowercaseName', component: RestaurantComponent, pathMatch: 'full', resolve: {
                    restaurant: RestaurantResolver
                }

            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RestaurantRoutingModule { }
