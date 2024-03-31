import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../Redux/constants/constants";

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



// function to fetch the user data based on the search input 
export const fetchUserData  = createAsyncThunk(
  'userData/fetchUserData',
  async(searchQuery,{rejectWithValue})=>{
    try {
      console.log('search query in slce',searchQuery)
      const response = await axios.get(`/api/users/search?query=${searchQuery}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialUserDataState = {
  userData:null,
  loading:false,
  error:null
}


const userDataSlice = createSlice({
  name:'userData',
  initialState:initialUserDataState,
  reducers:{},
  extraReducers:(builder)=>{
    builder
    .addCase(fetchUserData.pending,(state)=>{
      state.loading = true,
      state.error = null
    })
    .addCase(fetchUserData.fulfilled,(state,action)=>{
      state.loading = false,
      state.userData = action.payload
    })
    .addCase(fetchUserData.rejected,(state,action)=>{
      state.error = action.payload,
      state.loading = false
    })
  }
})







export {userDataSlice,userProfileSlice} 
