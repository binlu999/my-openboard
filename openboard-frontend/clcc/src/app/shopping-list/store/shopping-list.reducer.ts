import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.action';

interface AppicationState {
    ingredients:Ingredient[]
}

const initialState:AppicationState={
    ingredients:[]
}

export function shoppingListReducer(state=initialState, action:ShoppingListActions.ACTIONS){
    switch(action.type){
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients:[...state.ingredients,action.payload]
            }
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                Ingredient:{...state.ingredients,...action.payload}
            }
        default:
            return state;
    };
}