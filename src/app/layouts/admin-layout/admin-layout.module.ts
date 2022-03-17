import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HomeComponent } from "src/app/pages/landing/home/home.component";
import { PackagesComponent } from "src/app/pages/packages/packages.component";
import { NgBytesPipeModule } from 'angular-pipes';
import { ElectricityComponent } from "src/app/pages/electricity/electricity.component";
import { ProductsComponent } from "src/app/pages/landing/products/products.component";
import { PreProductsComponent } from "src/app/pages/pre-products/pre-products.component";
import { PreProductsTeloneComponent } from 'src/app/pages/pre-products-telone/pre-products-telone.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,

  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TablesComponent,
    IconsComponent,
    TypographyComponent,
    NotificationsComponent,
    MapComponent,
    PackagesComponent,
    ElectricityComponent,
    PreProductsComponent,
     PreProductsTeloneComponent ,
    // RtlComponent
  ]
})
export class AdminLayoutModule {}
