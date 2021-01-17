import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { passwordValidator, phoneValidator } from 'src/app/shared/validation/input-field.validator';
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

  changePrivacy(isClicked: boolean): void {
    this.registrationForm.patchValue({
      isDataPrivacyAccepted: isClicked
    });
  }

  private redirectToIndexPage(): void {
    this.router.navigate(['/']);
  }

  private createRegistrationForm(): void {
    this.registrationForm = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      password: new FormControl('', [Validators.required, passwordValidator, Validators.minLength(8), Validators.maxLength(25)]),
      c_password: new FormControl('', [Validators.required, passwordValidator, Validators.minLength(8), Validators.maxLength(25)]),
      phone: new FormControl('', [Validators.required, phoneValidator]),
      country: new FormControl('Hungary', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      city: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
      zipcode: new FormControl('', [Validators.required, Validators.min(1000), Validators.max(9999)]),
      address: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      isDataPrivacyAccepted: new FormControl(false, Validators.required)
    },
      passwordMatchValidator
    );
  }
}
