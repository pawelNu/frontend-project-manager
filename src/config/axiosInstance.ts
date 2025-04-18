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
        return Promise.reject(error);
    },
);
