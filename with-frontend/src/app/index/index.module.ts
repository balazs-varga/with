import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRoutingModule } from './index.routing';
import { IndexComponent } from './index.component';

@NgModule({
  imports: [
    CommonModule,
    IndexRoutingModule
  ],
  declarations: [
    IndexComponent
  ]
})
export class IndexModule { }
