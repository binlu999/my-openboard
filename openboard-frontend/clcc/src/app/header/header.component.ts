import { Component,  OnInit} from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { AuthLogout } from "../auth/store/auth.action";
import { ReceipeFetchReceipes, ReceipeSaveReceipes } from "../receipes/store/receipe.actions";
import { AppState } from "../store/app.reducer";

@Component({
    selector:"app-header",
    templateUrl:"./header.component.html"
})
export class HeaderComponent implements OnInit{
    collapsed = true;
    userSub:Subscription;
    isAuthencated=false;

    constructor( 
        private store:Store<AppState>){
    }

    ngOnInit(): void {
        this.userSub=this.store.select('auth').pipe(
            map(authState=>authState.user)
        ).subscribe(
            user=>{
                this.isAuthencated=!!user;
            }
        )
    }
    onSaveData(){
        this.store.dispatch(new ReceipeSaveReceipes());
    }
    onFetchData(){
        this.store.dispatch(new ReceipeFetchReceipes());
    }
    onLogout(){
        this.store.dispatch(new AuthLogout());
    }
}