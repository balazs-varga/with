import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { PasswordForgotComponent } from './password/password-forgot/password-forgot.component';
import { SharedModule } from '../shared/shared.module';
import { PasswordResetComponent } from './password/password-reset/password-reset.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    LoginComponent,
    RegistrationComponent,
    PasswordForgotComponent,
    PasswordResetComponent
  ]
})
export class AuthModule { }
