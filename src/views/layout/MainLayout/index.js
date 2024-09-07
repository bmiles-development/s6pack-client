import React from 'react';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../../store';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Toolbar, useMediaQuery } from '@mui/material';

// project import
import Drawer from './Drawer';
import Header from './Header';
import navigation from '../../../view-components/menu-items';
import Breadcrumbs from '../../../view-components/@extended/Breadcrumbs';
import Snackbar from '../../../views/landing/components/Snackbar';

import { Auth } from 'aws-amplify';
import { PLAN_MODIFIED, PLAN_CANCELED, ACCOUNT_DELETED } from '../../../graphql/subscriptions';
import { addSnackBarMessage, clearSnackBarMessage } from '../../../store/reducers/snackBarMessages';
import { gql, useApolloClient, useSubscription } from '@apollo/client';

// types
import { openDrawer } from '../../../store/reducers/menu';
import { USER_ADDED, USER_DELETED } from '../../../graphql/subscriptions';
import { SubscriptionEventBus } from '../../../utils/subscriptionEventBus';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const matchDownLG = useMediaQuery(theme.breakpoints.down('xl'));
    const [tenantId, setTenantId] = useState('');
    const { drawerOpen } = useSelector((state) => state.menu);
    const client = useApolloClient();
    const navigate = useNavigate();

    const [snackBarOpen, setSnackBarOpen] = useState(false);

    let snackBarMessage = useSelector((state) => state.snackBarMessages.snackBarMessage);
    let snackBarMessageType = useSelector((state) => state.snackBarMessages.snackBarMessageType);

    const handleSnackBarClose = () => {
        setSnackBarOpen(false);
        store.dispatch(clearSnackBarMessage());
    };

    // drawer toggler
    const [open, setOpen] = useState(drawerOpen);
    const handleDrawerToggle = () => {
        setOpen(!open);
        dispatch(openDrawer({ drawerOpen: !open }));
    };

    useEffect(() => {
        if (open !== drawerOpen) setOpen(drawerOpen);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [drawerOpen]);

    // set media wise responsive drawer
    useEffect(() => {
        setOpen(!matchDownLG);
        dispatch(openDrawer({ drawerOpen: !matchDownLG }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownLG]);

    useEffect(() => {
        (async () => {
            if (snackBarMessage != '') {
                setSnackBarOpen(true);
            } else {
                setSnackBarOpen(false);
            }
            try {
                const getTenantId = await Auth.currentSession().then((data) => data.idToken.payload.name);
                setTenantId(getTenantId);

                SubscriptionEventBus.prepare('USER_ADDED', async () => {
                    const observer = client.subscribe({
                        query: gql(USER_ADDED),
                        variables: { tenantId: getTenantId }
                    });
                    observer.subscribe((results) => {
                        client.cache.modify({
                            fields: {
                                listUsers(existingUserRefs = []) {
                                    const newUserRef = client.cache.writeFragment({
                                        data: results.data.userAdded,
                                        fragment: gql`
                                            fragment newUser on User {
                                                id
                                                email
                                                enabled
                                                group
                                                created
                                                modified
                                            }
                                        `
                                    });
                                    existingUserRefs = existingUserRefs.filter((val) => val);
                                    for (let i = 0; i < existingUserRefs.length; i++) {
                                        if (existingUserRefs[i]['__ref'] == newUserRef['__ref']) {
                                            return existingUserRefs;
                                        }
                                    }
                                    return [...existingUserRefs, newUserRef];
                                }
                            }
                        });
                    });

                    return observer;
                });

                SubscriptionEventBus.prepare('USER_DELETED', async () => {
                    const observer = client.subscribe({
                        query: gql(USER_DELETED),
                        variables: { tenantId: getTenantId }
                    });
                    observer.subscribe((results) => {
                        const deleteUserRef = client.cache.identify(results.data.userDeleted);
                        client.cache.modify({
                            fields: {
                                listUsers(existingUserRefs = []) {
                                    existingUserRefs = existingUserRefs.filter((val) => val);
                                    const returnUserRefs = [];
                                    for (let i = 0; i < existingUserRefs.length; i++) {
                                        if (existingUserRefs[i]['__ref'] !== deleteUserRef) {
                                            returnUserRefs[i] = existingUserRefs[i];
                                        }
                                    }
                                    return returnUserRefs;
                                }
                            }
                        });
                        client.cache.evict({
                            id: deleteUserRef
                        });
                        client.cache.gc();
                    });

                    return observer;
                });
            } catch (error) {
                console.log(error);
            }
        })();
    }, [snackBarMessage, open, client]);

    async function triggerTokenRefresh() {
        try {
            const cognitoUser = await Auth.currentAuthenticatedUser();
            const currentSession = await Auth.currentSession();
            cognitoUser.refreshSession(currentSession.refreshToken, () => {});
        } catch (e) {
            console.log('Unable to refresh Token', e);
        }
    }

    useSubscription(gql(PLAN_MODIFIED), {
        variables: { id: tenantId },
        onData: () => {
            triggerTokenRefresh();
            store.dispatch(addSnackBarMessage('Your subscription plan has updated. Changes are reflected immediately.'));
            setSnackBarOpen(true);
        },
        onError: (error) => {
            console.log(tenantId);
            console.warn(error);
        }
    });

    useSubscription(gql(ACCOUNT_DELETED), {
        variables: { id: tenantId },
        onData: () => {
            console.log('got here');
            store.dispatch(addSnackBarMessage('Account has been deleted. You have been logged out.'));
            setSnackBarOpen(true);
            triggerTokenRefresh();
            navigate('/login');
        },
        onError: (error) => {
            console.log(tenantId);
            console.warn(error);
        }
    });

    useSubscription(gql(PLAN_CANCELED), {
        variables: { id: tenantId },
        onData: () => {
            triggerTokenRefresh();
            store.dispatch(addSnackBarMessage('Your subscription has been canceled.'));
            setSnackBarOpen(true);
            navigate('/login');
        },
        onError: (error) => {
            console.log(tenantId);
            console.warn(error);
        }
    });

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Header open={open} handleDrawerToggle={handleDrawerToggle} />
            <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                <Toolbar />
                <Breadcrumbs navigation={navigation} divider={false} />
                <Outlet />
            </Box>
            <Snackbar open={snackBarOpen} closeFunc={handleSnackBarClose} message={snackBarMessage} alertColor={snackBarMessageType} />
        </Box>
    );
};

export default MainLayout;
