export const routes = {
    page: {
        main: () => '/',
        placeholder: () => '/placeholder',
    },
    company: {
        list: (
            pageNumber: string | number = 1,
            pageSize: string | number = 10,
            query: Map<string, string[]> = new Map(),
        ) => {
            const queryString =
                query.size > 0
                    ? `?${Array.from(query)
                          .map(([key, values]) => values.map((value) => `${key}=${value}`).join('&'))
                          .join('&')}`
                    : '';
            return `/companies/page/${pageNumber}/size/${pageSize}${queryString}`;
        },
        create: () => '/companies/create',
        edit: (id: string) => `/companies/${id}/edit`,
        details: (id: string) => `/companies/${id}/details`,
        delete: (id: string) => `/companies/${id}/delete`,
    },
    user: {
        list: (pageNumber: string | number, pageSize: string | number) => `/users/page/${pageNumber}/size/${pageSize}`,
        create: () => '/users/create',
        edit: (id: string) => `/users/${id}/edit`,
        details: (id: string) => `/users/${id}`,
    },
    product: {
        list: (pageNumber: string | number, pageSize: string | number) =>
            `/products/page/${pageNumber}/size/${pageSize}`,
    },
};
