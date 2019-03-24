import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URL_SERVICES } from '../../config/config';
import { ReferenceService, ProductService } from 'src/app/services/service.index';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styles: []
})
export class DetailsProductComponent implements OnInit {
  productId: number;
  referenceId: any[] = [];
  product: any[] = [];
  path = URL_SERVICES + `api/v1/product/allimages/`;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productoService: ProductService,
    private referenceService: ReferenceService) {
    this.activatedRoute.params.subscribe(params => {
      this.productId = params['id'];
    });
  }

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {

    this.productoService.productById(this.productId)
      .subscribe((resp: any) => {
        this.product.push(resp.data);
        this.referenceId.push(resp.data.referenceId);
      });
    this.getReference(this.referenceId);
  }

  getReference(id: any[]) {
    this.referenceService.referenceById(id)
      .subscribe(resp => {
        console.log(resp);
      });
  }

}
