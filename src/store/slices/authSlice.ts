import { ILoginResponse } from '@/interfaces'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IAuthState {
    isLoggedIn: boolean,
    user?: {
        name: string,
        email: string
    }
}

const initialState: IAuthState = {
    isLoggedIn: false,
    user: undefined
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        login: (state, action: PayloadAction<ILoginResponse>) => {
            state.isLoggedIn = true,
            state.user = action.payload.user
        }
    }
})


export const { login } = authSlice.actions
export default authSlice.reducer