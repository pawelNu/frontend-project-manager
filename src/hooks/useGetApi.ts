import { useCallback, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

type UseGetApiReturn<TData, TArgs extends readonly unknown[]> = {
    data: TData | null;
    loading: boolean;
    error: string | null;
    request: (...args: TArgs) => Promise<void>;
};

export const useGetApi = <TData, TArgs extends readonly unknown[]>(
    serviceFunction: (...args: TArgs) => Promise<AxiosResponse<TData>>,
): UseGetApiReturn<TData, TArgs> => {
    const [data, setData] = useState<TData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const request = useCallback(
        async (...args: TArgs): Promise<void> => {
            setLoading(true);
            setError(null);
            try {
                const response = await serviceFunction(...args);
                console.log(' response:', response);
                setData(response.data);
            } catch (err) {
                // console.log(' err:', err);
                if (axios.isAxiosError(err)) {
                    setError(err.response?.data.error);
                } else if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Unknown error');
                }
            } finally {
                setLoading(false);
            }
        },
        [serviceFunction],
    );

    return { data, loading, error, request };
};
