import { PaginationType } from './common/Pagination';
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
                            // { label: 'Delete', linkTo: routes.company.delete('1') },
                        ],
                    },
                    {
                        label: 'Delete Company',
                        // linkTo: routes.company.delete('1'),
                    },
                ],
            },
        ],
    },
    {
        label: 'Users',
        subMenu: [
            {
                label: 'User list',
                linkTo: routes.user.list(),
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
    type?: string;
};

export type PaginatedResponse<T> = {
    data: T[];
    page: PaginationType;
};

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms * 1000));

export type HasId<T> = T extends { id: string } ? T : never;

export const objectToString = (obj: object): string => {
    return Object.entries(obj)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
};
