import { KeyValue } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  isPizzaCreatorShow = false;
  restaurant = null;
  mapEmbed = null;
  isLoading = false;
  productsByCategory = new Map();
  selectedProduct = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    public authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.subscribeToRouteParams();
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

  keyAscOrder = (a: KeyValue<any,any>, b: KeyValue<any,any>): number => {
    return a.key.id < b.key.id ? -1 : (b.key.id < a.key.id ? 1 : 0);
  }

  private subscribeToRouteParams(): void {
    this.isLoading = true;
    this.restaurant = this.activatedRoute.snapshot.data.restaurant;
    if (this.restaurant.mapembed) {
      this.mapEmbed = this.transform(this.restaurant.mapembed);
    }
    if (this.restaurant.categories.length > 0) {
      this.getAllProducts(this.restaurant.categories);
    }
    this.isLoading = false;
  }

  private getAllProducts(categories): void {
    categories.forEach(category => {
      this.getProductsByCategoryId(category);
    });
  }

  private getProductsByCategoryId(category): void {
    this.http.get<any>(`${environment.apiUrl}/restaurant/` + this.restaurant.restaurantid + `/products/category/` + category.id).subscribe((res) => {
      this.productsByCategory.set(category, res);
    });
  }

  private transform(url): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
