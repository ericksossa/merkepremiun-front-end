import { Component, OnInit } from '@angular/core';
import { ProductService, CategoriesService } from 'src/app/services/service.index';
import { URL_SERVICES } from '../../config/config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  recommendProducts: any[] = [];
  categories: any[] = [];
  path = URL_SERVICES + `api/v1/product/allimages/`;

  constructor(private productService: ProductService,
    private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.getRecommendProducts();
    this.getFeatureProducts();
    this.getCategories();
  }
  // productos recomendados
  getRecommendProducts() {
    this.productService.allRecommendedProducts()
      .subscribe(resp => {
        console.log(resp.data);
        this.recommendProducts = resp.data;
      });
  }
  // productos destacados
  getFeatureProducts() {
    this.productService.allProduct()
      .subscribe(resp => {
        console.log(resp.data);
        this.products = resp.data;
      });
  }

  getCategories() {
    this.categoriesService.allCategories()
      .subscribe(resp => this.categories = resp.data);
  }

}
