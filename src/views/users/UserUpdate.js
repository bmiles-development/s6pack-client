import React, { useEffect, useState } from 'react';
import { store } from '../../store';
import { CardHeader, Grid, Typography, Container, Card, CardContent, Box, CardActions } from '@mui/material';
import MainCard from '../../view-components/MainCard';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteDialog from '../../view-components/DeleteDialog';
import { gql, useApolloClient, useMutation } from '@apollo/client';
import {
    CHANGE_STANDARD_USER_TO_ADMIN,
    CHANGE_ADMIN_USER_TO_STANDARD,
    ACTIVATE_USER,
    DEACTIVATE_USER,
    DELETE_ADMIN_USER,
    DELETE_STANDARD_USER
} from '../../graphql/mutations';
import { addSnackBarMessage } from '../../store/reducers/snackBarMessages';
import { setTotalActiveUsers } from '../../store/reducers/plan';

export default function UserUpdate() {
    let navigate = useNavigate();
    const [maxedUsers, setMaxedUsers] = useState(false);
    const maxPlanUsers = store.getState().plan.maxPlanUsers.payload;
    const totalActiveUsers = store.getState().plan.totalActiveUsers.payload;
    console.log(totalActiveUsers);
    console.log(maxPlanUsers);

    function navigateAndSnackbarUserStatus(user) {
        store.dispatch(addSnackBarMessage('User ' + user.email + ' updated successfully.'));
        navigate('/users/');
    }

    function navigateAndSnackbarDeleteStatus(user) {
        store.dispatch(addSnackBarMessage('User ' + user.email + ' deleted successfully.'));
        navigate('/users/');
    }

    function navigateAndSnackbarActiveStatus(user) {
        const newStatus = user.enabled ? 'Deactivated' : 'Activated';
        store.dispatch(addSnackBarMessage('User ' + user.email + ' ' + newStatus + '.'));
        navigate('/users/');
    }

    const { id } = useParams();
    const client = useApolloClient();
    let user = client.readFragment({
        id: 'User:' + id,
        fragment: gql`
            fragment MyUser on User {
                email
                enabled
                id
                group
                created
                modified
                status
            }
        `
    });
    user = !user ? '' : user; // user === null doesn't trigger useEffect()
    useEffect(() => {
        if (user === '') {
            navigate('/users/');
        }
        if (totalActiveUsers >= maxPlanUsers) {
            setMaxedUsers(true);
        }
    }, [user, navigate, totalActiveUsers, maxPlanUsers, maxedUsers]);

    const [deactivateUser, { loading: deactivationLoading }] = useMutation(gql(DEACTIVATE_USER), {
        onCompleted: () => {
            navigateAndSnackbarActiveStatus(user);
            store.dispatch(setTotalActiveUsers(totalActiveUsers - 1));
        }
    });
    const [activateUser, { loading: activationLoading }] = useMutation(gql(ACTIVATE_USER), {
        onCompleted: () => {
            navigateAndSnackbarActiveStatus(user);
            store.dispatch(setTotalActiveUsers(totalActiveUsers + 1));
        }
    });
    const [changeStandardUserToAdmin, { loading: changeStandardUserToAdminLoading }] = useMutation(gql(CHANGE_STANDARD_USER_TO_ADMIN), {
        onCompleted: () => {
            navigateAndSnackbarUserStatus(user);
        }
    });
    const [changeAdminToStandardUser, { loading: changeAdminToStandardUserLoading }] = useMutation(gql(CHANGE_ADMIN_USER_TO_STANDARD), {
        onCompleted: () => {
            navigateAndSnackbarUserStatus(user);
        }
    });

    const [deleteAdminUser, { loading: deleteAdminUserLoading }] = useMutation(gql(DELETE_ADMIN_USER), {
        update: (cache, { data: { deleteAdminUser } }) => {
            const delRef = cache.identify(deleteAdminUser);
            cache.modify({
                fields: {
                    listUsers(existingUsers = []) {
                        const returnUsers = [];
                        for (let i = 0; i < existingUsers.length; i++) {
                            if (existingUsers[i]['__ref'] !== delRef) {
                                returnUsers[i] = existingUsers[i];
                            }
                        }
                        return returnUsers;
                    }
                }
            });
            cache.evict({
                id: delRef
            });
            cache.gc();
            navigateAndSnackbarDeleteStatus(user);
        }
    });

    const [deleteStandardUser, { loading: deleteStandardUserLoading }] = useMutation(gql(DELETE_STANDARD_USER), {
        update: async (cache, { data: { deleteStandardUser } }) => {
            const delRef = cache.identify(deleteStandardUser);
            cache.modify({
                fields: {
                    listUsers(existingUsers = []) {
                        const returnUsers = [];
                        for (let i = 0; i < existingUsers.length; i++) {
                            console.log(typeof existingUsers[i]);
                            if (typeof existingUsers[i] != 'undefined') {
                                if (existingUsers[i]['__ref'] !== delRef) {
                                    returnUsers[i] = existingUsers[i];
                                }
                            }
                        }
                        return returnUsers;
                    }
                }
            });
            cache.evict({
                id: delRef
            });
            cache.gc();
            navigateAndSnackbarDeleteStatus(user);
        }
    });
    return (
        <MainCard title="Modify User">
            <Container maxWidth="md" component="main">
                <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
                    <Grid item key={user.id} xs={12} sm={8} md={6}>
                        <Card>
                            <CardHeader
                                title={user.group}
                                subheader={user.enabled ? 'Active' : 'Inactive'}
                                titleTypographyProps={{ align: 'left' }}
                                //action={user.title === 'Pro' ? <StarIcon /> : null};
                                subheaderTypographyProps={{
                                    align: 'left'
                                }}
                                action={
                                    <DeleteDialog
                                        title={'Delete User'}
                                        noun={'user ' + user?.email}
                                        loading={deleteAdminUserLoading || deleteStandardUserLoading}
                                        onDelete={() => {
                                            user.group == 'Admin'
                                                ? deleteAdminUser({ variables: { id: user.id } })
                                                : deleteStandardUser({ variables: { id: user.id } });
                                        }}
                                    />
                                }
                                sx={{
                                    backgroundColor: (theme) =>
                                        user.enabled === false
                                            ? theme.palette.secondary.lighter
                                            : theme.palette.mode === 'light'
                                              ? theme.palette.primary[100]
                                              : theme.palette.primary[700]
                                }}
                            />
                            <CardContent>
                                <Grid container justifyContent="flex-end">
                                    <LoadingButton
                                        loading={deactivationLoading || activationLoading}
                                        size="small"
                                        disabled={maxedUsers && user.enabled === false}
                                        onClick={() => {
                                            user.enabled == false
                                                ? activateUser({ variables: { id: user.id } })
                                                : deactivateUser({ variables: { id: user.id } });
                                        }}
                                        variant={'outlined'}
                                    >
                                        {user.enabled === false ? 'Activate User' : 'Deactivate User'}
                                    </LoadingButton>
                                </Grid>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'left',
                                        alignItems: 'baseline',
                                        mb: 2
                                    }}
                                >
                                    <Typography component="h3" variant="h5" color="text.primary">
                                        {user.email}
                                    </Typography>
                                </Box>
                            </CardContent>
                            <CardActions>
                                {user.group != 'Owner' ? (
                                    <LoadingButton
                                        fullWidth
                                        loading={changeStandardUserToAdminLoading || changeAdminToStandardUserLoading}
                                        disabled={user.enabled === false}
                                        onClick={() => {
                                            user.group == 'Admin'
                                                ? changeAdminToStandardUser({ variables: { id: user.id } })
                                                : changeStandardUserToAdmin({ variables: { id: user.id } });
                                        }}
                                        variant={'outlined'}
                                    >
                                        {user.group == 'Admin' ? 'Change to Standard User' : 'Change To Admin'}
                                    </LoadingButton>
                                ) : (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'left',
                                            alignItems: 'baseline',
                                            p: 2.3
                                        }}
                                    ></Box>
                                )}
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </MainCard>
    );
}
