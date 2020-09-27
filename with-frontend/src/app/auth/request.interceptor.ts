import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpClientRequestInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentToken = localStorage.getItem('token');

        if (currentToken) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentToken}`
                }
            });
        }

        req = req.clone({
            setHeaders: {
                'X-Requested-With': `XMLHttpRequest`
            }
        });

        return next.handle(req);
    }
}
