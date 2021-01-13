import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordValidator } from 'src/app/shared/validation/input-field.validator';
import { AuthenticationService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isPasswordVisible = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  login(): void {
    if (this.loginForm.valid) {
      this.authService.loginWithUsernameAndPassword(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .subscribe(() => {
        if (this.authService.redirectUrl) {
          this.router.navigateByUrl(this.authService.redirectUrl);
          this.authService.redirectUrl = null;
        } else {
          this.redirectToIndexPage();
        }
      }, (error) => {
        if (error.error.error === 'Unauthorised') {
          this.errorMsg = 'Rossz email vagy jelszó';
        }
      });
    } else {
      this.errorMsg = 'Email és jelszó szükséges a bejelentkezéshez';
    }
  }

  toggleShowPassword(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  redirectToIndexPage(): void {
    this.router.navigate(['/']);
  }

  private createLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, passwordValidator, Validators.minLength(8), Validators.maxLength(25)]]
    });
  }
}
