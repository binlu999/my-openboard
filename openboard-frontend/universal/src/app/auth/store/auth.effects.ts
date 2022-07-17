import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth.service";
import { User } from "../user.model";
import { AuthAuthencated, AuthAuthencateFail, AuthLoginStart, AuthSignupStart, AUTH_AUTHENCATED, AUTH_AUTO_LOGIN, AUTH_LOGIN_START, AUTH_LOGOUT, AUTH_SIGNUP_START } from "./auth.action";

export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered: boolean
}

const handleAuthencation = (email: string, id: string, token: string, expiredIn: string) => {
    const expirationData = new Date(new Date().getTime() + +expiredIn * 1000);
    const user = new User(email, id, token, expirationData);
    localStorage.setItem(environment.AUTH_SEC_TOKEN_NAME, JSON.stringify(user));
    return new AuthAuthencated({
        email: email,
        id: id,
        token: token,
        tokenExpirationDate: expirationData,
        redirect: true
    });
}

const handleError = (errorResp: any) => {
    let errorMessage = "Unknown error occured!";
    if (!errorResp.error || !errorResp.error.error) {
        return of(new AuthAuthencateFail(errorMessage));
    }
    switch (errorResp.error.error.message) {
        case 'EMAIL_EXISTS':
            errorMessage = "Email already exist!";
            break;
        case 'EMAIL_NOT_FOUND':
            errorMessage = "Invalid email address!";
            break;
        case "INVALID_PASSWORD":
            errorMessage = "Invalid password!";
            break;
        default:
            break;
    }
    return of(new AuthAuthencateFail(errorMessage));
}

@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AUTH_SIGNUP_START),
        switchMap((signupData: AuthSignupStart) => {
            return this.http.post<AuthResponseData>(
                environment.AUTH_SIGNUP_URL + environment.AUTH_API_KEY,
                {
                    email: signupData.payload.email,
                    password: signupData.payload.password,
                    returnSecureToken: true
                }
            ).pipe(
                tap((respData => {
                    this.authService.setLogoutTimer(+respData.expiresIn * 1000);
                })),
                map(
                    respData => {
                        return handleAuthencation(
                            respData.email,
                            respData.localId,
                            respData.idToken,
                            respData.expiresIn
                        );
                    }
                ),
                catchError(errorResp => {
                    return handleError(errorResp);
                })
            )
        })
    );

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AUTH_LOGIN_START),
        switchMap((authData: AuthLoginStart) => {
            return this.http.post<AuthResponseData>(
                environment.AUTH_SIGNIN_URL + environment.AUTH_API_KEY,
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }
            ).pipe(
                tap(
                    (respData) => {
                        this.authService.setLogoutTimer(+respData.expiresIn * 1000)
                    }
                ),
                map(respData => {
                    return handleAuthencation(
                        respData.email,
                        respData.localId,
                        respData.idToken,
                        respData.expiresIn
                    );
                }),

                catchError(errorResp => {
                    return handleError(errorResp);
                }),

            )
        }),

    );

    @Effect()
    authAutoLogin = this.actions$.pipe(
        ofType(AUTH_AUTO_LOGIN),
        map(() => {
            const user: {
                email: string,
                Id: string,
                _token: string,
                _tokenExpirationDate: string
            } = JSON.parse(localStorage.getItem(environment.AUTH_SEC_TOKEN_NAME));

            if (!user) {
                return { type: 'DUMMY' };
            }

            const loggedInUser = new User(user.email, user.Id, user._token, new Date(user._tokenExpirationDate));
            if (loggedInUser.token) {
                console.log('Auto');
                const expiredIn = (new Date(user._tokenExpirationDate)).getTime() - (new Date()).getTime();
                this.authService.setLogoutTimer(expiredIn);
                return new AuthAuthencated({
                    email: loggedInUser.email,
                    id: loggedInUser.Id,
                    token: loggedInUser.token,
                    tokenExpirationDate: new Date(user._tokenExpirationDate),
                    redirect: false
                }
                );
            } else {
                return { type: 'DUMMY' };
            }

        })
    );
    @Effect({
        dispatch: false
    })
    authencatedRedirect = this.actions$.pipe(
        ofType(AUTH_AUTHENCATED),
        tap((authAuthencated: AuthAuthencated) => {
            if (authAuthencated.payload.redirect)
                this.router.navigate(['/']);
        })
    );

    @Effect({
        dispatch: false
    })
    logoutRedirect = this.actions$.pipe(
        ofType(AUTH_LOGOUT),
        tap(() => {
            this.authService.clearLogoutTimer();
            localStorage.removeItem(environment.AUTH_SEC_TOKEN_NAME);
            this.router.navigate(['/auth']);
        })
    );

    constructor(private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private authService: AuthService) { }
}