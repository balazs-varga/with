import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DeleteOrderModalComponent } from './delete-order-modal/delete-order-modal.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    LoadingSpinnerComponent,
    DeleteOrderModalComponent
  ],
  declarations: [
    LoadingSpinnerComponent,
    DeleteOrderModalComponent
  ]
})
export class SharedModule { }
