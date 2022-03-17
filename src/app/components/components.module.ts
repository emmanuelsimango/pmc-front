import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarAuthComponent } from './auth/navbar/navbar.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { AuthFooterComponent } from './auth/auth-footer/auth-footer.component';
import { CartIconComponent } from './cart-icon/cart-icon.component';

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule,ReactiveFormsModule,FormsModule],
  declarations: [FooterComponent, NavbarComponent, SidebarComponent,NavbarAuthComponent, AuthFooterComponent, CartIconComponent
  ],
  exports: [FooterComponent, NavbarComponent, SidebarComponent,NavbarAuthComponent,AuthFooterComponent]
})
export class ComponentsModule {}
