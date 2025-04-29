import { useState } from 'react';
import { Box } from '@mui/material';
import { useTranslate, DashboardMenuItem, MenuItemLink, MenuProps, useSidebarState } from 'react-admin';
import clsx from 'clsx';
import { SubMenu } from './SubMenu';
import BusinessIcon from '@mui/icons-material/Business';
import { routes } from '../config/routes';

type MenuName = 'menuCatalog' | 'menuSales' | 'menuCustomers' | 'menuCompanies';

export const Menu = ({ dense = false }: MenuProps) => {
    const [state, setState] = useState({
        menuCatalog: true,
        menuSales: true,
        menuCustomers: true,
        menuCompanies: true,
    });
    const translate = useTranslate();
    const [open] = useSidebarState();

    const handleToggle = (menu: MenuName) => {
        setState((state) => ({ ...state, [menu]: !state[menu] }));
    };

    return (
        <Box
            sx={{
                width: open ? 200 : 50,
                marginTop: 1,
                marginBottom: 1,
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
            <DashboardMenuItem />
            <MenuItemLink
                to="/reviews"
                state={{ _scrollToTop: true }}
                primaryText={translate(`resources.reviews.name`, {
                    smart_count: 2,
                })}
                leftIcon={<BusinessIcon />}
                dense={dense}
            />

            <SubMenu
                handleToggle={() => handleToggle('menuCompanies')}
                isOpen={state.menuCompanies}
                name="pos.menu.customers"
                icon={<BusinessIcon />}
                dense={dense}>
                <MenuItemLink
                    to={routes.company.list()}
                    state={{ _scrollToTop: true }}
                    primaryText={translate(`Companies`, {
                        smart_count: 2,
                    })}
                    leftIcon={<BusinessIcon />}
                    dense={dense}
                />
                <MenuItemLink
                    to={routes.companyAddress.list()}
                    state={{ _scrollToTop: true }}
                    primaryText={translate(`Company Addresses`, {
                        smart_count: 2,
                    })}
                    leftIcon={<BusinessIcon />}
                    dense={dense}
                />
            </SubMenu>
        </Box>
    );
};
