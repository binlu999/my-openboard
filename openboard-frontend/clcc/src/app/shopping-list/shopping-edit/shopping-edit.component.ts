import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.action';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription:Subscription;
  @ViewChild('f') slForm:NgForm;
  editMode:boolean=false;
  editedIngredientIndex:number;
  editIngredient:Ingredient;

  constructor(private shoppingListService:ShoppingListService,
    private store:Store<{shoppingList:{ingredients:Ingredient[]}}>) { }
  
  ngOnInit(): void {
    this.subscription=this.shoppingListService.startingEdit.subscribe(
      (index:number)=>{
        this.editMode=true;
        this.editedIngredientIndex=index;
        this.editIngredient=this.shoppingListService.getIngredient(index);
        this.slForm.setValue(
          {
            name:this.editIngredient.name,
            amount:this.editIngredient.amount
          }
        )
      }
    )
  }

  onSaveItem(form:NgForm){
    const value=form.value;
    console.log(value);
    const newIngredient=new Ingredient(value.name,
      value.amount);
      if(this.editMode){
        this.shoppingListService.updateIngredient(this.editedIngredientIndex,newIngredient);
      }else{
        //this.store.dispatch();
        this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
      }

      this.onClear();
    
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedIngredientIndex);
    this.onClear();
  }

  onClear(){
    this.editMode=false;
    this.editedIngredientIndex=null;
    this.editIngredient=null;
    this.slForm.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
