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
        edit: (id: string) => `${jsonServerApi}/companies/edit/${id}`,
        details: (id: string) => `${jsonServerApi}/companies/details/${id}`,
    },
};

export const jsonServerApi = 'http://localhost:5000';

export const api = {
    company: {
        list: (
            pageNumber: string | number = 1,
            pageSize: string | number = 10,
            query: Map<string, string[]> = new Map(),
        ) => {
            const queryString =
                query.size > 0
                    ? `&${Array.from(query)
                          .map(([key, values]) => values.map((value) => `${key}=${value}`).join('&'))
                          .join('&')}`
                    : '';
            return `/companies?_page=${pageNumber}&_per_page=${pageSize}${queryString}`;
        },
        create: () => `/companies`,
        edit: (id: string) => `/companies/${id}/edit`,
        id: (id: string) => `/companies/${id}`,
        delete: (id: string) => `/companiess/${id}`,
    },
    companyAddresses: {
        companyId: (id: string) => `/company-addresses?companyId=${id}`,
        create: () => `/company-addresses`,
    },
    addresses: {
        id: (id: string) => `/addresses/${id}`,
        create: () => `/addresses`,
    },
    companyContacts: {
        companyId: (id: string) => `/company-contacts?companyId=${id}`,
        create: () => `/company-contacts`,
    },
    companyContactEmployees: {
        companyId: (id: string) => `/company-contact-employees?companyId=${id}`,
    },
    contacts: {
        id: (id: string) => `/contacts/${id}`,
        create: () => `/contacts`,
    },
    contactEmployees: {
        id: (id: string) => `/contact-employees/${id}`,
        create: () => `/contact-employees`,
    },
};
