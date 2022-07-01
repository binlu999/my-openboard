import { Component, OnDestroy, OnInit} from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector:"app-header",
    templateUrl:"./header.component.html"
})
export class HeaderComponent implements OnInit, OnDestroy{
    collapsed = true;
    userSub:Subscription;
    isAuthencated=false;

    constructor(private dataStorageService:DataStorageService, private authService:AuthService){
    }

    ngOnInit(): void {
        this.userSub=this.authService.user.subscribe(
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