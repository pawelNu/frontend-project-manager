import { useNotify, useRedirect } from 'react-admin';

export const useNotFoundErrorHandler = (redirectTo: string) => {
    const notify = useNotify();
    const redirect = useRedirect();

    return (error: any) => {
        console.error('Standard onError:', error);
        notify(`Could not load page: ${error.message}`, { type: 'error' });
        redirect(redirectTo);
    };
};
