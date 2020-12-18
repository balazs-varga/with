import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RestaurantResolver implements Resolve<object> {

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<object> {
        return this.http.get<any>(`${environment.apiUrl}/restaurant/alldata/lowercasename/` + route.paramMap.get('lowercaseName'))
            .pipe(
                catchError((err) => {
                    this.router.navigate(['/']);
                    return err;
                })
            );
    }
}
