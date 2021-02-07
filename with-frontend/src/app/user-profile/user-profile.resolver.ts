import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserProfileResolver implements Resolve<object> {

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<object> {
        return this.http.get<any>(`${environment.apiUrl}/customer/details`)
            .pipe(
                catchError((err) => {
                    this.router.navigate(['/']);
                    return err;
                })
            );
    }
}
