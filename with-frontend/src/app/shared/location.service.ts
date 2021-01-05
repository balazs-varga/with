import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocationService {

    private isLocationSelectorOpen = new BehaviorSubject(false);
    isLocationSelectorOpen$ = this.isLocationSelectorOpen.asObservable();

    changeIsLocationSelectorOpen(isOpen: boolean): void {
        window.scroll(0, 0);
        this.isLocationSelectorOpen.next(isOpen);
    }
}
