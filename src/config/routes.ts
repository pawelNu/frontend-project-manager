const AUTHORITIES = '/authorities';
const EMPLOYEE_AUTHORITIES = '/employee-authorities';
const CATEGORIES = '/categories';
const CATEGORY_VALUES = '/category-values';
const COMPANIES = '/companies';
const COMPANY_ADDRESSES = '/company-addresses';
const EMPLOYEES = '/employees';
const PROJECTS = '/projects';
const PROJECT_STEPS = '/project-steps';
const PROJECT_STEP_COMMENTS = '/project-step-comments';

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
    categoryValue: {
        name: () => `${CATEGORY_VALUES}`.replace('/', ''),
        list: () => `${CATEGORY_VALUES}`,
        show: (id: string | number) => `${CATEGORY_VALUES}/${id}/show`,
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
    employeeAuthority: {
        name: () => `${EMPLOYEE_AUTHORITIES}`.replace('/', ''),
        list: () => `${EMPLOYEE_AUTHORITIES}`,
        show: (id: string | number) => `${EMPLOYEE_AUTHORITIES}/${id}/show`,
    },
    project: {
        name: () => `${PROJECTS}`.replace('/', ''),
        list: () => `${PROJECTS}`,
        show: (id: string | number) => `${PROJECTS}/${id}/show`,
    },
    projectStep: {
        name: () => `${PROJECT_STEPS}`.replace('/', ''),
        list: () => `${PROJECT_STEPS}`,
        show: (id: string | number) => `${PROJECT_STEPS}/${id}/show`,
    },
    projectStepComment: {
        name: () => `${PROJECT_STEP_COMMENTS}`.replace('/', ''),
        list: () => `${PROJECT_STEP_COMMENTS}`,
        show: (id: string | number) => `${PROJECT_STEP_COMMENTS}/${id}/show`,
    },
};
