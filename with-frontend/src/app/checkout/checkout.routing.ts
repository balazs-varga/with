import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { BasicLayoutComponent } from '../layouts/basic-layout/basic-layout.component';
import { RestaurantResolver } from '../restaurants/restaurant/restaurant.resolver';
import { CheckoutComponent } from './checkout.component';

const routes: Routes = [
    {
        path: '', component: BasicLayoutComponent, children: [
            {
                path: 'checkout/:lowercaseName', component: CheckoutComponent, pathMatch: 'full',
                canActivate: [AuthGuard],
                resolve: {
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
export class CheckoutRoutingModule { }
