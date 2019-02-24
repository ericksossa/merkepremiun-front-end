import { Component, OnInit } from '@angular/core';
import { ProductService, CategoriesService } from 'src/app/services/service.index';
import { URL_SERVICES } from '../../config/config';
import { ReferenceService } from '../../services/references/reference.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  productsReference: any[] = [];
  recommendProducts: any[] = [];
  references: any[] = [];
  referenceId: any;
  path = URL_SERVICES + `api/v1/product/allimages/`;

  constructor(private productService: ProductService,
    private refenceService: ReferenceService) { }

  ngOnInit() {
    this.getRefences();
    this.getRecommendProducts();
    this.getFeatureProducts();
    this.getProductsByReferences();
  }

  // productos recomendados
  getRecommendProducts() {
    this.productService.allRecommendedProducts()
      .subscribe(resp => {
        this.recommendProducts = resp.data;
      });
  }
  // productos destacados
  getFeatureProducts() {
    this.productService.allProduct()
      .subscribe(resp => {
        this.products = resp.data;
      });
  }
  // reference
  getRefences() {
    this.refenceService.allReferences()
      .subscribe(resp => {
        this.references = resp.data;
        this.referenceId = resp.data.id;
        console.log(resp.data);
        
      });
  }
  // productos x referencias
  getProductsByReferences() {
    this.productService.allProductReference(this.referenceId)
      .subscribe(resp => {
        console.log(resp.data);
        this.productsReference = resp.data;
      });

  }

}
