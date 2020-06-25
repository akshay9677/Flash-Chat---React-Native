import axios from "axios";
export const SIGN_UP = 'SIGN_UP';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export function authenticate(userId,token){
    return{type:AUTHENTICATE,userId: userId,token: token}
}

export function signup(email,password){
    return async dispatch=>{
        const response = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBMZ3ouOYRuY-rKbf32YgvURuKdvwXDZlE",{
            email: email,
            password: password,
            returnSecureToken: true
    
           })

           const resData = await response;
           dispatch(authenticate(resData.data.localId,resData.data.idToken));
    }
}

export function login(email,password){
    return async dispatch=>{
        const response = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBMZ3ouOYRuY-rKbf32YgvURuKdvwXDZlE",{
            email: email,
            password: password,
            returnSecureToken: true
    
           })

           const resData = await response;
           dispatch(authenticate(resData.data.localId,resData.data.idToken));
    }
}

export function logout(){
    return{type:LOGOUT}
}