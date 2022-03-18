import { CartServiceService } from './../../services/cart-service.service';
import { CartEvent } from './../../models/cart-event';
import { PredefinedPackage } from "./../../models/predefined-package";
import { PackageCategory } from "./../../models/package-category";
import { AuthService } from "./../../services/auth/auth.service";
import { ProductDefinition } from "./../../models/product-definition";
import { Package } from "./../../models/package";
import { ToastrService } from "ngx-toastr";
import { PackageServiceService } from "./../../services/package-service.service";
import { Frequency } from "./../../models/frequency";
import { ServiceProviderService } from "./../../services/service-provider.service";
import { ServiceProvider } from "./../../models/service-provider";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User } from 'src/app/models/user';

@Component({
  selector: "app-packages",
  templateUrl: "./packages.component.html",
  styleUrls: ["./packages.component.scss"],
})
export class PackagesComponent implements OnInit {
  myPackages: PackageCategory[];

  serviceProviders: ServiceProvider[];
  frequencies: Frequency[];
  packageForm: FormGroup;
  packageFormSubmitted: boolean;
  packageFormErrors: string[];
  packageFormMessage: string;

  productDefinitions: ProductDefinition[];

  cart: { quantity: number; package: PredefinedPackage }[] = [];
  currentUser:User = null;
  submitted: boolean = false;

  handler: any = null;
  minutes = 25;
  amount = 0;
  stripe_key;

  constructor(
    private serviceProviderService: ServiceProviderService,
    private packageFormBuilder: FormBuilder,
    private packageService: PackageServiceService,
    private toastrService: ToastrService,
    private user: AuthService,
    private cartService:CartServiceService
  ) {
    this.serviceProviderService.getAll().subscribe((providers) => {
      console.log(providers);

      this.serviceProviders = providers.filter(
        (prov) => prov.service_type_id == 1
      );
      this.stripe_key = localStorage.getItem("stripe-key");
    });
    this.packageService.getAllFrequencies().subscribe((frequences) => {
      this.frequencies = frequences;
    });

    this.currentUser = this.user.getUser();
    console.log(this.currentUser);

    this.packageService.getAllProductDefinitions().subscribe((prod) => {
      this.productDefinitions = prod;
    });

    setInterval(() =>{

      this.packageService.getMyPackages(this.currentUser).subscribe((packages) => {
        this.myPackages = packages;
      });
    }, 10000);
  }

  onAddProduct(event:CartEvent) {
    console.log(event);

      this.cartService.addCartItem(event);
  }

  getMyPackages() {

    this.packageService.getMyPackages(this.currentUser).subscribe((packages) => {
      this.myPackages = packages;
    });
  }

  ngOnInit(): void {
    this.packageForm = this.packageFormBuilder.group({
      data: [0, Validators.required],
      minutes: [10, Validators.required],
      provider: [1, [Validators.required, Validators.email]],
      mobile: ["", Validators.required],
      package_name: ["", Validators.required],
      package_frequency_id: [1, Validators.required],
    });
  }

  get f() {
    return this.packageForm.controls;
  }

  onPackageSubmit() {
    this.submitted = false;

    console.log(this.packageForm);
    if (this.packageForm.errors) {
      this.toastrService.warning("Please fill all the required fields");
      return;
    }
    const provider: number = this.packageForm.get("provider").value;

    const etym: ProductDefinition = this.productDefinitions.find(
      (def) => def.provider_id == provider && def.product_id == 1
    );
    const data: ProductDefinition = this.productDefinitions.find(
      (def) => def.provider_id == provider && def.product_id == 2
    );

    // console.log(this.packageForm.get("minutes").value);

    const pack: Package = {
      package_name: this.packageForm.get("package_name").value,
      package_frequency_id: this.packageForm.get("package_frequency_id").value,
      user_id: this.user.getUser().user_id,
      recipient: this.packageForm.get("mobile").value,
      token: "",
      items_list: [
        {
          quantity: this.packageForm.get("minutes").value,
          product_definition_id: etym.product_definition_id,
        },
        {
          quantity: this.packageForm.get("data").value,
          product_definition_id: data.product_definition_id,
        },
      ],
    };

    console.log(JSON.stringify(pack.items_list));

    // this.packageService.getCostPackage(pack.items_list).subscribe((cost) => {
    //   if (cost.usd_cost) {
    //     this.amount = cost.usd_cost;
    //     this.pay(pack, this.packageService, this.toastrService);
    //   }
    // });

    this.cartService.checkout(pack);
  }


}

