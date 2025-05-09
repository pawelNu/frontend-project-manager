import polyglotI18nProvider from 'ra-i18n-polyglot';
import { Admin, CustomRoutes, Resource, localStorageStore, useStore, StoreContextProvider } from 'react-admin';
import { Route } from 'react-router';
import authProvider from './authProvider';
import categories from './pages/categories';
import { Dashboard } from './pages/dashboard';
import englishMessages from './i18n/en';
import invoices from './pages/invoices';
import products from './pages/products';
import reviews from './pages/reviews';
import Segments from './pages/segments/Segments';
import visitors from './pages/visitors';
import { themes, ThemeName } from './themes/themes';
import { CompanyList } from './pages/company/CompanyList';
import { CustomLayout } from './layout/Layout';
import { Login } from './layout/Login';
import orders from './pages/orders';
import { CompanyCreate } from './pages/company/CompanyCreate';
import { dataProvider } from './dataProvider/dataProviderRestApi';
import { CompanyEdit } from './pages/company/CompanyEdit';
import { CompanyShow } from './pages/company/CompanyShow';
import { CompanyAddressList } from './pages/company/address/CompanyAddressList';
import { CompanyAddressShow } from './pages/company/address/CompanyAddressShow';
import { CompanyAddressCreate } from './pages/company/address/CompanyAddressCreate';
import { CompanyAddressEdit } from './pages/company/address/CompanyAddressEdit';

const i18nProvider = polyglotI18nProvider(
    (locale) => {
        if (locale === 'fr') {
            return import('./i18n/fr').then((messages) => messages.default);
        }

        // Always fallback on english
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
            title="Posters Galore Admin"
            dataProvider={dataProvider}
            store={store}
            authProvider={authProvider}
            dashboard={Dashboard}
            loginPage={Login}
            layout={CustomLayout}
            i18nProvider={i18nProvider}
            disableTelemetry
            lightTheme={lightTheme}
            darkTheme={darkTheme}
            defaultTheme="light"
            requireAuth>
            <CustomRoutes>
                <Route path="/segments" element={<Segments />} />
            </CustomRoutes>
            <Resource name="customers" {...visitors} />
            <Resource name="orders" {...orders} />
            <Resource name="invoices" {...invoices} />
            <Resource name="products" {...products} />
            <Resource name="categories" {...categories} />
            <Resource name="reviews" {...reviews} />
            <Resource
                name="companies"
                list={CompanyList}
                show={CompanyShow}
                create={CompanyCreate}
                edit={CompanyEdit}
            />
            <Resource
                name="company-addresses"
                list={CompanyAddressList}
                show={CompanyAddressShow}
                create={CompanyAddressCreate}
                edit={CompanyAddressEdit}
            />
        </Admin>
    );
};

export const AppWrapper = () => (
    <StoreContextProvider value={store}>
        <App />
    </StoreContextProvider>
);
