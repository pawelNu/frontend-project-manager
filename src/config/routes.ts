const COMPANIES = '/companies';
const COMPANY_ADDRESSES = '/company-addresses';
const EMPLOYEES = '/employees';

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
