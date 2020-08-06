import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isPasswordVisible = false;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  login(): void {

  }

  toggleShowPassword(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  // use password regex
  private createLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
