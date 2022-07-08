import { EventEmitter, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { AddIngredients } from "../shopping-list/store/shopping-list.action";
import { Receipe } from "./receipe.model";

@Injectable({
    providedIn:'root'
})
export class ReceipeService{
    receipeChanges=new Subject<Receipe[]>();
    selectedReceipe = new Subject<Receipe>();
    
    constructor(private shoppingListServive:ShoppingListService,
       private store:Store<{shoppingList:{ingredients:Ingredient[]}}>
       ){
    }
    /*
    private receipes:Receipe[]=[
        new Receipe(
            'Sample Receipe',
            'This is a sample receipe for test','https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&webp=true&resize=375,341',
            [
                new Ingredient('Meat',3),
                new Ingredient('Vegitable',5)
            ]
            ),
        new Receipe('Sample Receipe 2',
        'This is a sample receipe 2 for test',
        'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2015/11/shakshuka-11.jpg',
        [
            new Ingredient('Fruit',2),
            new Ingredient('Sugar',6)
        ])
      ];
      */
    private receipes:Receipe[]=[];
    
    setReipes(receipes:Receipe[]){
        this.receipes=receipes;
        this.receipeChanges.next(this.receipes.slice());
    }
    getReceipes(){
        return this.receipes.slice();
    }

    getReceipe(index:number){
        return this.receipes[index];
    }

    addIntegredentsToShoppingList(ingredents:Ingredient[]){
        //this.shoppingListServive.addIngredients(ingredents);
        this.store.dispatch(new AddIngredients(ingredents));
    }

    addReceipe(receipe:Receipe){
        this.receipes.push(receipe);
        this.receipeChanges.next(this.receipes.slice());
    }

    updateReceipe(index:number, receipe:Receipe){
        this.receipes[index]=receipe;
        this.receipeChanges.next(this.receipes.slice());
    }

    deleteReceipe(index:number){
        this.receipes.splice(index,1);
        this.receipeChanges.next(this.receipes.slice());
    }
}