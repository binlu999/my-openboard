import { Actions, ofType } from "@ngrx/effects";
import { AUTH_LOGIN_START } from "./auth.action";

export class AuthEffects{
    authLogin = this.actions$.pipe(
        ofType(AUTH_LOGIN_START),
    )
    constructor(private actions$:Actions){}
}