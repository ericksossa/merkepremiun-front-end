import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products: any[] = [];
  cartTotal = 0;

  private productAddedSource = new Subject<any>();


  productAdded$ = this.productAddedSource.asObservable();

  constructor() { }

  addProductToCart(product) {
    let exists = false;
    const parsedPrice = parseFloat(product.price.replace(/\./g, '').replace(',', '.'));
    this.cartTotal += parsedPrice;
    // Busca un producto en el carrito e incrementa la cantidad
    this.products = this.products.map(_product => {
      if (_product.product.id === product.id) {
        _product.quantity++;
        exists = true;
      }
      return _product;
    });
    // Agrega un nuevo producto al carrito si es un producto nuevo
    if (!exists) {
      product.parsedPrice = parsedPrice;
      this.products.push({
        product: product,
        quantity: 1
      });
    }

     this.productAddedSource.next({ products: this.products, cartTotal: this.cartTotal });
  }

  deleteProductFromCart(product) {
    this.products = this.products.filter(_product => {
      if (_product.product.id === product.id) {
        this.cartTotal -= _product.product.parsedPrice * _product.quantity;
        return false;
      }
      return true;
    });
    this.productAddedSource.next({ products: this.products, cartTotal: this.cartTotal });
  }


  flushCart() {
    this.products = [];
    this.cartTotal = 0;
    this.productAddedSource.next({ products: this.products, cartTotal: this.cartTotal });
  }
}
