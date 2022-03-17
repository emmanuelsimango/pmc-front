import { ToastrService } from 'ngx-toastr';
import { PackageServiceService } from 'src/app/services/package-service.service';
import { CartEvent } from './../models/cart-event';
import { CartItem } from './../models/cart-item';
import { PredefinedPackage } from './../models/predefined-package';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ServerDetails } from '../models/server-details';
import { AuthService } from './auth/auth.service';
import { Package } from '../models/package';


@Injectable({
  providedIn: 'root'
})
export class CartServiceService {


  cart:BehaviorSubject<CartItem[]>  = new BehaviorSubject<CartItem[]>(null);
  amount:number = 0;
  serverDetails: ServerDetails = new ServerDetails();
  constructor(private _http: HttpClient,private auth:AuthService,private packageService:PackageServiceService,private toastrService:ToastrService) {
    this.getCart();
  }


  public getCart():CartItem[]{
    // console.log("called");
    if (this.cart.value) {

      return this.cart.getValue()
    }

    const cart = JSON.parse(localStorage.getItem('cart'))
    if (cart) {

      localStorage.setItem('cart',JSON.stringify(cart))
      return cart;
    }else{
      return [];
    }

  }



  public addCartItem(event:CartEvent){
    const prod_id = event.product.product_definition_id;
    let cart:CartItem[] = this.getCart();
    if (event.action) {
      console.log(cart,'asdasd');
      if (
        cart.some((cart) => cart.package.product_definition_id == prod_id)
      ) {
        // const item = cart.find(
        //   (cart) => cart.package.product_definition_id == prod_id
        // );
        // item.quantity =   item.quantity+ item.package.quantity
      } else {
        cart.push({ package: event.product, quantity: event.product.quantity });
      }

    } else {
      if (
        cart.some((cart) => cart.package.product_definition_id == prod_id)
      ) {
        // const item = cart.find(
        //   (cart) => cart.package.product_definition_id == prod_id
        // );
        // if (item.quantity > 0) {
        //   item.quantity = item.quantity+ item.package.quantity ;
        // } else {
          cart = cart.filter(cart=>{
          return  cart.package.product_definition_id !=prod_id
          })
        // }
      }
    }

    console.log(cart);
    this.cart.next(cart);
    localStorage.setItem('cart',JSON.stringify(cart))
  }


  public checkout(pack: Package){

    this.packageService.getCostPackage(pack.items_list).subscribe((cost) => {
      // console.log(cost);
      if (cost.usd_cost) {
        this.amount = cost.usd_cost;
        // console.log(this.amount);
        // return;
        this.packageService.pay(pack,this.packageService,this.toastrService);
      }
    });
  }


}
