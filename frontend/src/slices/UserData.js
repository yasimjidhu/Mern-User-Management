import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../Redux/constants/constants";
import { editUserName } from "./PasswordResetSlice";


//initial state
// const initialState = {
//   userProfile: null,
//   loading: false,
//   error: null
// }

// userprofile slice
// const userProfileSlice = createSlice({
//   name: 'userProfile',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUserProfileData.pending, (state) => {
//         state.loading = true,
//           state.error = null
//       })
//       .addCase(fetchUserProfileData.fulfilled, (state, action) => {
//         state.loading = false,
//           console.log('actionpayload', action.payload)
//         state.userProfile = action.payload
//       })
//       .addCase(fetchUserProfileData.rejected, (state, action) => {
//         state.error = action.payload,
//           state.loading = false
//       })
//   }
// })



// function to fetch the user data based on the search input 
export const fetchUserData = createAsyncThunk(
  'userData/fetchUserData',
  async (searchQuery, { rejectWithValue }) => {
    try {
      console.log('search query in slce', searchQuery)
      const response = await axios.get(`/api/users/search?query=${searchQuery}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchAllUsersData = createAsyncThunk(
  'userData/fetchAllUsersData',
  async (_, { rejectWithValue }) => {
    try {

      const response = await axios.get('/api/admin/getAllUsers')
      console.log('allusersin slice', response.data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const deleteUser = createAsyncThunk(
  'userData/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {

      const response = await axios.delete(`/api/admin/delete-user/${userId}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// function to fetch the user profile
export const fetchUserProfileData = createAsyncThunk(
  "userData/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/users/getUserProfile');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



// define asyncthunk
export const uploadFile = createAsyncThunk(
  'userData/upload',
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      formData.append('profileImage', file)

      const response = await axios.post(`/api/users/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.message)
    }
  }
)

// async action to reset the password
export const resetPassword = createAsyncThunk(
  'userData/resetPassword',
  async (formData, { rejectWithValue }) => {
    try {

      const response = await axios.post('/api/users/resetPassword', formData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// function to save the userData
export const updateUserData = createAsyncThunk(
  'userData/updateUserData',
  async (data, { rejectWithValue }) => {
    try {
      console.log('data in slice', data)
      const response = await axios.put('/api/users/profile', data)
      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

// function to add a user (by admin)
export const addUser = createAsyncThunk(
  'userData/addUser',
  async (formData, { rejectWithValue }) => {
    try {
      console.log('add user formdata', formData)
      const response = await axios.post('/api/admin/addUser', formData)
      return response.data

    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialUserDataState = {
  userData: null,
  loading: false,
  error: null
}


const userDataSlice = createSlice({
  name: 'userData',
  initialState: initialUserDataState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true,
          state.error = null
        state.userData = null
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false,
          state.userData = action.payload,
          state.error = false
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.error = action.payload,
          state.loading = false,
          state.userData = false
      })
      .addCase(fetchAllUsersData.pending, (state) => {
        state.loading = true,
          state.userData = false,
          state.error = false
      })
      .addCase(fetchAllUsersData.fulfilled, (state, action) => {
        state.loading = false,
          state.userData = action.payload,
          state.error = null
      })
      .addCase(fetchAllUsersData.rejected, (state, action) => {
        state.loading = false;
        state.userData = false;
        state.error = action.payload
      })
      .addCase(editUserName.pending, (state) => {
        state.loading = true;
      })
      .addCase(editUserName.fulfilled, (state, { payload }) => {
        state.loading = false;
        const users = state.userData
        state.userData = users.map(value => {
          if (value._id === payload.updatedUser._id) {
            return payload.updatedUser
          } else {
            return value
          }
        })
      })
      .addCase(editUserName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.userData = null
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.userData = state.userData.filter(user => user._id !== action.payload.deletedUserId)
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserProfileData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserProfileData.fulfilled, (state, action) => {
        state.loading = false
        state.userData = action.payload
      })
      .addCase(fetchUserProfileData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(uploadFile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.loading = false
        state.userData = action.payload.updatedProfile
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false,
          state.userData = action.payload.updatedUser
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false
        state.userData = action.payload
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})







export default userDataSlice 
