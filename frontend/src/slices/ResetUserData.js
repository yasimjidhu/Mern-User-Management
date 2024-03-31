import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from '../Redux/constants/constants'

const initialState = {
    email: "",
    userName: "",
    status: "idle",
    error: null
}

export const updateUserOnBackend = createAsyncThunk(
    "user/updateUserOnBackend",
    async (updatedUserData, { rejectWithValue }) => {
        try {

            const response = await axios.post(`${baseUrl}/api/users/updateUserData`,updatedUserData)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(updateUserOnBackend.pending,(state)=>{
            state.status = 'loading'
        })
        .addCase(updateUserOnBackend.fulfilled,(state,action)=>{
            state.status = 'idle';

            if(action.payload.email !== undefined){
                state.email = action.payload.email
            }
            if(action.payload.userName !== undefined){
                state.userName = action.payload.userName
            }

        })
        .addCase(updateUserOnBackend.rejected,(state,action)=>{
            state.status = 'idle',
            state.error = action.payload? action.payload.error:'unknown error '
        })
    }

}
)

export default userSlice.reducer
