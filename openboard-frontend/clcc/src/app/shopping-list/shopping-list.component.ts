import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListAction from './store/shopping-list.action';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients:Observable<{ingredients:Ingredient[]}>;
  //subscription:Subscription;

  constructor(private shoppinglistService:ShoppingListService,
    private store:Store<fromShoppingList.AppState>) { }
  
  ngOnInit(): void {
    this.ingredients=this.store.select('shoppingList');
  }

  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
  }

  onSelect(index:number){
    //this.shoppinglistService.startingEdit.next(index);
    this.store.dispatch(new ShoppingListAction.StartEdit(index));
  }
}
