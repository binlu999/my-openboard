import { Component, EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({
    providedIn:'root'
})
export class ShoppingListService{
    ingredientsChanged=new EventEmitter<Ingredient[]>();
    private ingredients:Ingredient[]= [];

    getIngredients(){
        return this.ingredients.slice();
    }

    addingredients(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients);
    }
}