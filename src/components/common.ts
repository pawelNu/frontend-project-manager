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

export type ErrorResponse = {
    message: string;
    details?: string;
};

export type Result<T> = { success: true; data: T } | { success: false; error: ErrorResponse };

export type PaginatedResponse<T> = {
    first: number;
    prev: number | null;
    next: number | null;
    last: number;
    pages: number;
    items: number;
    data: T[];
};
