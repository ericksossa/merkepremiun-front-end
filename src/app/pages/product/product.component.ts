import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/service.index';
import { URL_SERVICES } from '../../config/config';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  pageActual: number = 1;
  path = URL_SERVICES + `api/v1/product/allimages/`;
  constructor(
    private productService: ProductService,
    protected homeComponent: HomeComponent) {}

  ngOnInit() {
    this.getProducts();
  }


  getProducts() {
    this.productService.allProduct()
      .subscribe(resp => this.products = resp.data);
  }



}
