import { Injectable } from '@angular/core';
import { LocalStorageService } from './localStorage.service';

@Injectable({ providedIn: 'root' })
export class CartService {

    constructor(
        private localStorageService: LocalStorageService
    ) { }
}
