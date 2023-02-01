import axios from 'axios'

export const vocabularyApi = axios.create({
    baseURL: '/api',
})
