import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/service.index';
import { URL_SERVICES } from '../../config/config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recommendProducts: any[] = [];
  path = URL_SERVICES + `api/v1/product/allimages/`;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.allRecommendProducts();
  }

  allRecommendProducts() {
    this.productService.allRecommendedProducts()
      .subscribe(resp => {
        console.log(resp.data);
        this.recommendProducts = resp.data;

      });
  }

}
