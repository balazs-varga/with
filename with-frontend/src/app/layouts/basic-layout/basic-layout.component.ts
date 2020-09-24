import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-basic-layout',
  templateUrl: './basic-layout.component.html',
  styleUrls: ['./basic-layout.component.scss']
})
export class BasicLayoutComponent implements OnInit {

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return this.authService.isAllAuthInfoAvailable();
  }
}
