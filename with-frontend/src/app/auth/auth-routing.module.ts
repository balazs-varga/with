import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from '../layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
 {
   path: '', component: AuthLayoutComponent, children: [
     { path: 'login', component: LoginComponent, pathMatch: 'full' },
     { path: 'registration', component: RegistrationComponent, pathMatch: 'full' },
    ]
 }
];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class AuthRoutingModule { }
