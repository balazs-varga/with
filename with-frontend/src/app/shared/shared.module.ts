import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DeleteOrderModalComponent } from './delete-order-modal/delete-order-modal.component';
import { ClickOutsideDirective } from './click-outside.directive';
import { DeleteAllOrderModalComponent } from './delete-all-order-modal/delete-all-order-modal.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    LoadingSpinnerComponent,
    DeleteOrderModalComponent,
    DeleteAllOrderModalComponent,
    ClickOutsideDirective
  ],
  declarations: [
    LoadingSpinnerComponent,
    DeleteOrderModalComponent,
    DeleteAllOrderModalComponent,
    ClickOutsideDirective
  ]
})
export class SharedModule { }
