import { configureStore } from "@reduxjs/toolkit";
import wordSlice from './slices/wordSlice';
import authSlice from './slices/authSlice'


export const store = configureStore({
    reducer: {
        auth: authSlice,
        word: wordSlice
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch