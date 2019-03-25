import { Component, OnInit } from "@angular/core";
import { CartService } from "src/app/services/service.index";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styles: []
})
export class CartComponent implements OnInit {
  productsCart: any[] = [];
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.productsCart = this.cartService.productsArray;
  }
}
