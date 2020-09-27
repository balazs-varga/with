import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRoutingModule } from './index.routing';
import { IndexComponent } from './index.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RestaurantsCommunicationService } from 'src/app/restaurants/restaurants.communication.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    IndexRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    IndexComponent
  ],
  providers: [
    RestaurantsCommunicationService
  ]
})
export class IndexModule { }
