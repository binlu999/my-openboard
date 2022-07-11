import { Component, OnDestroy, OnInit} from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";
import { DataStorageService } from "../shared/data-storage.service";
import { AppState } from "../store/app.reducer";

@Component({
    selector:"app-header",
    templateUrl:"./header.component.html"
})
export class HeaderComponent implements OnInit, OnDestroy{
    collapsed = true;
    userSub:Subscription;
    isAuthencated=false;

    constructor(private dataStorageService:DataStorageService, 
        private authService:AuthService,
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
        this.dataStorageService.saveReceipeData();
    }
    onFetchData(){
        this.dataStorageService.fetchReceipeData().subscribe();
    }
    onLogout(){
        this.authService.logout();
    }
    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }
}