import { MainPage } from '../components/pages/MainPage';
import { routes } from '../components/routes';

export const routeConfig = [
    {
        path: routes.pages.main(),
        element: <MainPage />,
    },
];
