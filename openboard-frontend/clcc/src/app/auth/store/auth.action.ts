import { Action } from "@ngrx/store";

export const AUTH_LOGIN='AUTH_LOGIN';
export const AUTH_LOGOUT='AUTH_LOGOUT';

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

export type AuthActions=AuthLogin|AuthLogout;