import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { passwordMatchValidator } from 'src/app/shared/validation/must-match.validator';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit, OnDestroy {

  passwordResetForm: FormGroup;
  uuid = null;
  isPasswordVisible = false;
  isLoading = false;
  passwordResetErrorMessage = '';
  successMessage = '';

  private routeParamSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getUUIDFromUrl();
    this.createPasswordResetForm();
  }

  ngOnDestroy(): void {
    this.routeParamSub.unsubscribe();
  }

  resetPassword(): Subscription {
    this.isLoading = true;
    this.resetMessages();
    const passwordResetDTO = {
      token: this.uuid,
      new_password: this.passwordResetForm.get('password').value,
      new_password_confirm: this.passwordResetForm.get('c_password').value
    };
    return this.http.post<any>(`${environment.apiUrl}/reset`, passwordResetDTO).subscribe(
      (response) => {
        if (response.success) {
          this.successMessage = 'A jelszavát sikeresen megváltoztattuk, kattintson a vissza a bejelentkezés gombra';
        }
        this.isLoading = false;
      }, (error) => {
        if (error.status === 401 && error.error.error === 'Invalid token.') {
          this.passwordResetErrorMessage = 'Érvénytelen token';
        } else if (error.status === 401 && error.error.error === 'The new password can not be the same as the current.') {
          this.passwordResetErrorMessage = 'Az új jelszó nem egyezhet meg az előzővel';
        }
        this.isLoading = false;
      }
    );
  }

  toggleShowPassword(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  private resetMessages(): void {
    this.passwordResetErrorMessage = '';
    this.successMessage = '';
  }

  private getUUIDFromUrl(): void {
    this.routeParamSub = this.route.paramMap.subscribe(
      params => {
        this.uuid = params.get('uuid');
      }
    );
  }

  private createPasswordResetForm(): void {
    this.passwordResetForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]),
      c_password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]),
    }, passwordMatchValidator);

    this.passwordResetForm.get('password').valueChanges.subscribe(
      () => {
        this.resetMessages();
      }
    );

    this.passwordResetForm.get('c_password').valueChanges.subscribe(
      () => {
        this.resetMessages();
      }
    );
  }
}
