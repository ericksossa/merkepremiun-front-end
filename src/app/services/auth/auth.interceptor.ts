import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { catchError, mergeMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';

const TOKEN_HEADER_KEY = 'authorization';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public auth: AuthService, public token: TokenStorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        let authReq = req;

        if (req.url.includes('refreshtoken')) {

            const token = this.token.getRefreshToken();
            if (token != null) {
                console.log('RefreshToken');
                authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
            }

        } else {
            const token = this.token.getToken();
            if (token != null) {
                console.log('AuthInterceptor');
                authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
            }
        }


        return next.handle(authReq).pipe(
            catchError((err) => {
                const errorResponse = err as HttpErrorResponse;
                console.log(errorResponse);
                if (errorResponse.status === 401 && errorResponse.error.errors.hasOwnProperty('refreshToken')) {
                    return this.auth.refresh().pipe(mergeMap(() => {
                        console.log('RefreshTokenInterceptor');
                        return next.handle(this.addAuthenticationToken(authReq));
                    }));
                }
                return throwError(err);
            }));
    }

    addAuthenticationToken(req) {
        let authReq = req;
        const token = this.token.getToken();
        if (token != null) {
            authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
        }
        return authReq;
    }
}

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
