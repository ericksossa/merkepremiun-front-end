import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { URL_SERVICES } from '../../config/config';
import { ProductsModel } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  allProduct() {
    let url = URL_SERVICES + `api/v1/product/all`;
    return this.http.get(url).pipe(
      map((resp: any) => resp));
  }

  productById(productId: number) {
    let url = URL_SERVICES + `api/v1/product/findbyid/${productId}`;
    return this.http.get(url).pipe(
      map((resp) => resp));
  }

  allProductReference(id: number) {
    let url = URL_SERVICES + `api/v1/product/allbyreference/${id}`;
    return this.http.get(url).pipe(
      map((resp: any) => resp));
  }

  allRecommendedProducts() {
    let url = URL_SERVICES + `api/v1/product/allrecommended`;
    return this.http.get(url).pipe(
      map((resp: any) => resp));
  }

  createProduct(product: any, img: File) {
    console.log(img);

    let url = URL_SERVICES + `api/v1/product/create`;
    const formData = new FormData();
    formData.append('imageURL', img);
    formData.append('name', product.name);
    formData.append('weight', product.weight);
    formData.append('price', product.price);
    formData.append('unitprice', product.unitprice);
    formData.append('stock', product.stock);
    formData.append('recommended', product.recommended);
    formData.append('referenceId', product.referenceId);
    return this.http.post(url, formData)
      .pipe(map((resp: any) => resp));
  }

  updateProducts(id: any, product: any) {
    let url = URL_SERVICES + `api/v1/product/update/${id}`;
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('weight', product.weight);
    formData.append('price', product.price);
    formData.append('unitprice', product.unitprice);
    formData.append('stock', product.stock);
    formData.append('recommended', product.recommended);
    formData.append('referenceId', product.referenceId);
    return this.http.put(url, formData)
      .pipe(map((resp: any) => resp));
  }

  deleteProduct(id: string) {
    let url = URL_SERVICES + `api/v1/product/delete/${id}`;
    return this.http.delete(url)
      .pipe(map((resp: any) => resp));

  }
}