import { TSidebarItem } from './layout/Sidebar';
import { routes } from './routes';

export const sidebarElements: TSidebarItem[] = [
    {
        label: 'Companies',
        subMenu: [
            {
                label: 'All companies',
                linkTo: routes.company.list(),
            },
            {
                label: 'Add company',
                linkTo: routes.company.create(),
            },
            {
                label: 'Manage Companies',
                subMenu: [
                    {
                        label: 'Company Details',

                        subMenu: [
                            { label: 'Details', linkTo: routes.company.details('1') },
                            { label: 'Delete', linkTo: routes.company.delete('1') },
                        ],
                    },
                    {
                        label: 'Delete Company',
                        linkTo: routes.company.delete('1'),
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
                linkTo: routes.page.placeholder(),
            },
            {
                label: 'Profile',
                linkTo: routes.page.placeholder(),
            },
            {
                label: 'Settings',
                linkTo: routes.page.placeholder(),
            },
            {
                label: 'Security',
                subMenu: [
                    {
                        label: 'Change Password',
                        linkTo: routes.page.placeholder(),
                    },
                    {
                        label: 'Two-Factor Authentication',
                        linkTo: routes.page.placeholder(),
                    },
                ],
            },
            {
                label: 'Sign out',
                linkTo: routes.page.placeholder(),
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

// TODO move to pagination component
export type PaginationType = {
    first: number;
    prev: number | null;
    current: number;
    next: number | null;
    last: number;
    pages: number;
    items: number;
    pageSize: number;
};

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms * 1000));
