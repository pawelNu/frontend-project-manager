export const routes = {
    pages: {
        main: () => '/',
        placeholder: () => '/placeholder',
    },
    companies: {
        list: () => '/companies',
        create: () => '/companies/create',
        edit: (id: string) => `/companies/${id}/edit`,
        details: (id: string) => `/companies/${id}/details`,
        delete: (id: string) => `/companies/${id}/delete`,
    },
    users: {
        list: () => '/users',
        create: () => '/users/create',
        edit: (id: string) => `/users/${id}/edit`,
        details: (id: string) => `/users/${id}`,
    },
    products: {
        list: () => '/products',
        // itd.
    },
};
