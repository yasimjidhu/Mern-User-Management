import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// function to fetch the user profile
export const fetchUserProfileData = createAsyncThunk(
  "userProfile/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/users/getUserProfile');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//initial state
const initialState = {
    userProfile : null,
    loading:false,
    error:null
}

// userprofile slice
const userProfileSlice = createSlice({
    name:'userProfile',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUserProfileData.pending,(state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(fetchUserProfileData.fulfilled,(state,action)=>{
            state.loading = false,
            console.log('actionpayload',action.payload)
            state.userProfile = action.payload
        })
        .addCase(fetchUserProfileData.rejected,(state,action)=>{
            state.error = action.payload,
            state.loading = false
        })
    }
})

export default userProfileSlice.reducer;
