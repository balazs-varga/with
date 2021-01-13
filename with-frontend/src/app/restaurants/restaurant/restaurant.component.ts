import { KeyValue } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';
import { LocationService } from 'src/app/shared/location.service';
import { LocalStorageService } from 'src/app/shared/localStorage.service';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit, OnDestroy {

  selectedProductForm: FormGroup;
  isPizzaCreatorShow = false;
  restaurant = null;
  mapEmbed = null;
  isLoading = false;
  productsByCategory = new Map();
  selectedProduct = null;
  sectionScroll = null;
  pizzaDesigner = null;
  zip = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    public authService: AuthenticationService,
    public locationService: LocationService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscribeToRouteParams();
    this.getZipAndCityFromLocalStorage();
    this.isRestaurantDeliversToSelectedCity();

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      this.doScroll();
      this.sectionScroll = null;
    });

    this.localStorageService.watchStorage().subscribe((data: string) => {
      this.getZipAndCityFromLocalStorage();
      this.isRestaurantDeliversToSelectedCity();
    });
  }

  ngOnDestroy(): void {
    this.locationService.changeIsLocationSelectorOpen(false);
  }

  toggleShowPizzaCreator(): void {
    this.isPizzaCreatorShow = !this.isPizzaCreatorShow;
  }

  isLoggedIn(): boolean {
    return this.authService.isAllAuthInfoAvailable();
  }

  navigateToFacebook(facebookLink: string): void {
    window.open(facebookLink, '_blank');
  }

  openModal(product): void {
    this.selectedProduct = product;
    this.createSelectedProductForm(product);
  }

  keyAscOrder = (a: KeyValue<any, any>, b: KeyValue<any, any>): number => {
    return a.key.id < b.key.id ? -1 : (b.key.id < a.key.id ? 1 : 0);
  }

  getCurrentPage(): string {
    let currentUrl = this.router.url;
    currentUrl = currentUrl.substring(1);
    currentUrl = currentUrl.split('#')[0];
    return currentUrl;
  }

  internalRoute(dst, index): void {
    this.sectionScroll = dst + '-' + index;
    this.router.navigate([this.getCurrentPage()], { fragment: this.sectionScroll });
  }

  doScroll(): void {
    if (!this.sectionScroll) {
      return;
    }
    try {
      const elements = document.getElementById(this.sectionScroll);

      elements.scrollIntoView();
    }
    finally {
      this.sectionScroll = null;
    }
  }

  isRestaurantDeliversToSelectedCity(): boolean {
    if (this.restaurant.zipcodes) {
      return this.restaurant.zipcodes.some(e => e.zipcode === this.zip);
    }
    return false;
  }

  decreaseQuantity(): void {
    if (this.selectedProductForm.get('quantity').value !== 1) {
      this.selectedProductForm.get('quantity').setValue(this.selectedProductForm.get('quantity').value - 1);
    }
  }

  increaseQuantity(): void {
    if (this.selectedProductForm.get('quantity').value < 20) {
      this.selectedProductForm.get('quantity').setValue(this.selectedProductForm.get('quantity').value + 1);
    }
  }

  isSelectedProductMenu(): boolean {
    return this.selectedProduct && this.selectedProduct.type === 'menu';
  }

  extraCheckBoxChange(extraId, isChecked): void {
    const selectedExtraList = this.selectedProductForm.get('selectedExtras').value;
    if (isChecked) {
      selectedExtraList.push(extraId);
    } else {
      if (selectedExtraList.some(e => e === extraId)) {
        const index = selectedExtraList.indexOf(extraId, 0);
        if (index > -1) {
          selectedExtraList.splice(index, 1);
        }
      }
    }
    this.selectedProductForm.get('selectedExtras').setValue(selectedExtraList);
  }

  addSelectedProductToCart() {
    
  }

  private subscribeToRouteParams(): void {
    this.isLoading = true;
    this.restaurant = this.activatedRoute.snapshot.data.restaurant;
    if (this.restaurant.mapembed) {
      this.mapEmbed = this.transform(this.restaurant.mapembed);
    }
    if (this.restaurant.categories?.length > 0) {
      this.getAllProducts(this.restaurant.categories);
    }
    this.getPizzaDesignerDetails(this.restaurant);
    this.isLoading = false;
  }

  private getZipAndCityFromLocalStorage(): void {
    this.zip = this.localStorageService.getZip;
  }

  private getPizzaDesignerDetails(restaurant): void {
    this.http.get<any>(`${environment.apiUrl}/restaurant/` +
      restaurant.restaurantid + `/products/pizzadesigner`).subscribe((res) => {
        this.pizzaDesigner = res;
      });
  }

  private getAllProducts(categories): void {
    categories.forEach(category => {
      this.getProductsByCategoryId(category);
    });
  }

  private getProductsByCategoryId(category): void {
    this.http.get<any>(`${environment.apiUrl}/restaurant/` +
      this.restaurant.restaurantid + `/products/category/` + category.id).subscribe((res) => {
        this.productsByCategory.set(category, res);
      });
  }

  private transform(url): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  private createSelectedProductForm(product): void {
    this.selectedProductForm = new FormGroup({
      selectedProductId: new FormControl(product.id),
      selectedSide: new FormControl(null),
      selectedDrink: new FormControl(null),
      selectedExtras: new FormControl([], this.selectedExtraLengthValidator(product.extralimit)),
      quantity: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(20)])
    });

    if (product.type === 'menu') {
      this.selectedProductForm.get('selectedSide').setValidators(Validators.required);
      this.selectedProductForm.get('selectedDrink').setValidators(Validators.required);
      this.selectedProductForm.get('selectedSide').updateValueAndValidity();
      this.selectedProductForm.get('selectedDrink').updateValueAndValidity();
    }
  }

  private selectedExtraLengthValidator(extralimit): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
      control.value.length > extralimit
        ? { wrongColor: control.value } : null;
  }
}
