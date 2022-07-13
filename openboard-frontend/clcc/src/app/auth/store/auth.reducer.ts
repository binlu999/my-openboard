import { User } from "../user.model";
import { AuthActions, AUTH_AUTHENCATED, AUTH_AUTHENCATE_FAIL, AUTH_CLEAR_ERROR, AUTH_LOGIN_START, AUTH_LOGOUT, AUTH_SIGNUP_START } from "./auth.action";

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
        case AUTH_AUTHENCATED:
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
            console.log('reducer')
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
        case AUTH_SIGNUP_START:
            return {
                ...state,
                authError:null,
                isLoading:true
            }
        case AUTH_AUTHENCATE_FAIL:
            return {
                ...state,
                user:null,
                authError:action.payload,
                isLoading:false
            }
        case AUTH_CLEAR_ERROR:
            return {
                ...state,
                authError:null
            }
        default:
            return state;
    }
}