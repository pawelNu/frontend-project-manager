import { useCallback, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

type UseGetApiReturn<ArgumentsType extends readonly unknown[], ResponseDataType> = {
    data: ResponseDataType | null;
    loading: boolean;
    error: string | null;
    request: (...args: ArgumentsType) => Promise<void>;
};

export const useFetchDataApi = <ArgumentsType extends readonly unknown[], ResponseDataType>(
    serviceFunction: (...args: ArgumentsType) => Promise<AxiosResponse<ResponseDataType>>,
): UseGetApiReturn<ArgumentsType, ResponseDataType> => {
    const [data, setData] = useState<ResponseDataType | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const request = useCallback(
        async (...args: ArgumentsType): Promise<void> => {
            setLoading(true);
            setError(null);
            try {
                const response = await serviceFunction(...args);
                console.log(' response:', response);
                setData(response.data);
            } catch (err) {
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
