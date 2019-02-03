import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../../config/config';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignUpInfo } from './signup-info';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = URL_SERVICES + 'api/v1/auth/signin';
  private signupUrl = URL_SERVICES + 'api/v1/auth/signup';
  private resfreshTokenUrl = URL_SERVICES + 'api/v1/auth/refreshtoken';

  constructor(private http: HttpClient) { }

  // attemptAuth(credentials: AuthLoginInfo, remember: boolean): Observable<APIResponse> {
  //   if (remember) {
  //     localStorage.setItem('username', credentials.username);

  //   } else {
  //     localStorage.removeItem('username');
  //   }
  //   return this.http.post<APIResponse>(this.loginUrl, credentials, httpOptions);
  // }

  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }

  // refresh(): Observable<APIResponse> {
  //   const headers = new HttpHeaders().set('authorization', this.token.getRefreshToken());

  //   const refreshObservable = this.http.get<APIResponse>(this.resfreshTokenUrl, { headers });

  //   console.log(headers);

  //   const refreshSubject = new ReplaySubject<APIResponse>(1);
  //   refreshSubject.subscribe((r: APIResponse) => {
  //     this.token.saveToken(r.data.accessToken);
  //     this.token.saveRefreshToken(r.data.refreshToken);
  //   }, (err) => {
  //     this.token.handleAuthenticationError(err);
  //   });

  //   refreshObservable.subscribe(refreshSubject);
  //   return refreshSubject;
  // }
}
