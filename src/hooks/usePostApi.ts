import { useCallback, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { SubmitResponse } from '../components/common/DynamicForm';

export const usePostApi = <ArgumentType, ResponseDataType>(
    serviceFunction: (id: string | undefined, values: ArgumentType) => Promise<AxiosResponse<ResponseDataType>>,
) => {
    const [loading, setLoading] = useState(false);
    const request = useCallback(
        async (id: string | undefined, args: ArgumentType): Promise<SubmitResponse<ResponseDataType>> => {
            setLoading(true);
            try {
                const response = await serviceFunction(id, args);

                return { success: true, data: response.data };
            } catch (err) {
                console.log(' err:', err);
                if (axios.isAxiosError(err)) {
                    if (err.response?.data?.violations) {
                        const errorData = err.response.data.violations;
                        console.log(JSON.stringify(errorData, null, 2));
                        const formattedErrors: { [key: string]: string } = {};

                        errorData.forEach((violation: { field: string; message: string }) => {
                            const { field, message } = violation;

                            if (formattedErrors[field]) {
                                formattedErrors[field] += `, ${message}`;
                            } else {
                                formattedErrors[field] = message;
                            }
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
            } finally {
                setLoading(false);
            }
        },
        [serviceFunction],
    );

    return { request, loading };
};
