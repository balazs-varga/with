import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {

  readonly zip = 'zip';
  readonly city = 'city';

  private storageSub = new Subject<string>();

  get getZip(): string {
    return localStorage.getItem(this.zip);
  }

  get getCity(): string {
    return localStorage.getItem(this.city);
  }

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  setZip(zip): void {
    localStorage.setItem(this.zip, zip);
    this.storageSub.next('changed');
  }

  setCity(city): void {
    localStorage.setItem(this.city, city);
    this.storageSub.next('changed');
  }

  isZipAndCityStorageAvailable(): boolean {
    return localStorage.getItem(this.zip) != null && localStorage.getItem(this.city) != null;
  }

  clearZipAndCityStorage(): void {
    localStorage.removeItem(this.zip);
    localStorage.removeItem(this.city);
    this.storageSub.next('changed');
  }
}
