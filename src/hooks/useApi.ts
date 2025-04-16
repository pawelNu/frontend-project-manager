import { useCallback, useState } from 'react';
import { AxiosResponse } from 'axios';

type UseApiReturn<TData, TArgs extends readonly unknown[]> = {
    data: TData | null;
    loading: boolean;
    error: string | null;
    request: (...args: TArgs) => Promise<void>;
};

export const useApi = <TData, TArgs extends readonly unknown[]>(
    serviceFunction: (...args: TArgs) => Promise<AxiosResponse<TData>>,
): UseApiReturn<TData, TArgs> => {
    const [data, setData] = useState<TData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const request = useCallback(
        async (...args: TArgs): Promise<void> => {
            setLoading(true);
            setError(null);
            try {
                const response = await serviceFunction(...args);
                setData(response.data);
            } catch (err) {
                if (err instanceof Error) {
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
