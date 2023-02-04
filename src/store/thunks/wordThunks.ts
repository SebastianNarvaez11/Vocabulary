import axios from "axios";
import { vocabularyApi } from "@/apis";
import { AppDispatch } from "../store";
import { IResponseSeedCategoryWords, IWord } from "@/interfaces";
import toast from 'react-hot-toast';
import { set_category, set_is_loading, set_words } from "../slices/wordSlice";



export const getWords = (category: string) => async (dispatch: AppDispatch): Promise<boolean> => {

    dispatch(set_is_loading(true))

    try {
        const { data } = await vocabularyApi.get<IWord[]>(`/words/category/${category}`)
        dispatch(set_words(data))
        dispatch(set_is_loading(false))
        return true

    } catch (error) {
        dispatch(set_is_loading(false))
        if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.message)
        } else {
            toast.error('Error al cargar las palabras, comuniquese con el administrador')
        }
        return false
    }
}


export const updateWord = async (id: string, points: number) => {

    try {
        await vocabularyApi.put<IWord>(`/words/${id}`, { points })

    } catch (error) {
        if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.message)
        } else {
            toast.error('Error al actualizar la palabra')
        }
    }
}


export const createCategoryBySeed = (id: string) => async (dispatch: AppDispatch): Promise<boolean> => {

    dispatch(set_is_loading(true))

    try {
        const { data } = await vocabularyApi.post<IResponseSeedCategoryWords>(`/seed/${id}`)
        dispatch(set_category(data.category))
        dispatch(set_words(data.words))
        dispatch(set_is_loading(false))
        return true

    } catch (error) {
        dispatch(set_is_loading(false))
        if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.message)
        } else {
            toast.error('Error al crear las categorias y palabras')
        }
        return false
    }
}


export const getEasyWordsForReview = () => async (dispatch: AppDispatch): Promise<boolean> => {

    dispatch(set_is_loading(true))

    try {
        const { data } = await vocabularyApi.get<IWord[]>('/words/learned')
        dispatch(set_words(data))
        dispatch(set_is_loading(false))
        return true

    } catch (error) {
        dispatch(set_is_loading(false))
        if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.message)
        } else {
            toast.error('Error al cargar las palabras')
        }
        return false
    }
} 