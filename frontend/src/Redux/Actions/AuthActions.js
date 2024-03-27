import axios from "axios";
import { SIGNUP_SUCCESS,SIGNUP_FAIL } from "./Types";
import { json } from "react-router-dom";

//SIGNUP ACTION
export const signup = ({userName,email,password})=> async (dispatch)=>{
    const config = {
        headers:{
            'Content-Type':'application/json',
        }
    }

    const body = JSON.stringify({userName,email,password})

    try{
        const res = await axios.post('/api/signup',body,config)

        dispatch({
            type:SIGNUP_SUCCESS,
            payload:res.data
        })
    }catch(err){
       dispatch({
        type:SIGNUP_FAIL
       })
    }
}