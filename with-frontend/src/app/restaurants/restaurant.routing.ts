import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicLayoutComponent } from '../layouts/basic-layout/basic-layout.component';
import { RestaurantsComponent } from './restaurant-list/restaurants.component';

const routes: Routes = [
    {
        path: '', component: BasicLayoutComponent, children: [
            {
                path: 'restaurants', component: RestaurantsComponent, pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RestaurantRoutingModule { }
