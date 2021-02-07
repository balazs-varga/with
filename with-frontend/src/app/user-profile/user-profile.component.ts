import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { passwordValidator, phoneValidator, cityValidator, addressValidator } from '../shared/validation/input-field.validator';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user = null;
  userProfileForm: FormGroup;
  passwordResetForm: FormGroup;
  userProfileErrorMessage = '';
  userProfileSuccessMessage = '';
  passwordErrorMessage = '';
  passwordSuccessMessage = '';
  isPasswordVisible = false;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.user = this.route.snapshot.data.user;
    this.createUserProfileForm();
    this.createPasswordResetForm();
  }

  updateUserProfile(): Subscription {
    this.isLoading = true;
    this.userProfileErrorMessage = '';
    this.userProfileSuccessMessage = '';
    return this.http.post<any>(`${environment.apiUrl}/customer/update/details`, this.userProfileForm.getRawValue()).subscribe(
      (response) => {
        this.userProfileSuccessMessage = 'Sikeres mentés';
        this.isLoading = false;
      }, (error) => {
        this.isLoading = false;
      }
    );
  }

  updatePassword(): Subscription {
    this.isLoading = true;
    this.passwordErrorMessage = '';
    this.passwordSuccessMessage = '';
    return this.http.post<any>(`${environment.apiUrl}/customer/update/password`, this.passwordResetForm.getRawValue()).subscribe(
      (response) => {
        this.passwordSuccessMessage = 'A jelszava módosult';
        this.isLoading = false;
      }, (error) => {
        if (error.error.error === 'Current password is not valid.') {
          this.passwordErrorMessage = 'A megadott jelszó nem egyezik a jelenlegi jelszavával';
        }
        this.isLoading = false;
      }
    );
  }

  toggleShowPassword(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  private createUserProfileForm(): void {
    this.userProfileForm = new FormGroup({
      firstname: new FormControl(this.user?.firstname, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      lastname: new FormControl(this.user?.lastname, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
      email: new FormControl(this.user?.email, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      phone: new FormControl(this.user?.phone, [Validators.required, phoneValidator]),
      country: new FormControl(this.user?.country, [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      city: new FormControl(this.user?.city, [Validators.required, Validators.minLength(3), Validators.maxLength(25), cityValidator]),
      zipcode: new FormControl(this.user?.zipcode, [Validators.required, Validators.min(1000), Validators.max(9999)]),
      address: new FormControl(this.user?.address,
        [Validators.required, Validators.minLength(5), Validators.maxLength(50), addressValidator])
    });
  }

  private createPasswordResetForm(): void {
    this.passwordResetForm = new FormGroup({
      old_password: new FormControl('', [Validators.required, passwordValidator, Validators.minLength(8), Validators.maxLength(25)]),
      new_password: new FormControl('', [Validators.required, passwordValidator, Validators.minLength(8), Validators.maxLength(25)]),
      new_password_confirm: new FormControl('', [Validators.required, passwordValidator, Validators.minLength(8), Validators.maxLength(25)])
    },
      this.passwordMatchValidator
    );
  }

  private passwordMatchValidator(g: FormGroup) {
    return g.get('new_password').value === g.get('new_password_confirm').value
      ? null : { mustMatch: true };
  }
}
