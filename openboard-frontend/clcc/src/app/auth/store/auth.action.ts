import { Action } from "@ngrx/store";

export const AUTH_LOGIN_START='AUTH_LOGIN_START';
export const AUTH_LOGIN='AUTH_LOGIN';
export const AUTH_LOGOUT='AUTH_LOGOUT';
export const AUTH_LOGIN_FAIL='AUTH_LOGIN_FAIL';

export class AuthLogin implements Action{
    readonly type=AUTH_LOGIN;
    constructor(public payload:
        {email:string,
        id:string,
        token:string,
        tokenExpirationDate:Date}){}
}

export class AuthLogout implements Action{
    readonly type = AUTH_LOGOUT
}

export class AuthLoginStart implements Action{
    readonly type = AUTH_LOGIN_START;
    constructor(public payload:{email:string, password:string}){}
}

export class AuthLoginFail implements Action{
    readonly type = AUTH_LOGIN_FAIL;
    constructor(public payload:string){}
}
export type AuthActions=AuthLogin|AuthLogout|AuthLoginStart|AuthLoginFail;