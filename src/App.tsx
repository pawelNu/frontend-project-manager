import polyglotI18nProvider from 'ra-i18n-polyglot';
import { Admin, localStorageStore, useStore, StoreContextProvider } from 'react-admin';
import englishMessages from './i18n/en';
import { themes, ThemeName } from './themes/themes';

import { CustomLayout } from './layout/Layout';
import { Login } from './layout/Login';

import { dataProvider } from './dataProvider/dataProviderRestApi';

import { Dashboard } from './pages/dashboard/Dashboard';
import { authProvider } from './authProvider';
import { AdminResources } from './AdminResources';

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
            {AdminResources}
        </Admin>
    );
};

export const AppWrapper = () => (
    <StoreContextProvider value={store}>
        <App />
    </StoreContextProvider>
);
