import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from '../auth/store/auth.reducer';
import { receipeReducer, ReceipeState } from '../receipes/store/receipe.reducer';
import { shoppingListReducer, ShoppingListState } from './../shopping-list/store/shopping-list.reducer';
export interface AppState {
    auth:AuthState,
    shoppingList:ShoppingListState,
    receipes:ReceipeState
}

export const appReducer:ActionReducerMap<AppState> = {
    auth:authReducer,
    shoppingList:shoppingListReducer,
    receipes:receipeReducer
    
}