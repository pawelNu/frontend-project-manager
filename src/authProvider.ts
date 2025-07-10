import { AuthProvider } from 'react-admin';
import { apiUrl } from './dataProvider/dataProviderRestApi';
import { jwtDecode } from 'jwt-decode';

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
        const payload = jwtDecode(jwtToken);
        localStorage.setItem('jwt', jwtToken);
        if (payload.sub) {
            localStorage.setItem('username', payload.sub);
        }
        localStorage.setItem('roles', JSON.stringify(roles));
        localStorage.setItem('userId', id);
        localStorage.setItem('expireAt', expireAt);

        return Promise.resolve();
    },

    logout: () => {
        clearAuthStorage();
        return Promise.resolve();
    },

    // FIXME when you go to /login,
    // it checks if there is a token and if there is not,
    // it returns to the /login and so on.
    checkAuth: () => {
        // if (window.location.hash.startsWith('#/login')) {
        //     return Promise.resolve();
        // }

        const token = localStorage.getItem('jwt');
        const expireAt = localStorage.getItem('expireAt');

        if (!token || !expireAt) {
            return Promise.reject();
        }

        const now = new Date();
        const expiry = new Date(expireAt);

        if (now > expiry) {
            {
                return Promise.reject();
            }
        }

        return Promise.resolve();
    },
    // checkAuth: () => {
    //     return Promise.resolve();
    // },

    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            clearAuthStorage();
            // WAŻNE: Zwróć Promise.reject() aby React Admin wiedział, że ma przekierować
            return Promise.reject();
        }
        return Promise.resolve();
    },

    getPermissions: () => {
        const roles = localStorage.getItem('roles');
        return roles ? Promise.resolve(JSON.parse(roles)) : Promise.resolve([]);
    },

    getIdentity: () => {
        const id = localStorage.getItem('userId');
        const username = localStorage.getItem('username');

        if (!id || !username) {
            return Promise.reject();
        }

        return Promise.resolve({
            id,
            fullName: username,
        });
    },
};

function clearAuthStorage() {
    localStorage.removeItem('username');
    localStorage.removeItem('jwt');
    localStorage.removeItem('roles');
    localStorage.removeItem('userId');
    localStorage.removeItem('expireAt');
}
