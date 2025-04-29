import { useNotify, useRedirect } from 'react-admin';

export const useNotFoundErrorHandler = (redirectTo: any) => {
    const notify = useNotify();
    const redirect = useRedirect();

    return (error: any) => {
        console.error('Standard onError:', error);
        notify(`Could not load post: ${error.message}`, { type: 'error' });
        redirect(redirectTo);
    };
};
