import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';
import HeaderContent from '../../../views/layout/MainLayout/Header/HeaderContent';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useTheme } from '@emotion/react';

const RightLink = styled(Link)(({ theme }) => ({
    fontSize: 16,
    color: theme.palette.common.white,
    ml: 3,
    [theme.breakpoints.up('xs')]: {
        fontSize: '0.8rem',
        paddingRight: '12px'
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '1rem',
        paddingRight: '18px'
    }
}));

function AppAppBar() {
    const { authStatus } = useAuthenticator((context) => [context.authStatus]);
    const theme = useTheme();
    return (
        <div>
            <AppBar position="fixed">
                <Toolbar>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, flex: 1 }} />
                    <Link
                        variant="h6"
                        underline="none"
                        color={theme.palette.common.white}
                        href="/"
                        sx={{ fontSize: { xs: '2rem', md: '3rem' } }}
                    >
                        {'stations'}
                    </Link>
                    {authStatus !== 'authenticated' ? (
                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                            <RightLink color="inherit" variant="h6" underline="none" href="/login/">
                                {'Sign In'}
                            </RightLink>
                            <RightLink color="inherit" variant="h6" underline="none" href="/register/">
                                {'Sign Up'}
                            </RightLink>
                            <RightLink color="inherit" variant="h6" underline="none" href="/#contact">
                                {'Contact'}
                            </RightLink>
                        </Box>
                    ) : (
                        <HeaderContent />
                    )}
                </Toolbar>
            </AppBar>
            <Toolbar />
        </div>
    );
}

export default AppAppBar;
