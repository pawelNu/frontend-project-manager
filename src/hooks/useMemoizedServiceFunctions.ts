import { AxiosResponse } from 'axios';
import { useCallback } from 'react';
import { ServiceFunction } from '../components/common/DynamicForm';

export const useMemoizedServiceFunctions = <ArgumentType, ResponseDataType>(
    postPutServiceFunction: ServiceFunction<ArgumentType, ResponseDataType>,
    getServiceFunction: (id: string) => Promise<AxiosResponse<ResponseDataType>>,
) => {
    const memoizedPostPutServiceFunction = useCallback(postPutServiceFunction, [postPutServiceFunction]);
    const memoizedGetServiceFunction = useCallback(getServiceFunction, [getServiceFunction]);

    return {
        memoizedPostPutServiceFunction,
        memoizedGetServiceFunction,
    };
};

export const useMemoizedGetServiceFunction = <ResponseDataType>(
    getServiceFunction: (pageNumber: number, pageSize: number) => Promise<AxiosResponse<ResponseDataType>>,
) => {
    const memoizedGetCompanies = useCallback(getServiceFunction, [getServiceFunction]);

    return memoizedGetCompanies;
};
