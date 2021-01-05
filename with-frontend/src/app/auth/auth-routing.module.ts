import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from '../layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './login/login.component';
import { PasswordForgotComponent } from './password/password-forgot/password-forgot.component';
import { PasswordResetComponent } from './password/password-reset/password-reset.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
 {
   path: '', component: AuthLayoutComponent, children: [
     { path: 'login', component: LoginComponent, pathMatch: 'full' },
     { path: 'registration', component: RegistrationComponent, pathMatch: 'full' },
     { path: 'password-forgot', component: PasswordForgotComponent, pathMatch: 'full' },
     { path: 'password-reset/:uuid', component: PasswordResetComponent, pathMatch: 'full' }
    ]
 }
];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class AuthRoutingModule { }
