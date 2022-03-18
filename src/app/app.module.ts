import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { HomeComponent } from './pages/landing/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PackagesComponent } from './pages/packages/packages.component';
import { NgBytesPipeModule } from 'angular-pipes';
import { ProductsComponent } from './pages/landing/products/products.component';
import { ElectricityComponent } from './pages/electricity/electricity.component';
import { PreProductsComponent } from './pages/pre-products/pre-products.component';
import { PreProductsTeloneComponent } from './pages/pre-products-telone/pre-products-telone.component';
import { CurrencyListComponent } from './pages/trading-currencies/currency-list/currency-list.component';
import { AddCurrencyComponent } from './pages/trading-currencies/add-currency/add-currency.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    NgBytesPipeModule
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent, LoginComponent, CurrencyListComponent, AddCurrencyComponent,
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
