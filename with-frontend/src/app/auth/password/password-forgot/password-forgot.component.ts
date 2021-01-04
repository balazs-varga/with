import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-password-forgot',
  templateUrl: './password-forgot.component.html',
  styleUrls: ['./password-forgot.component.scss']
})
export class PasswordForgotComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  forgotPasswordErrorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.createForgotPasswordForm();
  }

  requestNewPassword(): Subscription {
    this.forgotPasswordErrorMessage = '';
    this.successMessage = '';
    return this.http.post<any>(`${environment.apiUrl}/forgot`, this.forgotPasswordForm.getRawValue()).subscribe(
      (response) => {
        if (response.success) {
          this.successMessage = 'A jelszóváltoztatáshoz szükséges linket sikeresen elküldtük a megadott email címre';
        }
      }, (error) => {
        if (error.status === 401) {
          this.forgotPasswordErrorMessage = 'Nem létezik regisztrált felhasználó a megadott email címmmel';
        }
      }
    );
  }

  private createForgotPasswordForm(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]]
    });
  }
}
