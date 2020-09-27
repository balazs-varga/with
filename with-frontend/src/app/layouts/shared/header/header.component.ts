import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  nameForAvatar = 'VB';
  loggedInUserName = 'Balázs';

  constructor(
    public auth: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.auth.logout().subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
