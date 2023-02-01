import { ICategory } from './../interfaces';
import useSWR, { SWRConfiguration } from 'swr'
import useSWRImmutable from 'swr/immutable'


// se debe especificar el fetcher como provider en el _app.tsx

export const useCategories = (url: string, config: SWRConfiguration = {}) => {

    // esta forma revalida los datos por: estado, focus o reconeccion
    const { data, error } = useSWR<ICategory[]>(`/api${url}`, config)

    // de esta forma solo valida al renderizar el componente
    // const { data, error } = useSWRImmutable<ICategory[]>(`/api${url}`, config)

    return {
        categories: data || [],
        isLoading: !error && !data,
        isError: error
    }
}