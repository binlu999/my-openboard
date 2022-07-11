import { User } from "../user.model";
import { AuthActions, AUTH_LOGIN, AUTH_LOGOUT } from "./auth.action";

export interface AuthState {
    user:User
}

const initialState :AuthState ={
    user:null
}

export function authReducer(state=initialState, action:AuthActions){
    switch(action.type) {
        case AUTH_LOGIN:
            const user = new User (
                action.payload.email,
                action.payload.id,
                action.payload.token,
                action.payload.tokenExpirationDate
            );
            return {
                ...state,
                user:user
            };

        case AUTH_LOGOUT:
            return {
                ...state,
                user:null            
            }
        default:
            return state;
    }
}