import { AuthProvider } from 'react-admin';
import { apiUrl } from './dataProvider/dataProviderRestApi';

export const authProvider: AuthProvider = {
    login: async ({ username, password }) => {
        const request = new Request(`${apiUrl}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });

        const response = await fetch(request);

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const { jwtToken, roles, expireAt, id } = await response.json();

        // Zapisz dane do localStorage
        localStorage.setItem('jwt', jwtToken);
        localStorage.setItem('roles', JSON.stringify(roles));
        localStorage.setItem('userId', id);
        localStorage.setItem('expireAt', expireAt);

        return Promise.resolve();
    },

    logout: () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('roles');
        localStorage.removeItem('userId');
        localStorage.removeItem('expireAt');
        return Promise.resolve();
    },

    checkAuth: () => {
        const token = localStorage.getItem('jwt');
        const expireAt = localStorage.getItem('expireAt');

        if (!token || !expireAt) return Promise.reject();

        const now = new Date();
        const expiry = new Date(expireAt);

        if (now > expiry) {
            return Promise.reject(); // token wygasł
        }

        return Promise.resolve();
    },

    checkError: (error) => {
        const status = error.status;
        if (status === 401) {
            localStorage.removeItem('jwt');
        }
        return Promise.resolve();
    },

    getPermissions: () => {
        const roles = localStorage.getItem('roles');
        return roles ? Promise.resolve(JSON.parse(roles)) : Promise.resolve([]);
    },

    // FIXME wrong type
    getIdentity: () => {
        try {
            const id = localStorage.getItem('userId');
            const username = localStorage.getItem('username'); // jeśli chcesz przechowywać
            return Promise.resolve({ id, fullName: username });
        } catch (error) {
            return Promise.reject(error);
        }
    },
};
