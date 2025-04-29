const COMPANIES = '/companies';
const COMPANY_ADDRESSES = '/company-addresses';
const ADDRESSES = '/addresses';
const COMPANY_CONTACTS = '/company-contacts';
const COMPANY_CONTACT_EMPLOYEES = '/company-contact-employees';
const CONTACTS = '/contacts';
const CONTACT_EMPLOYESS = '/contact-employees';

export const routes = {
    page: {
        main: () => '/',
        placeholder: () => '/placeholder',
    },
    company: {
        name: () => `${COMPANIES}`.replace('/', ''),
        list: () => `${COMPANIES}`,
        show: (id: string | number) => `${COMPANIES}/${id}/show`,
    },
    companyAddress: {
        name: () => `${COMPANIES}`.replace('/', ''),
        list: () => `${COMPANY_ADDRESSES}`,
        show: (id: string | number) => `${COMPANY_ADDRESSES}/${id}/show`,
    },
};

export const jsonServerApi = 'http://localhost:8080';

export const api = {
    company: {
        list: (
            pageNumber: string | number = 0,
            pageSize: string | number = 10,
            query: Map<string, string[]> = new Map(),
        ) => {
            const pageNum = isNaN(Number(pageNumber));
            if (!pageNum) {
                pageNumber = Number(pageNumber) - 1;
            }
            const queryString =
                query.size > 0
                    ? `&${Array.from(query)
                          .map(([key, values]) => values.map((value) => `${key}=${value}`).join('&'))
                          .join('&')}`
                    : '';
            return `${COMPANIES}?pageNumber=${pageNumber}&pageSize=${pageSize}${queryString}`;
        },
        listFiltered: () => `${COMPANIES}/filter`,
        create: () => `${COMPANIES}`,
        edit: (id: string) => `${COMPANIES}/${id}`,
        id: (id: string) => `${COMPANIES}/${id}`,
        delete: (id: string) => `${COMPANIES}/${id}`,
    },
    companyAddresses: {
        companyId: (id: string) => `${COMPANY_ADDRESSES}?companyId=${id}`,
        create: () => `${COMPANY_ADDRESSES}`,
    },
    addresses: {
        id: (id: string) => `${ADDRESSES}/${id}`,
        create: () => `${ADDRESSES}`,
    },
    companyContacts: {
        companyId: (id: string) => `${COMPANY_CONTACTS}?companyId=${id}`,
        create: () => `${COMPANY_CONTACTS}`,
    },
    companyContactEmployees: {
        companyId: (id: string) => `${COMPANY_CONTACT_EMPLOYEES}?companyId=${id}`,
        create: () => `${COMPANY_CONTACT_EMPLOYEES}`,
    },
    contacts: {
        id: (id: string) => `${CONTACTS}/${id}`,
        create: () => `${CONTACTS}`,
    },
    contactEmployees: {
        id: (id: string) => `${CONTACT_EMPLOYESS}/${id}`,
        create: () => `${CONTACT_EMPLOYESS}`,
    },
};
