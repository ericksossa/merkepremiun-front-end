import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_SERVICES } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  allCategories() {
    let url = URL_SERVICES + `api/v1/category/all`;
    return this.http.get(url)
      .pipe(map((resp: any) => resp));
  }


}
