import { useState, ReactElement } from 'react';
import { Box } from '@mui/material';
import { useTranslate, MenuItemLink, MenuProps, useSidebarState } from 'react-admin';
import clsx from 'clsx';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { SubMenu } from './SubMenu';
import { routes } from '../config/routes';
import KeyIcon from '@mui/icons-material/Key';
import CategoryIcon from '@mui/icons-material/Category';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

type MenuItem = {
    type: 'item';
    to: string;
    label: string;
    icon: ReactElement;
};

type MenuGroup = {
    type: 'submenu';
    name: string;
    label: string;
    icon: ReactElement;
    children: {
        to: string;
        label: string;
        icon: ReactElement;
    }[];
};

type MenuEntry = MenuItem | MenuGroup;

const menuConfig: MenuEntry[] = [
    {
        type: 'item',
        to: '/',
        label: 'ra.page.dashboard',
        icon: <DashboardIcon />,
    },
    {
        type: 'item',
        to: '/reviews',
        label: 'resources.reviews.name',
        icon: <BusinessIcon />,
    },
    {
        type: 'submenu',
        name: 'menuAuthority',
        label: 'Authority',
        icon: <KeyIcon />,
        children: [
            {
                to: routes.authority.list(),
                label: 'Authority',
                icon: <KeyIcon />,
            },
            {
                to: routes.employeeAuthority.list(),
                label: 'Employee Authorities',
                icon: <KeyIcon />,
            },
        ],
    },
    {
        type: 'submenu',
        name: 'menuCategory',
        label: 'Categories',
        icon: <CategoryIcon />,
        children: [
            {
                to: routes.category.list(),
                label: 'Categories',
                icon: <CategoryIcon />,
            },
            {
                to: routes.categoryValue.list(),
                label: 'Category values',
                icon: <CategoryIcon />,
            },
        ],
    },
    {
        type: 'submenu',
        name: 'menuCompanies',
        label: 'Companies',
        icon: <BusinessIcon />,
        children: [
            {
                to: routes.company.list(),
                label: 'Companies',
                icon: <BusinessIcon />,
            },
            {
                to: routes.companyAddress.list(),
                label: 'Company Addresses',
                icon: <LocationCityIcon />,
            },
            {
                to: routes.employee.list(),
                label: 'Employee',
                icon: <PersonIcon />,
            },
        ],
    },
    {
        type: 'submenu',
        name: 'menuProjects',
        label: 'Projects',
        icon: <AppRegistrationIcon />,
        children: [
            {
                to: routes.project.list(),
                label: 'Projects',
                icon: <AppRegistrationIcon />,
            },
        ],
    },
];

export const Menu = ({ dense = false }: MenuProps) => {
    const translate = useTranslate();
    const [open] = useSidebarState();

    const initialOpenState = Object.fromEntries(
        menuConfig.filter((entry): entry is MenuGroup => entry.type === 'submenu').map((entry) => [entry.name, true]),
    );

    const [state, setState] = useState<Record<string, boolean>>(initialOpenState);

    const handleToggle = (menuName: string) => {
        setState((prev) => ({
            ...prev,
            [menuName]: !prev[menuName],
        }));
    };

    return (
        <Box
            sx={{
                width: open ? 200 : 50,
                mt: 1,
                mb: 1,
                transition: (theme) =>
                    theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
            }}
            className={clsx({
                'RaMenu-open': open,
                'RaMenu-closed': !open,
            })}>
            {menuConfig.map((entry) => {
                if (entry.type === 'item') {
                    return (
                        <MenuItemLink
                            key={entry.to}
                            to={entry.to}
                            state={{ _scrollToTop: true }}
                            primaryText={translate(entry.label, { smart_count: 2 })}
                            leftIcon={entry.icon}
                            dense={dense}
                        />
                    );
                }

                return (
                    <SubMenu
                        key={entry.name}
                        handleToggle={() => handleToggle(entry.name)}
                        isOpen={state[entry.name]}
                        name={entry.label}
                        icon={entry.icon}
                        dense={dense}>
                        {entry.children.map((child) => (
                            <MenuItemLink
                                key={child.to}
                                to={child.to}
                                state={{ _scrollToTop: true }}
                                primaryText={translate(child.label, { smart_count: 2 })}
                                leftIcon={child.icon}
                                dense={dense}
                            />
                        ))}
                    </SubMenu>
                );
            })}
        </Box>
    );
};
