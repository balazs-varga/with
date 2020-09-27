import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRoutingModule } from './index.routing';
import { IndexComponent } from './index.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RestaurantsCommunicationService } from 'src/app/index/restaurants.communication.service';

@NgModule({
  imports: [
    CommonModule,
    IndexRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    IndexComponent
  ],
  providers: [
    RestaurantsCommunicationService
  ]
})
export class IndexModule { }
