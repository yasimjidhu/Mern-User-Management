import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../slices/AuthSlice'
import { apiSlice } from '../slices/ApiSlice';
import UploadSlice from '../slices/UploadSlice';
import UserData from '../slices/UserData';
import PasswordResetSlice from '../slices/PasswordResetSlice';

const store = configureStore({
    reducer:{
        auth:authReducer,
        [apiSlice.reducerPath]:apiSlice.reducer,
        upload:UploadSlice,
        userProfile:UserData,
        resetPassword:PasswordResetSlice
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat
    (apiSlice.middleware),
    devTools:true
})

export default store;
