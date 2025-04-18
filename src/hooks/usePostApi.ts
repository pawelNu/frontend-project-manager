import { useCallback } from 'react';
import axios, { AxiosResponse } from 'axios';
import { SubmitResponse } from '../components/common/Form';

export const usePostApi = <ArgumentType, ResponseDataType>(
    serviceFunction: (values: ArgumentType) => Promise<AxiosResponse<ResponseDataType>>,
) => {
    const request = useCallback(
        async (args: ArgumentType): Promise<SubmitResponse<ResponseDataType>> => {
            try {
                const response = await serviceFunction(args);
                return { success: true, data: response.data };
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    if (err.response?.data?.errors) {
                        const errorData = err.response.data.errors;
                        const formattedErrors: { [key: string]: string } = {};

                        Object.entries(errorData).forEach(([field, messages]) => {
                            formattedErrors[field] = (messages as string[]).join(', ');
                        });

                        return { success: false, errors: formattedErrors };
                    } else if (err.response?.data?.error) {
                        const errorMessage = `${err.message}: ${err.response.data.error}`;
                        return { success: false, error: errorMessage };
                    } else {
                        console.log(err);
                        return { success: false, error: `Unexpected axios error occurred: ${err}` };
                    }
                }

                return { success: false, error: `Unknown error occurred: ${err}` };
            }
        },
        [serviceFunction],
    );

    return { request };
};
