import useSWR, { SWRConfiguration } from 'swr';
import { iProduct } from '../interfaces/product';

export const useProducts = <T>(url: string, config: SWRConfiguration = {}) => {
    //const { data, error } = useSWR<iProduct[]>(`/api${url}`, fetcher, config);
    const { data, error } = useSWR<iProduct[]>(`/api${url}`, config);
    return {
        products: data || [],
        isLoading: !error && !data,
        isError: error
    }
}