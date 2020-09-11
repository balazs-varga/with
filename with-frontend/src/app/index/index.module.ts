import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRoutingModule } from './index.routing';
import { IndexComponent } from './index.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    IndexRoutingModule,
    NgbModule
  ],
  declarations: [
    IndexComponent
  ]
})
export class IndexModule { }
