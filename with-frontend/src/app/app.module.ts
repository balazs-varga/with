import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from './layouts/layouts.module';
import { AuthModule } from './auth/auth.module';
import { IndexModule } from './index/index.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RestaurantModule } from './restaurants/restaurant.module';
import { INTERCEPTORS } from './auth/interceptors.provider';
import { SharedModule } from './shared/shared.module';

const routes: Routes = [
  { path: '**', redirectTo: '404' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'with-frontend' }),
    RouterModule.forRoot(routes),
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    IndexModule,
    ReactiveFormsModule,
    LayoutsModule,
    AuthModule,
    RestaurantModule,
    SharedModule
  ],
  providers: [
    INTERCEPTORS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
