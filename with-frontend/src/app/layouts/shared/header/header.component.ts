import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { RestaurantLocalStorage } from 'src/app/restaurants/restaurant/DTO/RestaurantLocalStorage.model';
import { CartService } from 'src/app/shared/cart.service';
import { LocalStorageService } from 'src/app/shared/localStorage.service';
import { LocationService } from 'src/app/shared/location.service';
import { RestaurantService } from 'src/app/shared/restaurant.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {

  locationForm: FormGroup;
  nameForAvatar = 'VB';
  loggedInUserName = 'Balázs';
  isLocationPopupShow = false;
  zip = null;
  city = null;
  order = {} as RestaurantLocalStorage;
  restaurant: any;
  restaurantName = '';
  totalPrice = null;
  orderAmount = 0;
  selectedOrderItem = null;
  restaurantChangeSub: Subscription;
  localstorageOrderDataSubscription: Subscription;
  isCartShow = false;
  isUserSettingsShow = false;

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    public locationService: LocationService,
    private localStorageService: LocalStorageService,
    private http: HttpClient,
    private restaurantService: RestaurantService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getZipAndCityFromLocalStorage();
    this.locationService.isLocationSelectorOpen$.subscribe(res => this.isLocationPopupShow = res);
    this.localStorageService.watchLocationStorage().subscribe((data: string) => {
      this.getZipAndCityFromLocalStorage();
    });
    this.createLocationChangeForm();

    this.restaurant = this.restaurantService.restaurant;
    if (this.restaurant) {
      this.restaurantName = this.restaurant.restaurantname;
      this.getOrderDataOf(this.restaurant.restaurantid);
    }

    this.restaurantChangeSub = this.restaurantService.restaurantChange.subscribe(restaurant => {
      if (restaurant) {
        this.restaurant = restaurant;
        this.restaurantName = this.restaurant.restaurantname;
        this.getOrderDataOf(this.restaurant.restaurantid);
      }
      this.cdr.detectChanges();
    });

    this.localstorageOrderDataSubscription = this.localStorageService.watchOrderDataStorage().subscribe((restaurantId: number) => {
      this.getOrderDataOf(restaurantId);
    });
  }

  ngOnDestroy(): void {
    this.restaurantChangeSub.unsubscribe();
    this.localstorageOrderDataSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  toggleCartShow(): void {
    this.isCartShow = !this.isCartShow;
  }

  closeCart(): void {
    this.isCartShow = false;
  }

  toggleUserSettingsShow(): void {
    this.isUserSettingsShow = !this.isUserSettingsShow;
  }

  closeUserSettings(): void {
    this.isUserSettingsShow = false;
  }

  resetOrder(): void {
    this.cartService.resetOrder(this.restaurant.restaurantid);
  }

  isMinimumOrderCompleted(): boolean {
    return this.totalPrice >= this.restaurant.minimumordervalue;
  }

  getOrderDataOf(restaurantId): void {
    this.order = this.cartService.getExistingRestaurantOrderData(restaurantId);
    this.totalPrice = this.cartService.calculateTotalPrice(this.order);
    this.orderAmount = this.cartService.calculateOrderAmount(this.order);
  }

  isRestaurantClosed(): boolean {
    return !this.restaurant.isrestaurantopenfororders;
  }

  openOrderDeleteModal(modal, orderItem): void {
    this.selectedOrderItem = orderItem;
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'});
  }

  deleteSelectedOrderItem(orderItem): void {
    this.cartService.removeSelectedOrderItem(orderItem, this.restaurant.restaurantid);
    this.closeModal();
  }

  closeModal(): void {
    this.selectedOrderItem = null;
    this.modalService.dismissAll();
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isAllAuthInfoAvailable();
  }

  toggleLocationPopup(): void {
    this.isLocationPopupShow = !this.isLocationPopupShow;
  }

  isLoginPage(): boolean {
    return this.router.url === '/';
  }

  isCheckoutPage(): boolean {
    return this.router.url === '/checkout';
  }

  submitByEnterButton(event): void {
    const ENTER_KEY_CODE = 13;
    if (event.keyCode === ENTER_KEY_CODE) {
      if (this.locationForm.valid) {
        this.getZipAndCityName(this.locationForm.get('location').value);
      }
    }
  }

  private getZipAndCityName(zip: string): Subscription {
    return this.http.get<any>(`${environment.apiUrl}/location/zip/${zip}`).subscribe(
      (resp) => {
        if (resp[0]?.city && resp[0]?.zipcode) {
          this.localStorageService.setCity(resp[0].city);
          this.localStorageService.setZip(resp[0].zipcode);
        }
        this.isLocationPopupShow = false;
        this.locationForm.reset();
      }, (error) => {
      }
    );
  }

  private getZipAndCityFromLocalStorage(): void {
    this.zip = this.localStorageService.getZip;
    this.city = this.localStorageService.getCity;
  }

  private createLocationChangeForm(): void {
    this.locationForm = this.fb.group({
      location: ['', [Validators.min(1000), Validators.max(9999)]]
    });
  }
}
