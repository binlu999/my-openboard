import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { Receipe } from "./receipe.model";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.reducer";
import { ReceipeFetchReceipes, RECEIPE_SET_RECEIPES } from "./store/receipe.actions";
import { Actions, ofType } from "@ngrx/effects";
import { map, switchMap, take } from "rxjs/operators";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class ReceipeResolverService implements Resolve<Receipe[]>{

    constructor(private store: Store<AppState>,
        private actions$: Actions) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Receipe[] | Observable<Receipe[]> | Promise<Receipe[]> {
        return this.store.select('receipes').pipe(
            take(1),
            map(receipeState => {
                return receipeState.receipes;
            }),
            switchMap(receipes => {
                if (receipes.length === 0) {
                    this.store.dispatch(new ReceipeFetchReceipes());
                    return this.actions$.pipe(
                        ofType(RECEIPE_SET_RECEIPES),
                        take(1)
                    );
                } else {
                    return of(receipes);
                }
            })
        )
    }

}