import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { passwordMatchValidator } from 'src/app/shared/validation/must-match.validator';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  isPasswordVisible = false;
  registrationErrorMessage = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.createRegistrationForm();
  }

  registration(): Subscription {
    this.registrationErrorMessage = '';
    return this.http.post<any>(`${environment.apiUrl}/register`, this.registrationForm.getRawValue()).subscribe(
      (response) => {
        if (response.success.token) {
          this.authService.clearAuthInfo();
          this.authService.extractTokenResponse(response);
          this.redirectToIndexPage();
        }
      }, (error) => {
        if (error.error.error.email) {
          this.registrationErrorMessage = 'Az email cím már foglalt';
        }
      }
    );
  }

  toggleShowPassword(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  private redirectToIndexPage(): void {
    this.router.navigate(['/']);
  }

  private phoneValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const phoneRegex = /^((?:\+?3|0)6)(?:-|\()?(\d{1,2})(?:-|\))?(\d{3})-?(\d{3,4})$/;
    if (control.value && !phoneRegex.test(control.value)) {
      return { invalidPhoneFormat: true };
    }
    return null;
  }

  private createRegistrationForm(): void {
    this.registrationForm = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]),
      c_password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]),
      phone: new FormControl('', [Validators.required, this.phoneValidator]),
      country: new FormControl('Hungary', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      city: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
      zipcode: new FormControl('', [Validators.required, Validators.min(1000), Validators.max(9999)]),
      address: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
    },
      passwordMatchValidator
    );
  }
}
