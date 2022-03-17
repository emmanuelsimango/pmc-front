import { ComponentsModule } from './../../components/components.module';
import { HomeComponent } from './../../pages/landing/home/home.component';
import { ProductsComponent } from './../../pages/landing/products/products.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from "@angular/common/http";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ComponentsModule
  ],
  declarations: [
    ProductsComponent,
    HomeComponent,
  ]
})
export class AuthLayoutModule { }
