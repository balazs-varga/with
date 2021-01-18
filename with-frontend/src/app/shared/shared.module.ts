import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DeleteOrderModalComponent } from './delete-order-modal/delete-order-modal.component';
import { ClickOutsideDirective } from './click-outside.directive';

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
    ClickOutsideDirective
  ],
  declarations: [
    LoadingSpinnerComponent,
    DeleteOrderModalComponent,
    ClickOutsideDirective
  ]
})
export class SharedModule { }
