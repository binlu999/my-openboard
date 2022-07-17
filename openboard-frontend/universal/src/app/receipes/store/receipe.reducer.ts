import { Receipe } from "../receipe.model";
import { ReceipeActions, RECEIPE_ADD_RECEIPE, RECEIPE_DELETE_RECEIPE, RECEIPE_SET_RECEIPES, RECEIPE_UPDATE_RECEIPE } from "./receipe.actions";


export interface ReceipeState {
    receipes:Receipe[]
}

const initialState:ReceipeState={
    receipes:[]
}

export function receipeReducer(state=initialState,action:ReceipeActions){
    switch(action.type){
        case RECEIPE_SET_RECEIPES:
            return {
                ...state,
                receipes:[...action.payload]
            }
        case RECEIPE_ADD_RECEIPE:
            return {
                ...state,
                receipes:[...state.receipes,action.payload]
            }
        case RECEIPE_UPDATE_RECEIPE:
            const updatedReceipe={ 
                ...state.receipes[action.payload.index],
                ...action.payload.receipe};
            const updatedReceipes = [...state.receipes];
            updatedReceipes[action.payload.index]=updatedReceipe;
            return {
                ...state,
                receipes: updatedReceipes
            }
        case RECEIPE_DELETE_RECEIPE:
            return {
                ...state,
                receipes:state.receipes.filter((receipe,index)=>{
                    return index!==action.payload;
                })
            }
        default:
            return state;
    }
}