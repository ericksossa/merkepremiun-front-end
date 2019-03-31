import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CartService } from 'src/app/services/service.index';
import { URL_SERVICES } from 'src/app/config/config';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: []
})
export class CartComponent implements OnInit {
  path = URL_SERVICES + `api/v1/product/allimages/`;
  productsCart: any[] = [];
  cartTotal = 0;
  numProducts = 0;

  changeDetectorRef: ChangeDetectorRef;
  constructor(
    private cartService: CartService,
    changeDetectorRef: ChangeDetectorRef) {
    this.changeDetectorRef = changeDetectorRef;
  }

  ngOnInit() {
    this.getProductsToCart();
    this.loadCart();
  }


  getProductsToCart() {
    this.productsCart = [];
    this.cartService.productAdded$.subscribe(data => {
      this.productsCart = data.products;
      this.cartTotal = data.cartTotal;
      this.numProducts = data.products.reduce((acc, product) => {
        acc += product.quantity;
        return acc;
      }, 0);
      localStorage.setItem('cart', JSON.stringify(this.productsCart));
      // this.changeDetectorRef.detectChanges();
    });
  }

  loadCart(): void {
    this.cartTotal = 0;
    this.productsCart = [];
    let cart = JSON.parse(localStorage.getItem('cart'));
    for (let i = 0; i < cart.length; i++) {
      let item = JSON.parse(JSON.stringify(cart[i]));
      console.log(item);
      this.productsCart.push({
        product: item.product,
        quantity: item.quantity
      });
      this.cartTotal += item.product.price * item.quantity;
    }
  }

  deleteProduct(product) {
    console.log(product);
    this.cartService.deleteProductFromCart(product);
    console.log('eleiminado');
  }
}
