import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  readonly token = 'token';

  user: User;

  redirectUrl = '';

  get authHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/json');
  }

  get isLoggedIn(): boolean {
    return !(!this.isAllAuthInfoAvailable());
  }

  get isAdmin(): boolean {
    if (this.isLoggedIn) {
      return true;
      // ha lesz role ezt kell alkalmazni
      // return this.user.roles.includes('admin');
    } else {
      return false;
    }
  }

  constructor(
    private http: HttpClient
  ) {
    this.checkStorage();
  }

  loginWithUsernameAndPassword(email: string, password: string): Observable<boolean> {
    if (this.isLoggedIn) {
      this.clearAuthInfo();
    }

    const request = {
        email, password
    };

    return this.http.post<any>(`${environment.apiUrl}/login`, request, { headers: this.authHeaders })
      .pipe(
        map(
          response => {
            if (response.success.token) {
              this.extractTokenResponse(response);
              return false;
            }
            return true;
          }),
      );
  }

  extractTokenResponse(response): void {
    if (response) {
      const token = response.success.token;
      // this.user = this.tokenProcessor(token);
      localStorage.setItem(this.token, token);
    }
  }

  logout(): Observable<void> {
    return new Observable((observer) => {
      this.clearAuthInfo();
      observer.next(null);
      observer.complete();
    });
  }

  isAllAuthInfoAvailable(): boolean {
    return localStorage.getItem(this.token) != null;
  }

  clearAuthInfo(): void {
    localStorage.removeItem(this.token);
    this.user = null;
  }

  private tokenProcessor(token: string): any {
    const tokenUserPart = JSON.parse(this.b64DecodeUnicode(token.split('.', 2)[1]));
    return {
      username: tokenUserPart.sub,
      roles: tokenUserPart.roles,
      name: tokenUserPart.name,
      id: tokenUserPart.userId
    };
  }

  private b64DecodeUnicode(str: string): string {
    return decodeURIComponent(Array.prototype.map.call(atob(str), (c: string) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  private checkStorage(): void {
    const token = localStorage.getItem(this.token);

    if (token) {
      this.user = this.tokenProcessor(token);
    }
  }
}
