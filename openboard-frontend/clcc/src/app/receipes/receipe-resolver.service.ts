import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Receipe } from "./receipe.model";
import { DataStorageService } from './../shared/data-storage.service';
import { ReceipeService } from "./receipe.service";

@Injectable(
    {
        providedIn:'root'
    }
)
export class ReceipeResolverService implements Resolve<Receipe[]>{
    
    constructor(private dataStorageService:DataStorageService, private receipeService:ReceipeService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Receipe[] | Observable<Receipe[]> | Promise<Receipe[]> {
        const receipes=this.receipeService.getReceipes();
        if(receipes.length === 0){
            return this.dataStorageService.fetchReceipeData();
        }else{
            return receipes;
        }
    }

}