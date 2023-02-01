import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory, IWord } from "@/interfaces"

interface IStateCategory {
    category?: ICategory,
    words: IWord[],
    isLoading: boolean
}

const initialState: IStateCategory = {
    category: undefined,
    words: [],
    isLoading: false
}


export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {

        set_category: (state, action: PayloadAction<ICategory>) => {
            state.category = action.payload
        },

        set_words: (state, action: PayloadAction<IWord[]>) => {
            state.words = action.payload
        },

        set_is_loading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },

        clean_state_words: (state) => {
            state.category = undefined,
                state.words = [],
                state.isLoading = false
        },

        add_word: (state, action: PayloadAction<IWord>) => {
            state.words = [...state.words, action.payload]
        },
    }
})

export const { set_category, set_words, set_is_loading, add_word, clean_state_words } = categorySlice.actions
export default categorySlice.reducer