
import { Typography } from '@mui/material';
import { Login as RaLogin, LoginForm } from 'react-admin';

export const Login = () => (
    <RaLogin sx={{ background: 'none' }}>
        <Typography color="text.disabled" textAlign="center">
            Hint: test / test
        </Typography>
        <LoginForm />
    </RaLogin>
);


