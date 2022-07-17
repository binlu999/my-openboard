import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { AuthLogout } from './store/auth.action';


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
    tokenExpirationTimer:any;

    constructor(private store:Store<AppState>) {
    };

    clearLogoutTimer(){
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
    }
    setLogoutTimer(expirationDuration:number){
        this.tokenExpirationTimer=setTimeout(() => {
            this.store.dispatch(new AuthLogout() );
        }, expirationDuration);

    }
}