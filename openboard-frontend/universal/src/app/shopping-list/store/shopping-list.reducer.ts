import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.action';

export interface ShoppingListState {
    ingredients:Ingredient[];
    editedIngredient:Ingredient;
    editedIngredientIndex:number
}

const initialState:ShoppingListState={
    ingredients:[],
    editedIngredient:null,
    editedIngredientIndex:-1
}

export function shoppingListReducer(
        state:ShoppingListState=initialState, 
        action:ShoppingListActions.ACTIONS){
    switch(action.type){
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients:[...state.ingredients,action.payload]
            }
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients:[...state.ingredients,...action.payload]
            }
        case ShoppingListActions.UPDATE_INGREDITENT:
            const ingredient=state.ingredients[state.editedIngredientIndex];
            const ingredients=[...state.ingredients];
            const updatedIngredent={
                ...ingredient,
                ...action.payload
            }
            ingredients[state.editedIngredientIndex]=updatedIngredent;
            return {
                ...state,
                ingredients:ingredients,
                editedIngredient:null,
                editedIngredientIndex:-1
            }
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients:[...state.ingredients].filter((ingredient,index)=>{
                    return index!==state.editedIngredientIndex;
                })
            }
        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredient: {...state.ingredients[action.payload]},
                editedIngredientIndex:action.payload
            }
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient:null,
                editedIngredientIndex:-1
            }
        default:
            return state;
    };
}