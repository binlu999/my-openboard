import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError,tap } from 'rxjs/operators';
import { AppState } from '../store/app.reducer';
import { AuthLogin, AuthLogout } from './store/auth.action';
import { User } from './user.model';

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
    SEC_TOKEN_NAME='clcc-openboard-user-data';

    //user:Subject<User>=new Subject<User>();
    //user = new BehaviorSubject<User>(null);
    tokenExpirationTimer:any;

    constructor(private http: HttpClient,private router:Router,
        private store:Store<AppState>) {
    };

    autoLogin(){
        const user:{
            email:string,
            Id:string,
            _token:string,
            _tokenExpirationDate:string
            } = JSON.parse(localStorage.getItem(this.SEC_TOKEN_NAME));
        
        if(!user){
            return;
        }

        const loggedInUser=new User(user.email,user.Id,user._token,new Date(user._tokenExpirationDate));
        if(loggedInUser.token){
            //this.user.next(loggedInUser);
            this.store.dispatch(new AuthLogin({
                    email: loggedInUser.email,
                    id: loggedInUser.Id,
                    token: loggedInUser.token,
                    tokenExpirationDate: new Date(user._tokenExpirationDate)
                }            
            ));
            const expiredIn = (new Date(user._tokenExpirationDate)).getTime()-(new Date()).getTime();
            this.autoLogout(expiredIn);
        }
    }
    logout(){
        //this.user.next(null);
        this.store.dispatch(new AuthLogout());
        this.router.navigate(['/auth']);
        localStorage.removeItem(this.SEC_TOKEN_NAME);
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer=null;
    }
    autoLogout(expirationDuration:number){
        this.tokenExpirationTimer=setTimeout(() => {
            this.logout();
        }, expirationDuration);

    }
    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            this.AUTH_SIGNUP_URL+this.AUTH_API_KEY,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError),
            tap(respData=>{
                this.handleAuthencation(
                    respData.email,
                    respData.localId,
                    respData.idToken, 
                    +respData.expiresIn);
            })
            );
    }

    signin(email:string,password:string){
        return this.http.post<AuthResponseData>(
            this.AUTH_SIGNIN_URL+this.AUTH_API_KEY,
            {
                email:email,
                password:password,
                returnSecureToken:true
            }
        ).pipe(
            catchError(this.handleError),
            tap(respData=>{
                this.handleAuthencation(
                    respData.email,
                    respData.localId,
                    respData.idToken, 
                    +respData.expiresIn);
            })
        );
    }

    handleAuthencation(email:string,id:string,token:string,expiresIn:number){
        const tokenExpirationDate=new Date((new Date()).getTime()+expiresIn*1000);
        const user=new User(email,id,token,tokenExpirationDate);
        //this.user.next(user);
        this.store.dispatch(new AuthLogin( {
            email:email,
            id:id,
            token:token,
            tokenExpirationDate:tokenExpirationDate
        }))
        localStorage.setItem(this.SEC_TOKEN_NAME,JSON.stringify(user));
        this.autoLogout(expiresIn*1000);
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