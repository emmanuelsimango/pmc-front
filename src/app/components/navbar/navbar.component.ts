import { FormBuilder, Validators } from "@angular/forms";
import { CartItem } from "./../../models/cart-item";
import { CartServiceService } from "./../../services/cart-service.service";
import { AuthService } from "./../../services/auth/auth.service";
import { Component, OnInit, ElementRef, OnDestroy } from "@angular/core";
import { ROUTES } from "../sidebar/sidebar.component";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup } from "@angular/forms";
import { Package } from "src/app/models/package";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private listTitles: any[];
  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;

  public isCollapsed = true;
  cart: CartItem[];
  closeResult: string;

  packageForm: FormGroup;
  packageFormSubmitted: boolean;

  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private modalService: NgbModal,
    private auth: AuthService,
    private cartService: CartServiceService,
    private packageFormBuilder: FormBuilder
  ) {
    this.location = location;
    this.sidebarVisible = false;

    this.cartService.cart.subscribe((cart) => (this.cart = cart));
  }
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    var navbar = document.getElementsByClassName("navbar")[0];
    if (window.innerWidth < 993 && !this.isCollapsed) {
      navbar.classList.add("bg-white");
      navbar.classList.remove("navbar-transparent");
    } else {
      navbar.classList.remove("bg-white");
      navbar.classList.add("navbar-transparent");
    }
  };
  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.packageForm = this.packageFormBuilder.group({
      mobile: ["", Validators.required],
      package_name: ["", Validators.required],
    });
    window.addEventListener("resize", this.updateColor);
    this.listTitles = ROUTES.filter((listTitle) => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggler")[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
      var $layer: any = document.getElementsByClassName("close-layer")[0];
      if ($layer) {
        $layer.remove();
        this.mobile_menu_visible = 0;
      }
    });


  }

  onPackageSubmit() {
    this.packageFormSubmitted = true;
    // alert("asdas");
    console.log(this.packageForm);


    if (this.packageForm.invalid) {
      console.log(this.packageForm);

      return
    }


    const pack: Package = {
      package_name: this.packageForm.get('package_name').value,
      package_frequency_id: 1,
      user_id: this.auth.getUser().user_id,
      recipient: this.packageForm.get("mobile").value,
      token: "",
      items_list: [
      ],
    };

    console.log(JSON.stringify(pack.items_list));

    this.cart.forEach(item=>{
      pack.items_list.push({
        product_definition_id:item.package.product_definition_id,
        quantity: item.quantity
      })
    })

    // this.packageService.getCostPackage(pack.items_list).subscribe((cost) => {
    //   if (cost.usd_cost) {
    //     this.amount = cost.usd_cost;
    //     this.pay(pack, this.packageService, this.toastrService);
    //   }
    // });

    this.cartService.checkout(pack);
    this.packageForm.reset();
    this.cart = [];
    localStorage.setItem('cart',JSON.stringify([]));
    this.modalService.dismissAll();

  }

  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName("nav")[0];
    if (!this.isCollapsed) {
      navbar.classList.remove("navbar-transparent");
      navbar.classList.add("bg-white");
    } else {
      navbar.classList.add("navbar-transparent");
      navbar.classList.remove("bg-white");
    }
  }

  logout() {
    this.auth.logout();
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName("main-panel")[0]
    );
    const html = document.getElementsByTagName("html")[0];
    if (window.innerWidth < 991) {
      mainPanel.style.position = "fixed";
    }

    setTimeout(function () {
      toggleButton.classList.add("toggled");
    }, 500);

    html.classList.add("nav-open");

    this.sidebarVisible = true;
  }
  sidebarClose() {
    const html = document.getElementsByTagName("html")[0];
    this.toggleButton.classList.remove("toggled");
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName("main-panel")[0]
    );

    if (window.innerWidth < 991) {
      setTimeout(function () {
        mainPanel.style.position = "";
      }, 500);
    }
    this.sidebarVisible = false;
    html.classList.remove("nav-open");
  }
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const html = document.getElementsByTagName('html')[0];
    var $toggle = document.getElementsByClassName("navbar-toggler")[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const html = document.getElementsByTagName("html")[0];

    if (this.mobile_menu_visible == 1) {
      // $('html').removeClass('nav-open');
      html.classList.remove("nav-open");
      if ($layer) {
        $layer.remove();
      }
      setTimeout(function () {
        $toggle.classList.remove("toggled");
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(function () {
        $toggle.classList.add("toggled");
      }, 430);

      var $layer = document.createElement("div");
      $layer.setAttribute("class", "close-layer");

      if (html.querySelectorAll(".main-panel")) {
        document.getElementsByClassName("main-panel")[0].appendChild($layer);
      } else if (html.classList.contains("off-canvas-sidebar")) {
        document
          .getElementsByClassName("wrapper-full-page")[0]
          .appendChild($layer);
      }

      setTimeout(function () {
        $layer.classList.add("visible");
      }, 100);

      $layer.onclick = function () {
        //asign a function
        html.classList.remove("nav-open");
        this.mobile_menu_visible = 0;
        $layer.classList.remove("visible");
        setTimeout(function () {
          $layer.remove();
          $toggle.classList.remove("toggled");
        }, 400);
      }.bind(this);

      html.classList.add("nav-open");
      this.mobile_menu_visible = 1;
    }
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return "Dashboard";
  }

  open(content) {
    this.modalService
      .open(content, { windowClass: "modal-search" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  ngOnDestroy() {
    window.removeEventListener("resize", this.updateColor);
  }

  get f() {
    return this.packageForm.controls;
  }
}
