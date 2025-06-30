const AUTHORITIES = '/authorities';
const CATEGORIES = '/categories';
const COMPANIES = '/companies';
const COMPANY_ADDRESSES = '/company-addresses';
const EMPLOYEES = '/employees';

export const routes = {
    page: {
        main: () => '/',
        placeholder: () => '/placeholder',
    },
    authority: {
        name: () => `${AUTHORITIES}`.replace('/', ''),
        list: () => `${AUTHORITIES}`,
        show: (id: string | number) => `${AUTHORITIES}/${id}/show`,
    },
    category: {
        name: () => `${CATEGORIES}`.replace('/', ''),
        list: () => `${CATEGORIES}`,
        show: (id: string | number) => `${CATEGORIES}/${id}/show`,
    },
    company: {
        name: () => `${COMPANIES}`.replace('/', ''),
        list: () => `${COMPANIES}`,
        show: (id: string | number) => `${COMPANIES}/${id}/show`,
    },
    companyAddress: {
        name: () => `${COMPANY_ADDRESSES}`.replace('/', ''),
        list: () => `${COMPANY_ADDRESSES}`,
        show: (id: string | number) => `${COMPANY_ADDRESSES}/${id}/show`,
    },
    employee: {
        name: () => `${EMPLOYEES}`.replace('/', ''),
        list: () => `${EMPLOYEES}`,
        show: (id: string | number) => `${EMPLOYEES}/${id}/show`,
    },
};
