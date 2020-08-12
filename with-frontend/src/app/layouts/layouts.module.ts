import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { BasicLayoutComponent } from './basic-layout/basic-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
    AuthLayoutComponent,
    BasicLayoutComponent,
    HeaderComponent,
    FooterComponent
  ],
})
export class LayoutsModule { }
