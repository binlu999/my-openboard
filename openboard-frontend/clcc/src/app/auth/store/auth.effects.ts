import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthLogin, AuthLoginStart, AUTH_LOGIN_START } from "./auth.action";

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
                    of(new AuthLogin({
                        email:respData.email,
                        id:respData.localId,
                        token:respData.idToken,
                        tokenExpirationDate:expirationData
                    }));
                }),

                catchError(error=>{
                    //...
                    return of();
                }),
                
            )
        }),

    )
    constructor(private actions$:Actions, private http:HttpClient){}
}