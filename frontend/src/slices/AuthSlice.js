import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// signup slice
export const signupUser = createAsyncThunk(
    'auth/signup',
    async({userName,email,password},{rejectWithValue})=>{
        try {
            const response = await axios.post('/api/users/signup',{userName,email,password})
            return response.data
        } catch (err) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }

)

export const loginUser = createAsyncThunk(
    'auth/login',
    async({email,password},{rejectWithValue})=>{
        try {
        
            const response = await axios.post('/api/users/auth',{email,password})
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const initialState = {
    userInfo : null,
    loading:false,
    error:null
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(signupUser.pending,(state)=>{
            state.loading = true,
            state.error=null
        })
        .addCase(signupUser.fulfilled,(state,action)=>{
            state.loading = false,
            state.userInfo = action.payload
        })
        .addCase(signupUser.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload
        })
        .addCase(loginUser.pending,(state)=>{
            state.loading = true
            state.error = null
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.userInfo = action.payload,
            state.loading = false
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload 
        })
    }
})

export default authSlice.reducer

// export const { setCredentials, logout } = authSlice.actions
