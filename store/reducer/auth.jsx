import { AUTHENTICATE, LOGOUT } from "../action/auth";

const initialState = {
    token: null,
    userId: null
}

export default function authReducer(state=initialState,action){
    switch(action.type){
       case AUTHENTICATE:
           const tokens = action.token
           console.log(tokens);
        return {
            token: tokens,
            userId: action.userId
        }
       case LOGOUT:
           return initialState;
        
        
    default:
        return state;

        
    }
    
}