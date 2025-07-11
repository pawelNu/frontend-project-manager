import polyglotI18nProvider from 'ra-i18n-polyglot';
import { Admin, Resource, localStorageStore, useStore, StoreContextProvider, CustomRoutes } from 'react-admin';
import englishMessages from './i18n/en';
import { themes, ThemeName } from './themes/themes';
import { CompanyList } from './pages/company/CompanyList';
import { CustomLayout } from './layout/Layout';
import { Login } from './layout/Login';
import { CompanyCreate } from './pages/company/CompanyCreate';
import { dataProvider } from './dataProvider/dataProviderRestApi';
import { CompanyEdit } from './pages/company/CompanyEdit';
import { CompanyShow } from './pages/company/CompanyShow';
import { CompanyAddressList } from './pages/company/address/CompanyAddressList';
import { CompanyAddressShow } from './pages/company/address/CompanyAddressShow';
import { CompanyAddressCreate } from './pages/company/address/CompanyAddressCreate';
import { CompanyAddressEdit } from './pages/company/address/CompanyAddressEdit';
import { routes } from './config/routes';
import { Dashboard } from './pages/dashboard/Dashboard';
import { authProvider } from './authProvider';
import { EmployeeList } from './pages/company/employee/EmployeeList';
import { EmployeeShow } from './pages/company/employee/EmployeeShow';
import { EmployeeCreate } from './pages/company/employee/EmployeeCreate';
import { EmployeeEdit } from './pages/company/employee/EmployeeEdit';
import { AuthorityList } from './pages/authority/AuthorityList';
import { AuthorityShow } from './pages/authority/AuthorityShow';
import { AuthorityCreate } from './pages/authority/AuthorityCreate';
import { AuthorityEdit } from './pages/authority/AuthorityEdit';
import { CategoryCreate } from './pages/category/CategoryCreate';
import { CategoryEdit } from './pages/category/CategoryEdit';
import { CategoryList } from './pages/category/CategoryList';
import { CategoryShow } from './pages/category/CategoryShow';
import { CategoryValueCreate } from './pages/category/values/CategoryValueCreate';
import { CategoryValueEdit } from './pages/category/values/CategoryValueEdit';
import { CategoryValueList } from './pages/category/values/CategoryValueList';
import { CategoryValueShow } from './pages/category/values/CategoryValueShow';

const i18nProvider = polyglotI18nProvider(
    (locale) => {
        if (locale === 'fr') {
            return import('./i18n/fr').then((messages) => messages.default);
        }

        return englishMessages;
    },
    'en',
    [
        { locale: 'en', name: 'English' },
        { locale: 'fr', name: 'Français' },
    ],
);

const store = localStorageStore(undefined, 'ProjectManager');

const App = () => {
    const [themeName] = useStore<ThemeName>('themeName', 'soft');
    const lightTheme = themes.find((theme) => theme.name === themeName)?.light;
    const darkTheme = themes.find((theme) => theme.name === themeName)?.dark;
    return (
        <Admin
            title="Project Manager"
            dataProvider={dataProvider}
            store={store}
            authProvider={authProvider}
            dashboard={Dashboard}
            loginPage={Login}
            layout={CustomLayout}
            // i18nProvider={i18nProvider}
            disableTelemetry
            lightTheme={lightTheme}
            darkTheme={darkTheme}
            defaultTheme="dark"
            requireAuth>
            <Resource
                name={routes.authority.name()}
                list={AuthorityList}
                show={AuthorityShow}
                create={AuthorityCreate}
                edit={AuthorityEdit}
            />
            <Resource
                name={routes.category.name()}
                list={CategoryList}
                show={CategoryShow}
                create={CategoryCreate}
                edit={CategoryEdit}
            />
            <Resource
                name={routes.categoryValue.name()}
                list={CategoryValueList}
                show={CategoryValueShow}
                create={CategoryValueCreate}
                edit={CategoryValueEdit}
            />
            <Resource
                name={routes.company.name()}
                list={CompanyList}
                show={CompanyShow}
                create={CompanyCreate}
                edit={CompanyEdit}
            />
            <Resource
                name={routes.companyAddress.name()}
                list={CompanyAddressList}
                show={CompanyAddressShow}
                create={CompanyAddressCreate}
                edit={CompanyAddressEdit}
            />
            <Resource
                name={routes.employee.name()}
                list={EmployeeList}
                show={EmployeeShow}
                create={EmployeeCreate}
                edit={EmployeeEdit}
            />
        </Admin>
    );
};

export const AppWrapper = () => (
    <StoreContextProvider value={store}>
        <App />
    </StoreContextProvider>
);

// TODO feat ui for api employee_authorities
// TODO feat ui for api projects
// TODO feat ui for api project_steps
// TODO feat ui for api project_step_comments
// TODO feat ui for api tickets
// TODO feat ui for api attachments
// TODO feat ui for api ticket_histories
