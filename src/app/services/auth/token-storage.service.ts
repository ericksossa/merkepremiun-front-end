import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const REFRESH_TOKEN_KEY = 'RefreshToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {
    private roles: Array<string> = [];
    constructor() { }


    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    handleAuthenticationError(err: any) {
        // TODO: Only for authentication error codes
        console.log(err);
        this.signOut();
    }

    signOut() {
        // TODO
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USERNAME_KEY);
        localStorage.removeItem(AUTHORITIES_KEY);
        // localStoraged();
    }

    public saveToken(token: string) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.setItem(TOKEN_KEY, token);
    }

    public getToken(): string {
        return localStorage.getItem(TOKEN_KEY);
    }

    public saveRefreshToken(refreshToken: string) {
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }

    public getRefreshToken(): string {
        return localStorage.getItem(REFRESH_TOKEN_KEY);
    }

    public saveUsername(username: string) {
        localStorage.removeItem(USERNAME_KEY);
        localStorage.setItem(USERNAME_KEY, username);
    }

    public getUsername(): string {
        return localStorage.getItem(USERNAME_KEY);
    }

    public saveAuthorities(authorities: string[]) {
        localStorage.removeItem(AUTHORITIES_KEY);
        localStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
    }

    public getAuthorities(): string[] {
        this.roles = [];

        if (localStorage.getItem(TOKEN_KEY)) {
            this.roles.push(localStorage.getItem(AUTHORITIES_KEY));
        }

        return this.roles;
    }
}
