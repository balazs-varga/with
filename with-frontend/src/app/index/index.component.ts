import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return this.authService.isAllAuthInfoAvailable();
  }
}
