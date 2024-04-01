import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

// define initialstate
const initialState = {
    uploading: false,
    error: null,
    userProfile: null
}

//define upload slice
const uploadSlice = createSlice({
    name: 'upload',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadFile.pending, (state) => {
                state.uploading = true,
                state.error = null
            })
            .addCase(uploadFile.fulfilled, (state, action) => {
                state.uploading = false,
                state.userProfile = action.payload.userProfile
            })
            .addCase(uploadFile.rejected, (state, action) => {
                state.uploading = false,
                    state.error = action.payload
            })
    }
})



export default uploadSlice.reducer