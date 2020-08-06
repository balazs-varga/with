import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from '../layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
 {
   path: '', component: AuthLayoutComponent, children: [
     { path: 'login', component: LoginComponent },
     { path: 'registration', component: RegistrationComponent },
    ]
 }
];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class AuthRoutingModule { }
