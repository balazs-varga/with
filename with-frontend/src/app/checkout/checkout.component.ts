import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../shared/cart.service';
import { DeliveryType } from './delivery-type.enum';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  restaurant = null;
  isLoading = false;
  order = null;
  productsTotalPrice = null;
  checkoutForm: FormGroup;
  deliveryType = DeliveryType;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.subscribeToRouteParams();
    this.createCheckoutForm();
  }

  navigateToRestaurantPage(): void {
    this.router.navigateByUrl('/restaurants/' + this.restaurant.lowercasename);
  }

  private subscribeToRouteParams(): void {
    this.isLoading = true;
    this.restaurant = this.activatedRoute.snapshot.data.restaurant;
    if (!this.restaurant || !this.restaurant.isrestaurantopenfororders) {
      this.navigateToIndexPage();
    }
    this.order = this.cartService.getExistingRestaurantOrderData(this.restaurant.restaurantid);
    this.productsTotalPrice = this.cartService.calculateTotalPrice(this.order);
    this.isLoading = false;
    if (!this.isMinimumOrderCompleted()) {
      this.navigateToIndexPage();
    }
  }

  isDelivery(): boolean {
    return this.checkoutForm.value.deliveryType === 'delivery';
  }

  isInvoiceRequested(): boolean {
    return this.checkoutForm.value.is_invoice_requested;
  }

  orderProducts(): void {
    if (this.checkoutForm.value.is_invoice_requested === false) {
      this.checkoutForm.get('is_invoice_requested').setValue(0, { emitEvent: false });
    } else if (this.checkoutForm.value.is_invoice_requested === true) {
      this.checkoutForm.get('is_invoice_requested').setValue(1, { emitEvent: false });
    }

    if (this.checkoutForm.value.invoice_is_company === false) {
      this.checkoutForm.get('invoice_is_company').setValue(0, { emitEvent: false });
    } else if (this.checkoutForm.value.invoice_is_company === true) {
      this.checkoutForm.get('invoice_is_company').setValue(1, { emitEvent: false });
    }

    // TODO create DTO, validate total price, call online payment api if necessary
  }

  private navigateToIndexPage(): void {
    this.router.navigateByUrl('/');
  }

  private isMinimumOrderCompleted(): boolean {
    return this.productsTotalPrice >= this.restaurant.minimumordervalue;
  }

  private createCheckoutForm(): void {
    this.checkoutForm = new FormGroup({
      restaurant_id: new FormControl(this.restaurant.restaurantid, Validators.required),
      is_delivery: new FormControl(1, Validators.required),
      deliveryType: new FormControl(this.deliveryType.DELIVERY, Validators.required),
      customer_country: new FormControl('Hungary', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      customer_city: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
      customer_zipcode: new FormControl('', [Validators.required, Validators.min(1000), Validators.max(9999)]),
      customer_address: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      comment: new FormControl('', Validators.maxLength(2000)),
      totalPrice: new FormControl(this.productsTotalPrice + +this.restaurant.deliveryprice, Validators.required),
      is_invoice_requested: new FormControl(false, Validators.required),
      invoice_is_company: new FormControl(null),
      invoice_name: new FormControl(null),
      invoice_zipcode: new FormControl(null),
      invoice_city: new FormControl(null),
      invoice_address: new FormControl(null),
      invoice_tax_number: new FormControl(null),
      customer_ip_address: new FormControl(null),
      paying_method: new FormControl(null, Validators.required)
    });

    this.checkoutForm.get('deliveryType').valueChanges.subscribe((value) => {
      if (value === this.deliveryType.DELIVERY) {
        this.checkoutForm.get('customer_country').setValidators([Validators.required, Validators.minLength(5), Validators.maxLength(25)]);
        this.checkoutForm.get('customer_city').setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(25)]);
        this.checkoutForm.get('customer_zipcode').setValidators([Validators.required, Validators.min(1000), Validators.max(9999)]);
        this.checkoutForm.get('customer_address').setValidators([Validators.required, Validators.minLength(5), Validators.maxLength(50)]);
        this.checkoutForm.get('customer_country').setValue('Hungary', { emitEvent: false });
        this.checkoutForm.get('is_delivery').setValue(1, { emitEvent: false });
        this.checkoutForm.get('customer_country').updateValueAndValidity({ emitEvent: false });
        this.checkoutForm.get('customer_city').updateValueAndValidity({ emitEvent: false });
        this.checkoutForm.get('customer_zipcode').updateValueAndValidity({ emitEvent: false });
        this.checkoutForm.get('customer_address').updateValueAndValidity({ emitEvent: false });
        this.checkoutForm.get('totalPrice').setValue(
          this.checkoutForm.value.totalPrice + +this.restaurant.deliveryprice, { emitEvent: false });
      } else {
        this.checkoutForm.get('customer_country').setValidators(null);
        this.checkoutForm.get('customer_city').setValidators(null);
        this.checkoutForm.get('customer_zipcode').setValidators(null);
        this.checkoutForm.get('customer_address').setValidators(null);
        this.checkoutForm.get('is_delivery').setValue(0, { emitEvent: false });
        this.checkoutForm.get('customer_country').setValue(null, { emitEvent: false });
        this.checkoutForm.get('customer_city').setValue('', { emitEvent: false });
        this.checkoutForm.get('customer_zipcode').setValue('', { emitEvent: false });
        this.checkoutForm.get('customer_address').setValue('', { emitEvent: false });
        this.checkoutForm.get('customer_country').updateValueAndValidity({ emitEvent: false });
        this.checkoutForm.get('customer_city').updateValueAndValidity({ emitEvent: false });
        this.checkoutForm.get('customer_zipcode').updateValueAndValidity({ emitEvent: false });
        this.checkoutForm.get('customer_address').updateValueAndValidity({ emitEvent: false });
        this.checkoutForm.get('totalPrice').setValue(
          this.checkoutForm.value.totalPrice - +this.restaurant.deliveryprice, { emitEvent: false });
      }
    });

    this.checkoutForm.get('is_invoice_requested').valueChanges.subscribe((value) => {
      if (value === true) {
        this.checkoutForm.get('invoice_is_company').setValidators(Validators.required);
        this.checkoutForm.get('invoice_is_company').setValue(false, { emitEvent: false });
        this.checkoutForm.get('invoice_name').setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
        this.checkoutForm.get('invoice_zipcode').setValidators([Validators.required, Validators.min(1000), Validators.max(9999)]);
        this.checkoutForm.get('invoice_city').setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(25)]);
        this.checkoutForm.get('invoice_address').setValidators([Validators.required, Validators.minLength(5), Validators.maxLength(50)]);
        this.checkoutForm.get('invoice_tax_number').setValidators([Validators.required]);
        this.checkoutForm.get('invoice_is_company').updateValueAndValidity({ emitEvent: false });
        this.checkoutForm.get('invoice_name').updateValueAndValidity({ emitEvent: false });
        this.checkoutForm.get('invoice_zipcode').updateValueAndValidity({ emitEvent: false });
        this.checkoutForm.get('invoice_city').updateValueAndValidity({ emitEvent: false });
        this.checkoutForm.get('invoice_address').updateValueAndValidity({ emitEvent: false });
        this.checkoutForm.get('invoice_tax_number').updateValueAndValidity({ emitEvent: false });
      } else {
        this.checkoutForm.get('invoice_is_company').setValidators(null);
        this.checkoutForm.get('invoice_is_company').setValue(null, { emitEvent: false });
        this.checkoutForm.get('invoice_name').setValidators(null);
        this.checkoutForm.get('invoice_name').setValue(null, { emitEvent: false });
        this.checkoutForm.get('invoice_zipcode').setValidators(null);
        this.checkoutForm.get('invoice_zipcode').setValue(null, { emitEvent: false });
        this.checkoutForm.get('invoice_city').setValidators(null);
        this.checkoutForm.get('invoice_city').setValue(null, { emitEvent: false });
        this.checkoutForm.get('invoice_address').setValidators(null);
        this.checkoutForm.get('invoice_address').setValue(null, { emitEvent: false });
        this.checkoutForm.get('invoice_tax_number').setValidators(null);
        this.checkoutForm.get('invoice_tax_number').setValue(null, { emitEvent: false });
        this.checkoutForm.get('invoice_is_company').updateValueAndValidity({ emitEvent: false });
        this.checkoutForm.get('invoice_name').updateValueAndValidity({ emitEvent: false });
        this.checkoutForm.get('invoice_zipcode').updateValueAndValidity({ emitEvent: false });
        this.checkoutForm.get('invoice_city').updateValueAndValidity({ emitEvent: false });
        this.checkoutForm.get('invoice_address').updateValueAndValidity({ emitEvent: false });
        this.checkoutForm.get('invoice_tax_number').updateValueAndValidity({ emitEvent: false });
      }
    });
  }
}
