import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({
    providedIn:'root'
})
export class ShoppingListService{
    ingredientsChanged=new Subject<Ingredient[]>();
    startingEdit =new Subject<number>();

    private ingredients:Ingredient[]= [];

    getIngredients(){
        return this.ingredients.slice();
    }

    addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients);
    }

    addIngredients(ingredients:Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index:number, ingredient:Ingredient){
        this.ingredients[index]=ingredient;
        this.ingredientsChanged.next(this.ingredients.slice());
        console.log('updated'+index+'and value'+ingredient);
    }
    getIngredient(index:number){
        return this.ingredients[index];
    }

    deleteIngredient(index:number){
        this.ingredients.splice(index,1);
    }
}