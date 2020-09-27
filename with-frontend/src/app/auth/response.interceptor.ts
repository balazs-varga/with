import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router, ResolveStart } from '@angular/router';
import { AuthenticationService } from './auth.service';

@Injectable()
export class HttpClientResponseInterceptor implements HttpInterceptor {

    private currentUrl = '';
    private authService: AuthenticationService;
    private router: Router;
    private header = 'X-token-header';

    constructor(
        private injector: Injector
    ) {
        this.authService = this.injector.get(AuthenticationService);
        this.router = this.injector.get(Router);
        this.subscribeToNavigation();
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                return event;
            }),
            catchError(err => {
                this.catchResponseError(err, req, next);
                return throwError(err);
            })
        );
    }

    private catchResponseError(err: HttpErrorResponse, req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (err instanceof HttpErrorResponse) {
            switch (err.status) {
                case 401:
                    if (err.error && err.error.error === 'invalid_token') {
                        if (localStorage.getItem('token')) {
                            localStorage.removeItem('token');
                        }
                        return next.handle(req.clone({
                            setHeaders: { Authorization: '' }
                        }));
                    } else if (!this.authService.isLoggedIn) {
                        this.authService.redirectUrl = this.currentUrl;
                        this.router.navigate(['/login']);
                        break;
                    } else {
                        this.authService.logout().subscribe(() => {
                            this.router.navigate(['/login']);
                        });
                    }
                    break;
            }
        }
    }

    private subscribeToNavigation(): void {
        this.router.events.subscribe((event) => {
            if (event instanceof ResolveStart) {
                this.currentUrl = event.urlAfterRedirects;
            }
        });
    }
}
