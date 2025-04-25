import * as React from 'react';
import { Layout } from 'react-admin';

import { CustomAppBar } from './AppBar';
import { Menu } from './Menu';

export const CustomLayout = ({ children }: { children: React.ReactNode }) => (
    <Layout appBar={CustomAppBar} menu={Menu}>
        {children}
    </Layout>
);
