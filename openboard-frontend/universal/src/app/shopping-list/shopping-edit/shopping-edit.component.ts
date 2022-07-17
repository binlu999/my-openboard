import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.action';
import { AppState } from 'src/app/store/app.reducer';

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

  constructor(private store:Store<AppState>) { }
  
  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(
      stateData=>{
        if(stateData.editedIngredientIndex>-1){
          this.editMode=true;
          this.editIngredient=stateData.editedIngredient;
          this.slForm.setValue({
            name:this.editIngredient.name,
            amount:this.editIngredient.amount
          });
        }else{
          this.editMode=false;
        }
      }
    );
   
  }

  onSaveItem(form:NgForm){
    const value=form.value;
    console.log(value);
    const newIngredient=new Ingredient(value.name,
      value.amount);
      if(this.editMode){
        this.store.dispatch(new ShoppingListActions.UpdateIngrediemt(newIngredient));
      }else{
         this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
      }

      this.onClear();
    
  }

  onDelete(){
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());

    this.onClear();
  }

  onClear(){
    this.editMode=false;
    this.editedIngredientIndex=null;
    this.editIngredient=null;
    this.slForm.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
