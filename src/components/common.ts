import { TSidebarItem } from './layout/Sidebar';
import { routes } from './routes';

export const sidebarElements: TSidebarItem[] = [
    {
        label: 'Companies',
        subMenu: [
            {
                label: 'All companies',
                linkTo: routes.companies.list(),
            },
            {
                label: 'Add company',
                linkTo: routes.companies.create(),
            },
            {
                label: 'Manage Companies',
                subMenu: [
                    {
                        label: 'Company Details',

                        subMenu: [
                            { label: 'Details', linkTo: routes.companies.details('1') },
                            { label: 'Delete', linkTo: routes.companies.delete('1') },
                        ],
                    },
                    {
                        label: 'Delete Company',
                        linkTo: routes.companies.delete('1'),
                    },
                ],
            },
        ],
    },
    {
        label: 'Account',
        subMenu: [
            {
                label: 'New...',
                linkTo: routes.pages.placeholder(),
            },
            {
                label: 'Profile',
                linkTo: routes.pages.placeholder(),
            },
            {
                label: 'Settings',
                linkTo: routes.pages.placeholder(),
            },
            {
                label: 'Security',
                subMenu: [
                    {
                        label: 'Change Password',
                        linkTo: routes.pages.placeholder(),
                    },
                    {
                        label: 'Two-Factor Authentication',
                        linkTo: routes.pages.placeholder(),
                    },
                ],
            },
            {
                label: 'Sign out',
                linkTo: routes.pages.placeholder(),
            },
        ],
    },
];
