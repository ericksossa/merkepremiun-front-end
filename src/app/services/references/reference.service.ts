import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReferenceService {

  constructor(private http: HttpClient) { }

  allReferences() {
    let url = URL_SERVICES + `api/v1/references/all`;
    return this.http.get(url).pipe(
      map((resp: any) => resp));
  }
}
