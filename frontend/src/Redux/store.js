import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slices/AuthSlice'
import { apiSlice } from '../slices/ApiSlice';
import PasswordResetSlice from '../slices/PasswordResetSlice';
import userReducer from '../slices/ResetUserData'
import userDataSlice from '../slices/UserData';

const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        userProfile: userDataSlice.reducer,
        resetPassword: PasswordResetSlice,
        resetUserData: userReducer,
        userData: userDataSlice.reducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat
        (apiSlice.middleware),
    devTools: true
})

export default store;
