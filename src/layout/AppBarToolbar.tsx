import { LoadingIndicator } from 'react-admin';
// import { LocalesMenuButton } from 'react-admin';

import { ThemeSwapper } from '../themes/ThemeSwapper';

export const AppBarToolbar = () => (
    <>
        {/* <LocalesMenuButton /> */}
        <ThemeSwapper />
        <LoadingIndicator />
    </>
);
