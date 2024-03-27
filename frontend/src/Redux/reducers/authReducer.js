import { SIGNUP_SUCCESS,SIGNUP_FAIL } from "../Actions/Types";

const initialState = {
    token:localStorage.getItem('token')
    isAuthenticated:null,
    loading:false
}

export default function authReducer(state=initialState,action){
    const {type,payload} = action

    switch(type){
        case SIGNUP_SUCCESS:
            localStorage.setItem('token',payload.token)
            return{
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false
    };
            case SIGNUP_FAIL:
                localStorage.removeItem('token')
                return{
                    ...state,
                    token:null,
                    isAuthenticated:false,
                    loading:false
                }
            default:
                return state
    }
}