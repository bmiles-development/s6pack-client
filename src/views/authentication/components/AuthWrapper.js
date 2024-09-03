import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import { Box, ButtonBase, Grid, useTheme } from '@mui/material';

// project import
import Logo from '../../../view-components/Logo';
import AuthFooter from '../../../view-components/cards/AuthFooter';

// assets
import AuthBackground from '../../../assets/images/auth/AuthBackground';
import { Link } from 'react-router-dom';
import MainCard from '../../../view-components/MainCard';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children }) => {
    const theme = useTheme();
    return (
        <Box sx={{ minHeight: '100vh' }}>
            <AuthBackground />
            <Grid
                container
                direction="column"
                justifyContent="flex-end"
                sx={{
                    minHeight: '100vh'
                }}
            >
                <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>
                    <ButtonBase disableRipple component={Link} to="/">
                        <Logo />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12}>
                    <Grid
                        item
                        xs={12}
                        container
                        justifyContent="center"
                        alignItems="center"
                        sx={{ minHeight: { xs: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
                    >
                        <Grid item>
                            <MainCard
                                sx={{
                                    maxWidth: { xs: 500, lg: 575 },
                                    '& > *': {
                                        flexGrow: 1,
                                        flexBasis: '100%'
                                    },
                                    backgroundColor: theme.palette.common.white
                                }}
                                content={false}
                                border={false}
                                boxShadow
                            >
                                <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }} width={500} height={500}>
                                    {children}
                                </Box>
                            </MainCard>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid>
            </Grid>
        </Box>
    );
};

AuthWrapper.propTypes = {
    children: PropTypes.node
};

export default AuthWrapper;
