import { KeyValue } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';
import { LocationService } from 'src/app/shared/location.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit, OnDestroy {

  isPizzaCreatorShow = false;
  restaurant = null;
  mapEmbed = null;
  isLoading = false;
  productsByCategory = new Map();
  selectedProduct = null;
  sectionScroll = null;
  pizzaDesigner = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    public authService: AuthenticationService,
    public locationService: LocationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscribeToRouteParams();

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      this.doScroll();
      this.sectionScroll = null;
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
}
