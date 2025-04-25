import { AppBar, TitlePortal } from 'react-admin';
import { Box, useMediaQuery, Theme } from '@mui/material';

import { AppBarToolbar } from './AppBarToolbar';
import { Logo } from './Logo';

export const CustomAppBar = () => {
    const isLargeEnough = useMediaQuery<Theme>((theme) => theme.breakpoints.up('sm'));
    return (
        <AppBar color="secondary" toolbar={<AppBarToolbar />}>
            <TitlePortal />
            {isLargeEnough && <Logo />}
            {isLargeEnough && <Box component="span" sx={{ flex: 1 }} />}
        </AppBar>
    );
};
