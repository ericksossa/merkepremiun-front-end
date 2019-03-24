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

  createCategory(category: any) {
    let url = URL_SERVICES + `api/v1/category/create`;
    return this.http.post(url, category)
      .pipe(map((resp: any) => resp));
  }

  deleteCategory(id: number, category: any) {
    let url = URL_SERVICES + `api/v1/category/delete/${id}`;
    return this.http.delete(url, category)
      .pipe(map((resp: any) => resp));
  }

  updateCategory(id: number, category: any) {
    let url = URL_SERVICES + `api/v1/category/update/${id}`;
    return this.http.put(url, category)
      .pipe(map((resp: any) => resp));
  }


}
