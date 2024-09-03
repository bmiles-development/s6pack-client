import React, { useEffect, useState } from 'react';
import MainCard from '../../view-components/MainCard';
import { Button, Box, Alert } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { GET_CURRENT_AND_ALL_PLANS, LIST_USERS } from '../../graphql/queries';
import SkeletonPlan from '../../views/layout/skeletons/Plan';
import { Link, useNavigate } from 'react-router-dom';
import { Fab } from '@mui/material/index';
import AddIcon from '@mui/icons-material/Add';
import { gql, useQuery } from '@apollo/client';
import { SubscriptionEventBus } from '../../utils/subscriptionEventBus';
import { store } from '../../store';
import { setTotalActiveUsers, setMaxPlanUsers } from '../../store/reducers/plan';

const Users = () => {
    const [maxedUsers] = useState(false);

    let navigate = useNavigate();

    function selectUser(user) {
        const userDetailUri = '/user_update/' + user.id;
        navigate(userDetailUri);
    }

    useEffect(() => {
        (async () => {
            SubscriptionEventBus.subscribe('USER_ADDED');
            SubscriptionEventBus.subscribe('USER_DELETED');
        })();
    }, []);

    function CrudUsers() {
        const { loading, error, data } = useQuery(gql(LIST_USERS));
        const { loading: loading2, error: error2, data: tenantPlanData } = useQuery(gql(GET_CURRENT_AND_ALL_PLANS));

        if (loading || loading2) return <SkeletonPlan />;

        if (error) {
            if (error.graphQLErrors[0].errorType == 'Unauthorized') {
                return (
                    <Alert severity="warning" variant="outlined" sx={{ justifyContent: 'center', alignContent: 'center', m: 5 }}>
                        You must increase your plan to access this feature. Increase Users by{' '}
                        <Link to={'/plans'}>upgrading your plan here.</Link>{' '}
                    </Alert>
                );
            }
            return (
                <Alert severity="error" variant="filled">
                    {error.message}
                </Alert>
            );
        }

        if (error2) return `Error! ${error2.message}`;

        store.dispatch(setTotalActiveUsers(data.listUsers.filter((x) => x.enabled === true).length));
        store.dispatch(setMaxPlanUsers(Number(tenantPlanData.getTenant.plan.totalUsers)));
        return (
            <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
                {data.listUsers.map((user) => (
                    // Enterprise card is full width at sm breakpoint
                    <Grid item key={user.email} xs={12} sm={6} md={4}>
                        <Card>
                            <CardHeader
                                title={user.group}
                                subheader={user.enabled ? 'Active' : 'Inactive'}
                                titleTypographyProps={{ align: 'left' }}
                                //action={user.title === 'Pro' ? <StarIcon /> : null}
                                subheaderTypographyProps={{
                                    align: 'left'
                                }}
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
                                    <Button
                                        fullWidth
                                        onClick={() => {
                                            selectUser(user);
                                        }}
                                        variant="outlined"
                                    >
                                        Modify
                                    </Button>
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
                ))}
                <Grid item key="addUser" sx={{ justifyContent: 'center', alignContent: 'center', m: 5 }}>
                    {data.listUsers.length >= Number(tenantPlanData.getTenant.plan.totalUsers) ? (
                        <Alert severity="warning" variant="outlined">
                            You have reached the maximum Users for this Plan. Increase Users by{' '}
                            <Link to={'/plans'}>upgrading your plan here.</Link>{' '}
                        </Alert>
                    ) : (
                        <Fab
                            color="primary"
                            aria-label="add"
                            disabled={maxedUsers === true}
                            onClick={() => {
                                navigate('/user_create/');
                            }}
                        >
                            <AddIcon />
                        </Fab>
                    )}
                </Grid>
            </Grid>
        );
    }

    let mainCard = (
        <MainCard title={'Users'}>
            <CrudUsers></CrudUsers>
        </MainCard>
    );
    return mainCard;
};

export default Users;
