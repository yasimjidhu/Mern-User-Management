import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import baseUrl from "../Redux/constants/constants";

// async action to reset the password
export const resetPassword = createAsyncThunk(
    'passwordReset/resetPassword',
    async (formData, { rejectWithValue }) => {
        try {

            const response = await axios.post('/api/users/resetPassword', formData)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const initialState = {
    loading: false,
    error: null,
    success: false
}

// password reset slice
const passwordResetSlice = createSlice({
    name: 'resetPassword',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(resetPassword.pending, (state) => {
                state.loading = true,
                    state.error = null
                state.success = false
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.loading = false,
                    state.success = true
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })
    }
})

export default passwordResetSlice.reducer