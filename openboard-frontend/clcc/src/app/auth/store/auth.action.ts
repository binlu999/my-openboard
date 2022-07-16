import { Actions } from '@ngrx/effects';
import { Action } from "@ngrx/store";

export const AUTH_LOGIN_START='AUTH_LOGIN_START';
export const AUTH_SIGNUP_START='AUTH_SIGNUP_START';
export const AUTH_AUTHENCATED='AUTH_AUTHENCATED';
export const AUTH_AUTHENCATE_FAIL='AUTH_AUTHENCATE_FAIL';
export const AUTH_LOGOUT='AUTH_LOGOUT';
export const AUTH_CLEAR_ERROR='AUTH_CLEAR_ERROR';
export const AUTH_AUTO_LOGIN='AUTH_AUTO_LOGOUT';

export class AuthAuthencated implements Action{
    readonly type=AUTH_AUTHENCATED;
    constructor(public payload:
        {email:string,
        id:string,
        token:string,
        tokenExpirationDate:Date,
        redirect:boolean
        }){}
}

export class AuthLogout implements Action{
    readonly type = AUTH_LOGOUT
}

export class AuthLoginStart implements Action{
    readonly type = AUTH_LOGIN_START;
    constructor(public payload:{email:string, password:string}){}
}

export class AuthAuthencateFail implements Action{
    readonly type = AUTH_AUTHENCATE_FAIL;
    constructor(public payload:string){}
}

export class AuthSignupStart implements Action{
    readonly type=AUTH_SIGNUP_START;
    constructor(public payload:{email:string, password:string}){}
}

export class AuthClearError implements Action {
    readonly type = AUTH_CLEAR_ERROR;
}

export class AuthAutoLogin implements Action{
    readonly type = AUTH_AUTO_LOGIN;
}

export type AuthActions=AuthAuthencated|
    AuthLogout|
    AuthLoginStart|
    AuthAuthencateFail|
    AuthSignupStart|
    AuthClearError|
    AuthAutoLogin;