import { ToastrService } from 'ngx-toastr';
import { PredefinedPackage } from './../models/predefined-package';
import { AuthService } from './auth/auth.service';
import { PackageCategory } from './../models/package-category';
import { ProductDefinition } from './../models/product-definition';
import { Item } from "./../models/item";
import { Package } from "./../models/package";
import { Frequency } from "./../models/frequency";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ServerDetails } from "../models/server-details";
import { GeneralResponse } from "../models/general-response";
import { User } from '../models/user';

@Injectable({
  providedIn: "root",
})
export class PackageServiceService {
  serverDetails: ServerDetails = new ServerDetails();
  stripe_key:string;
  handler: any = null;
  amount:number = 0;
  constructor(private _http: HttpClient,private auth:AuthService, private toastr: ToastrService) {
    this.getStripeKey().subscribe((key) => {
      localStorage.setItem("stripe-key", key.success);
      this.stripe_key = key.success;
    });
    this.loadStripe();
  }



  public getMyPackages(user:User){

    const data = {
      user_id: user.user_id
    }
    console.log(data);

    return this._http.post<PackageCategory[]>(
      `${this.serverDetails.api}/package-categories/get-all-by-user-id`,data
    );
  }

  public getAllProductDefinitions(): Observable<ProductDefinition[]> {
    return this._http.get<ProductDefinition[]>(
      `${this.serverDetails.api}/product-definitions/get-all`
    );
  }
  public getAllFrequencies(): Observable<Frequency[]> {
    return this._http.get<Frequency[]>(
      `${this.serverDetails.api}/package-frequencies/get-all`
    );
  }

  savePackage(info: Package) {
    const data = info;

    return this._http.post<GeneralResponse>(
      `${this.serverDetails.api}/sales/save-one`,
      info
    );
  }

  getCostPackage(info: Item[]) {
    const data = {
      items_list: info,
    };

    return this._http.post<any>(
      `${this.serverDetails.api}/sales/get-cost`,
      data
    );
  }
  getPredefinedDataPackages() {

    return this._http.get<PredefinedPackage[]>(
      `${this.serverDetails.api}/package-categories/predefined-list`
    );
  }
  getPredefinedTelOneDataPackages() {

    return this._http.get<PredefinedPackage[]>(
      `${this.serverDetails.api}/package-categories/predefined-list`
    );
  }

  getStripeKey() {
    return this._http.get<GeneralResponse>(
      `${this.serverDetails.api}/auth/get-stripe-key`
    );
  }


  pay(pack: Package,service: PackageServiceService, toastr: ToastrService) {
    var handler = (<any>window).StripeCheckout.configure({
      key: this.stripe_key,
      locale: "auto",
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log("Token Racho After-Pay : ", token.id);
        pack.token = token.id;
        console.log(pack);

        service.savePackage(pack).subscribe(
          (response) => {
            console.log(response);

            toastr.success("Package Created Successfully", "Package created");

            if (response.success) {
            }
          },
          (error) => {
            console.log(error);

            toastr.error(
              "Package Failed creating: " + error.error,
              "Package created"
            );
          }
        );
      },
    });

    handler.open({
      name: pack.package_name,
      description: `Package payment for ${pack.package_name}`,
      amount: this.amount,
    });
  }

  loadStripe() {
    if (!window.document.getElementById("stripe-script")) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: this.getStripeKey(),
          locale: "auto",
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log("Token Racho During Load: ", token.id);
            alert("Payment Success!!");
          },
        });
      };

      window.document.body.appendChild(s);
    }
  }


}
