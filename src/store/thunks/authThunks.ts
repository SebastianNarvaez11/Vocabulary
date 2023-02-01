import axios from 'axios'
import { vocabularyApi } from "@/apis";
import { AppDispatch } from "../store";
import { ILoginResponse } from "@/interfaces";
import Cookies from "js-cookie";
import { login } from "../slices/authSlice";
import toast from 'react-hot-toast';
import { NextRouter } from 'next/router';


export const loginUser = (email: string, password: string) => async (dispatch: AppDispatch) => {

    try {
        const { data } = await vocabularyApi.post<ILoginResponse>('/auth/login', { email, password })
        Cookies.set('token', data.token)
        dispatch(login(data))
        return true

    } catch (error) {
        if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.message);
        } else {
            toast.error('Error en el proceso de autenticacion');
        }
        return false
    }
}




export const registerUser = (name: string, email: string, password: string) => async (dispatch: AppDispatch) => {

    try {
        const { data } = await vocabularyApi.post<ILoginResponse>('/auth/register', { name, email, password })
        Cookies.set('token', data.token)
        dispatch(login(data))
        return true

    } catch (error) {
        if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.message);
        } else {
            toast.error('Error en el proceso de registro');
        }
        return false
    }
}



export const getCurrentUser = (router: NextRouter) => async (dispatch: AppDispatch) => {

    try {
        const { data } = await vocabularyApi.get<ILoginResponse>('/auth/current-user')
        Cookies.set('token', data.token)
        dispatch(login(data))

    } catch (error) {
        Cookies.remove('token')
        router.reload()
    }
}
