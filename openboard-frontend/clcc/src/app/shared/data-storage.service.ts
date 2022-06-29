import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map as mapo } from "rxjs-compat/operator/map";
import { map } from "rxjs/operators";
import { Receipe } from "../receipes/receipe.model";
import { ReceipeService } from "../receipes/receipe.service";

@Injectable({
    providedIn:'root'
})
export class DataStorageService {
    private DATA_STORE_URL='https://receipe-book-6c464-default-rtdb.firebaseio.com/receipes.json';
    constructor(private http:HttpClient, private receipeService:ReceipeService){
    }

    saveReceipeData(){
        const receipes=this.receipeService.getReceipes();
        this.http.put(this.DATA_STORE_URL,
        receipes
        ).subscribe(
            (response)=>{
                console.log(response);
            }
        )
    }

    fetchReceipeData(){
        this.http.get<Receipe[]>(this.DATA_STORE_URL)
        .pipe(map(receipes=>{
            return receipes.map(
                receipe=>{
                    return { ...receipe, ingredients:receipe.ingredients?receipe.ingredients:[]}
                }
                )
        }))
        .subscribe(
            (response)=>{
                this.receipeService.setReipes(response);
            }
        );
    }
}