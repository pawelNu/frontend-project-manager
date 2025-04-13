import { CompanyDetails } from '../components/pages/company/CompanyDetails';
import { CompanyList } from '../components/pages/company/CompanyList';
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
];
