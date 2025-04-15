// import axios, { AxiosError, AxiosRequestConfig } from 'axios';
// import { jsonServerApi } from '../components/routes';

// type ApiResponse<T> = {
//     data?: T;
//     error?: string;
//     statusCode?: number;
//     errors?: Record<string, string[]>;
// };

// type ErrorResponse = {
//     message?: string;
//     errors?: Record<string, string[]>;
// };

// const axiosInstance = axios.create({
//     baseURL: jsonServerApi,
// });

// export const httpRequest = async <T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> => {
//     try {
//         const response = await axiosInstance(config);
//         return { data: response.data, statusCode: response.status };
//     } catch (error: unknown) {
//         const axiosError = error as AxiosError;

//         let errorMessage = 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.';
//         let statusCode: number | undefined;
//         let errors: Record<string, string[]> | undefined;

//         if (axiosError.response) {
//             statusCode = axiosError.response.status;
//             const responseData = axiosError.response.data as ErrorResponse;

//             errorMessage = responseData?.message || `Błąd ${statusCode}: ${axiosError.response.statusText}`;

//             errors = responseData?.errors || undefined;
//         } else if (axiosError.request) {
//             errorMessage = 'Brak odpowiedzi z serwera. Sprawdź połączenie internetowe.';
//         } else {
//             errorMessage = axiosError.message;
//         }

//         return {
//             data: undefined,
//             error: errorMessage,
//             statusCode,
//             errors,
//         };
//     }
// };

import axios from 'axios';
import { toast } from 'react-toastify';
import { jsonServerApi } from '../components/routes';
import { ERROR_MESSAGES } from './ERROR_MESSAGES';

export const axiosInstance = axios.create({
    baseURL: jsonServerApi,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        let message = ERROR_MESSAGES.GENERIC_ERROR;

        if (error.response) {
            const { status } = error.response;
            message = ERROR_MESSAGES[status as keyof typeof ERROR_MESSAGES] || ERROR_MESSAGES.GENERIC_ERROR;
        } else {
            message = ERROR_MESSAGES.NETWORK_ERROR;
        }

        toast.error(message);
        return Promise.reject(new Error(message));
    },
);
