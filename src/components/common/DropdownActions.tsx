import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { DeleteButton, EditButton, ShowButton, useNotify } from 'react-admin';

export const DropdownActions = ({ record }: any) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const notify = useNotify();

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <Button onClick={handleClick} variant="contained">
                Actions
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleClose}>
                    <ShowButton record={record} />
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <EditButton record={record} />
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <DeleteButton
                        record={record}
                        redirect={false}
                        mutationOptions={{
                            onError: (error) => {
                                notify('Błąd usuwania: brak uprawnień', { type: 'error' });
                            },
                        }}
                    />
                </MenuItem>
            </Menu>
        </Box>
    );
};
