import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthLogin, AuthLoginFail, AuthLoginStart, AUTH_LOGIN, AUTH_LOGIN_START } from "./auth.action";

export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered: boolean
}

@Injectable()
export class AuthEffects{
    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AUTH_LOGIN_START),
        switchMap((authData:AuthLoginStart)=>{
            return this.http.post<AuthResponseData>(
                environment.AUTH_SIGNIN_URL+environment.AUTH_API_KEY,
                {
                    email:authData.payload.email,
                    password:authData.payload.password,
                    returnSecureToken:true
                }
            ).pipe(
                map(respData=>{
                    const expirationData = new Date(new Date().getTime()+respData.expiresIn+1000);
                    
                    return new AuthLogin({
                        email:respData.email,
                        id:respData.localId,
                        token:respData.idToken,
                        tokenExpirationDate:expirationData
                    });
                }),

                catchError(errorResp=>{
                    let errorMessage="Unknown error occured!";
                    console.log(errorResp);
                    console.log(errorResp.error.error.message);
                    if(!errorResp.error || !errorResp.error.error){
                        return of(new AuthLoginFail(errorMessage));
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
                    return of(new AuthLoginFail(errorMessage));
                }),
                
            )
        }),

    );

    @Effect({
        dispatch:false
    })
    authSuccess = this.actions$.pipe(
        ofType(AUTH_LOGIN),
        tap(()=>{
            this.router.navigate(['/'])
        })
    );

    constructor(private actions$:Actions, private http:HttpClient, private router:Router){}
}