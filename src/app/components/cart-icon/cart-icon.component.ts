import { CartItem } from "./../../models/cart-item";
import { CartServiceService } from "./../../services/cart-service.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-cart-icon",
  templateUrl: "./cart-icon.component.html",
  styleUrls: ["./cart-icon.component.scss"],
})
export class CartIconComponent implements OnInit {
  cart: CartItem[];

  constructor(private cartService: CartServiceService) {
    this.cartService.cart.subscribe((cart) => {
      this.cart = cart;
      console.log("afteer", cart);
    });
  }
  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    console.log("dhudhudhu", this.cart);
  }
}
