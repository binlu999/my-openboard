import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { AppState } from "src/app/store/app.reducer";
import { environment } from "src/environments/environment";
import { Receipe } from "../receipe.model";
import { ReceipeSetReceipes, RECEIPE_FETCH_RECEIPES, RECEIPE_SAVE_RECEIPES } from "./receipe.actions";

@Injectable()
export class ReceipeEffects {

    constructor(private actions$:Actions, 
        private http:HttpClient,
        private store:Store<AppState>
        ){}

    @Effect()
    fetchReceipes=this.actions$.pipe(
        ofType(RECEIPE_FETCH_RECEIPES),
        switchMap(()=>{
            return this.http.get<Receipe[]>(
                environment.RECEIPE_STORE_URL
            )
        }),
        map((receipes=>{
            return receipes.map(receipe=>{
                return {
                    ...receipe,
                    ingredients:receipe.ingredients?receipe.ingredients:[]
                }
            })
        })),
        map(receipes=>{
            return new ReceipeSetReceipes(receipes)
        })
    );
    
    @Effect({
        dispatch:false
    })
    saveReceipes=this.actions$.pipe(
     ofType(RECEIPE_SAVE_RECEIPES),
     withLatestFrom(this.store.select('receipes')),
     switchMap(([actionData,receipeState])=>{
        return this.http.put(
            environment.RECEIPE_STORE_URL,
            receipeState.receipes
        )
     })
    )
}