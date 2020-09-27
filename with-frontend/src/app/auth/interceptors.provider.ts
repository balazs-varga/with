import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientRequestInterceptor } from './request.interceptor';
import { HttpClientResponseInterceptor } from './response.interceptor';

export const INTERCEPTORS = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpClientResponseInterceptor,
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpClientRequestInterceptor,
        multi: true
    }
];
