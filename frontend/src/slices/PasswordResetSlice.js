import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import baseUrl from "../Redux/constants/constants";



const initialState = {
    loading: false,
    error: null,
    success: false
}

// password reset slice
const passwordResetSlice = createSlice({
    name: 'editUser',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            
            .addCase(editUserName.pending,(state)=>{
                state.loading = true,
                state.error = false,
                state.success = false
            })
            .addCase(editUserName.fulfilled,(state)=>{
                state.loading = false,
                state.success = true,
                state.error = false
            })
            .addCase(editUserName.rejected,(state,action)=>{
                state.loading = false,
                state.success = false,
                state.error = action.payload;
            })
    }
})


// async function to edit the user data
export const editUserName = createAsyncThunk(
    'editUser/editUserName',
    async(formDatas,{rejectWithValue})=>{
        console.log('formdata in edit slice',formDatas)
        try {
            
            const response = await axios.post('/api/admin/edit-user',formDatas)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)



export default passwordResetSlice.reducer