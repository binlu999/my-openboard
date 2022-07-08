import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients:Observable<{ingredients:Ingredient[]}>;
  //subscription:Subscription;

  constructor(private shoppinglistService:ShoppingListService,
    private store:Store<{shoppingList:{ingredients:Ingredient[]}}>) { }
  
  ngOnInit(): void {
    this.ingredients=this.store.select('shoppingList');
  }

  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
  }

  onSelect(index:number){
    this.shoppinglistService.startingEdit.next(index);
  }
}
