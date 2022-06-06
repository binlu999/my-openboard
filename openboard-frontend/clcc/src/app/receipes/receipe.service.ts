import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Receipe } from "./receipe.model";

@Injectable()
export class ReceipeService{

    selectedReceipe = new Subject<Receipe>();
    
    constructor(private shoppingListServive:ShoppingListService){

    }
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

    getReceipes(){
        return this.receipes.slice();
    }

    getReceipe(index:number){
        return this.receipes[index];
    }

    addIntegredentsToShoppingList(ingredents:Ingredient[]){
        this.shoppingListServive.addIngredients(ingredents);
    }

}