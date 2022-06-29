import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string
    localId: string
}

@Injectable({
    providedIn:'root'
})
export class AuthService {
    AUTH_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCHZLEmFGsPJ_ZcMOpxZW0k0mWJUUsjlXU';

    constructor(private http: HttpClient) {

    };

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            this.AUTH_URL,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
    }
}