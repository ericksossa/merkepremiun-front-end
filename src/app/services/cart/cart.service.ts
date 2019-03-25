import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICES } from "src/app/config/config";

@Injectable({
  providedIn: "root"
})
export class CartService {
  productsArray: ProductoCart[] = [];

  constructor(private http: HttpClient) {}

  /*  addedCarta(products: Array<ProductoCart>) {
    products =JSON.parse(products)
    let url = URL_SERVICES + `api/v1/product/.....`;
    return this.http.post(url, )
      .pipe(map((resp: any) => resp));
  } */
}
