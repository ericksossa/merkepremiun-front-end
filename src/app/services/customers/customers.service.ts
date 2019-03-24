import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient) { }


  allCustomers() {
    let url = URL_SERVICES + `api/v1/users/all`;
    return this.http.get(url)
      .pipe(map((resp: any) => resp));
  }

  updateDiscount(userId: number, client: any) {
    let url = URL_SERVICES + `api/v1/users/updatediscount/${userId}`;
    return this.http.put(url, client)
      .pipe(map((resp: any) => resp));
  }
}
