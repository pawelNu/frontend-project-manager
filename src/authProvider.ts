import { AuthProvider } from 'react-admin';
import { apiUrl } from './dataProvider/dataProviderRestApi';
import { jwtDecode } from 'jwt-decode';

const PREFIX = 'authProvider:';

function clearAuthStorage() {
    localStorage.removeItem('username');
    localStorage.removeItem('jwt');
    // jwtManager.eraseToken()
    localStorage.removeItem('roles');
    localStorage.removeItem('userId');
    localStorage.removeItem('expireAt');
}
// TODO move code method by method and check when login go to infinite loop
export const authProvider2: AuthProvider = {
    async login({ username, password }) {
        console.log(PREFIX + ' login:');
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
        // jwtManager.setToken(jwtToken);
        localStorage.setItem('jwt', jwtToken);
        if (payload.sub) {
            localStorage.setItem('username', payload.sub);
        }
        localStorage.setItem('roles', JSON.stringify(roles));
        localStorage.setItem('userId', id);
        localStorage.setItem('expireAt', expireAt);

        return Promise.resolve();
    },
    async checkError(error) {
        console.log(PREFIX + ' checkError:');
        const status = error.status;
        if (status === 401) {
            clearAuthStorage();
            throw new Error('Session expired');
        }
        if (status === 403) {
            throw new Error('Session expired');
        }
        // return Promise.resolve();
    },
    async checkAuth() {
        console.log(PREFIX + ' checkAuth:');
        if (!localStorage.getItem('username')) {
            throw new Error('Not authenticated');
        }
    },
    async logout() {
        console.log(PREFIX + ' logout:');
        clearAuthStorage();
        return Promise.resolve();
    },
    async getPermissions() {
        console.log(PREFIX + ' getPermissions:');
        const roles = localStorage.getItem('roles');
        return roles ? Promise.resolve(JSON.parse(roles)) : Promise.resolve([]);
    },
    async getIdentity() {
        console.log(PREFIX + ' getIdentity:');
        const id = localStorage.getItem('userId');
        const username = localStorage.getItem('username');

        if (!id || !username) {
            throw new Error('Not authenticated');
        }

        return Promise.resolve({
            id,
            fullName: username,
        });
    },
};

const authProvider = {
    async login({ username, password }) {
        if (username !== 'john' || password !== '123') {
            throw new Error('Login failed');
        }
        localStorage.setItem('username', username);
    },
    async checkError(error) {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            throw new Error('Session expired');
        }
        // other error codes (404, 500, etc): no need to log out
    },
    async checkAuth() {
        if (!localStorage.getItem('username')) {
            throw new Error('Not authenticated');
        }
    },
    async logout() {
        localStorage.removeItem('username');
    },
    async getIdentity() {
        const username = localStorage.getItem('username');
        return { id: username, fullName: username };
    },
};
