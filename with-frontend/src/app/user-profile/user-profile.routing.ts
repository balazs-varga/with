import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { BasicLayoutComponent } from '../layouts/basic-layout/basic-layout.component';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileResolver } from './user-profile.resolver';

const routes: Routes = [
    {
        path: '', component: BasicLayoutComponent, children: [
            {
                path: 'user-profile', component: UserProfileComponent, pathMatch: 'full',
                canActivate: [AuthGuard],
                resolve: {
                    user: UserProfileResolver
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserProfileRoutingModule { }
