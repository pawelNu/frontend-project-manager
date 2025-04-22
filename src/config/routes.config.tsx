import { CompanyCreate } from '../components/pages/company/CompanyCreate';
import { CompanyDetails } from '../components/pages/company/CompanyDetails';
import { CompanyEdit } from '../components/pages/company/CompanyEdit';
import { CompanyList } from '../components/pages/company/CompanyList';
import { CompanyTable } from '../components/pages/company/CompanyTable';
import { MainPage } from '../components/pages/MainPage';
import { routes } from '../components/routes';

const pageNumber = ':pageNumber';
const pageSize = ':pageSize';
const id = ':id';

export const routeConfig = [
    {
        path: routes.page.main(),
        element: <MainPage />,
    },
    {
        path: routes.company.list(pageNumber, pageSize),
        element: <CompanyList />,
    },
    {
        path: routes.company.details(id),
        element: <CompanyDetails />,
    },
    {
        path: routes.company.create(),
        element: <CompanyCreate />,
    },
    {
        path: routes.company.edit(id),
        element: <CompanyEdit />,
    },
    {
        path: routes.user.list(),
        element: <CompanyTable />,
    },
];
