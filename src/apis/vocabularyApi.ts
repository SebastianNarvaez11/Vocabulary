import axios from 'axios'

const vocabularyApi = axios.create({
    baseURL: '/api',
})

export default vocabularyApi