import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered: boolean
}

@Injectable({
    providedIn:'root'
})
export class AuthService {
    AUTH_SIGNUP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
    AUTH_SIGNIN_URL='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
    AUTH_API_KEY='AIzaSyCHZLEmFGsPJ_ZcMOpxZW0k0mWJUUsjlXU';
    constructor(private http: HttpClient) {
    };

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            this.AUTH_SIGNUP_URL+this.AUTH_API_KEY,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError));
    }

    signin(email:string,password:string){
        return this.http.post<AuthResponseData>(
            this.AUTH_SIGNIN_URL+this.AUTH_API_KEY,
            {
                email:email,
                password:password,
                returnSecureToken:true
            }
        ).pipe(catchError(this.handleError));
    }

    handleError(errorResp:HttpErrorResponse){
        let errorMessage="Unknown error occured!";
                console.log(errorResp);
                console.log(errorResp.error.error.message);
                if(!errorResp.error || !errorResp.error.error){
                    return throwError(errorMessage);
                }
                console.log(errorResp);
                console.log(errorResp.error.error.message);
                switch (errorResp.error.error.message) {
                    case 'EMAIL_EXISTS':
                        errorMessage="Email already exist!";
                        break;
                    case 'EMAIL_NOT_FOUND':
                        errorMessage="Invalid email address!";
                        break;
                    case "INVALID_PASSWORD":
                        errorMessage="Invalid password!";
                        break;
                    default:
                        break;
                }
                return throwError(errorMessage);
    }
}