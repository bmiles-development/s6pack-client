// material-ui
import React from 'react';
import { useMediaQuery, Container, Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

const AuthFooter = () => {
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <Container maxWidth="xl">
            <Stack
                direction={matchDownSM ? 'column' : 'row'}
                justifyContent={matchDownSM ? 'center' : 'space-between'}
                spacing={2}
                textAlign={matchDownSM ? 'center' : 'inherit'}
            >
                <Typography variant="subtitle2" color="secondary" component="span">
                    &copy; stations and Mantis React Dashboard Template By&nbsp;
                    <Typography component={Link} variant="subtitle2" href="https://codedthemes.com" target="_blank" underline="hover">
                        CodedThemes
                    </Typography>
                </Typography>

                <Stack
                    direction={matchDownSM ? 'column' : 'row'}
                    spacing={matchDownSM ? 1 : 3}
                    textAlign={matchDownSM ? 'center' : 'inherit'}
                >
                    <Typography
                        variant="subtitle2"
                        color="secondary"
                        component={Link}
                        href="/privacy.html"
                        target="_blank"
                        underline="hover"
                    >
                        Privacy Policy
                    </Typography>
                    <Typography variant="subtitle2" color="secondary" component={Link} href="/#contact" target="_blank" underline="hover">
                        Contact
                    </Typography>
                </Stack>
            </Stack>
        </Container>
    );
};

export default AuthFooter;
