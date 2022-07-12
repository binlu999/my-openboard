import { User } from "../user.model";
import { AuthActions, AUTH_LOGIN, AUTH_LOGIN_FAIL, AUTH_LOGIN_START, AUTH_LOGOUT } from "./auth.action";

export interface AuthState {
    user:User,
    authError:string,
    isLoading:boolean
}

const initialState :AuthState ={
    user:null,
    authError:null,
    isLoading:false
}

export function authReducer(state=initialState, action:AuthActions):AuthState{
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
                user:user,
                authError:null,
                isLoading:false
            };

        case AUTH_LOGOUT:
            return {
                ...state,
                user:null,
                authError:null,
                isLoading:false            
            }
        case AUTH_LOGIN_START:
            return {
                ...state,
                authError:null,
                isLoading:true
            }
        case AUTH_LOGIN_FAIL:
            return {
                ...state,
                user:null,
                authError:action.payload,
                isLoading:false
            }
        default:
            return state;
    }
}