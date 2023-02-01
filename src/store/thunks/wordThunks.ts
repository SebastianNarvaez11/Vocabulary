import axios from "axios";
import { vocabularyApi } from "@/apis";
import { AppDispatch } from "../store";
import { IWord } from "@/interfaces";
import toast from 'react-hot-toast';
import { set_is_loading, set_words } from "../slices/wordSlice";

export const getWords = (category: string) => async (dispatch: AppDispatch) => {

    dispatch(set_is_loading(true))

    try {
        const { data } = await vocabularyApi.get<IWord[]>(`/words/category/${category}`)
        dispatch(set_words(data))
        dispatch(set_is_loading(false))

    } catch (error) {
        dispatch(set_is_loading(false))
        if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.message)
        } else {
            toast.error('Error al cargar las palabras, comuniquese con el administrador')
        }
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