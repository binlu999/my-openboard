import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { exhaustMap, map, take } from "rxjs/operators";
import { AppState } from "../store/app.reducer";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    
    constructor(private authService:AuthService, 
        private store:Store<AppState>){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select('auth').pipe(
            take(1),
            map(authState=>{
                return authState.user;
            }),
            exhaustMap(user=>{
                if(!user){
                    return next.handle(req)
                }
                let params=req.params;
                const modifiedReq=req.clone(
                    {
                        params:params.append('auth',user.token)
                    }
                );
                return next.handle(modifiedReq)
            })
        )
    }
    
}