import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RestaurantLocalStorage } from '../restaurants/restaurant/DTO/RestaurantLocalStorage.model';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {

  readonly zip = 'zip';
  readonly city = 'city';

  private storageCityAndZipSub = new Subject<string>();
  private storageOrderDataSub = new Subject<number>();

  get getZip(): string {
    return localStorage.getItem(this.zip);
  }

  get getCity(): string {
    return localStorage.getItem(this.city);
  }

  watchLocationStorage(): Observable<any> {
    return this.storageCityAndZipSub.asObservable();
  }

  watchOrderDataStorage(): Observable<any> {
    return this.storageOrderDataSub.asObservable();
  }

  getRestaurandOrderData(restaurantId): string {
    return localStorage.getItem(restaurantId);
  }

  setRestaurantOrderData(restaurantId, restaurantOrder: RestaurantLocalStorage): void {
    localStorage.setItem(restaurantId, JSON.stringify(restaurantOrder));
    this.storageOrderDataSub.next(restaurantId);
  }

  setZip(zip): void {
    localStorage.setItem(this.zip, zip);
    this.storageCityAndZipSub.next('changed');
  }

  setCity(city): void {
    localStorage.setItem(this.city, city);
    this.storageCityAndZipSub.next('changed');
  }

  isZipAndCityStorageAvailable(): boolean {
    return localStorage.getItem(this.zip) != null && localStorage.getItem(this.city) != null;
  }

  isRestaurandOrderDataAvailable(restaurantId): boolean {
    return localStorage.getItem(restaurantId) != null;
  }

  clearZipAndCityStorage(): void {
    localStorage.removeItem(this.zip);
    localStorage.removeItem(this.city);
    this.storageCityAndZipSub.next('changed');
  }

  clearRestaurantOrderStorage(restaurantId): void {
    localStorage.removeItem(restaurantId);
    this.storageOrderDataSub.next(restaurantId);
  }
}
