import React from 'react';
import MainCard from '../../view-components/MainCard';
import { Container, Box, Alert, useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { GET_TENANT } from '../../graphql/queries';
import { gql, useMutation, useQuery } from '@apollo/client';
import SkeletonItem from '../../views/layout/skeletons/Item';
import { REACTIVATE_CANCELING_PAID_PLAN } from '../../graphql/mutations';
import { useNavigate } from 'react-router';
import { LoadingButton } from '@mui/lab';
import Moment from 'react-moment';

const PlanCancel = () => {
    const theme = useTheme();
    let navigate = useNavigate();

    function PlanCancelView() {
        const { loading, error, data } = useQuery(gql(GET_TENANT));
        const [reactivatedPlan, { loading: loading2 }] = useMutation(gql(REACTIVATE_CANCELING_PAID_PLAN), {
            update(cache) {
                cache.modify({
                    fields: {
                        getTenant() {
                            cancelPlanAt = null;
                        }
                    }
                });
            },
            onError: (error) => {
                console.log(error);
            }
        });

        if (loading) {
            return (
                <Container maxWidth="md" component="main">
                    <SkeletonItem />
                </Container>
            );
        }
        if (error) {
            return (
                <Alert severity="error" variant="filled">
                    {error.message}
                </Alert>
            );
        }
        const handleSubmit = async () => {
            await reactivatedPlan();
            navigate('/plans/');
        };

        return (
            <Container maxWidth="md">
                <Grid container alignitems="center" justifyContent="center">
                    <Grid item key={data.getTenant.plan.id || ''} md={6}>
                        <Card>
                            <CardHeader
                                title={data.getTenant.plan.title || '?'}
                                titleTypographyProps={{ align: 'center' }}
                                subheaderTypographyProps={{
                                    align: 'center'
                                }}
                                sx={{
                                    backgroundColor: (theme) =>
                                        theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[700]
                                }}
                            />
                            <CardContent>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'baseline',
                                        pt: 3,
                                        minWidth: '240px'
                                    }}
                                >
                                    <Typography component="h2" variant="h3" color="text.primary">
                                        ${data?.getTenant.plan.price / 100 || ''}
                                    </Typography>
                                    <Typography variant="h6" color="text.secondary">
                                        /mo
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'baseline',
                                        mb: 2,
                                        minWidth: '240px'
                                    }}
                                >
                                    <Typography component="h5" variant="h5" color="text.primary">
                                        {data?.getTenant.plan.featureList || ''}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'baseline',
                                        pt: 3,
                                        minWidth: '240px'
                                    }}
                                >
                                    <div>
                                        <Typography component="h2" variant="h6" color="text.primary">
                                            The next payment due will be on:
                                            <br />
                                            <br />
                                        </Typography>
                                        <Typography align="center" component="h2" variant="h4" color="text.primary">
                                            <Moment unix format="MMM D, YYYY">
                                                {data.getTenant.cancelPlanAt}
                                            </Moment>
                                            <br />
                                            <br />
                                        </Typography>
                                    </div>
                                </Box>
                                <Box component="span" display="flex" justifyContent="space-between" alignItems="center">
                                    <LoadingButton
                                        loading={loading || loading2}
                                        to={'/users'}
                                        variant={loading || loading2 ? 'outlined' : 'contained'}
                                        color="secondary"
                                        style={{ marginTop: theme.spacing(3) }}
                                    >
                                        No
                                    </LoadingButton>
                                    <LoadingButton
                                        type="submit"
                                        loading={loading || loading2}
                                        color="primary"
                                        variant={loading || loading2 ? 'outlined' : 'contained'}
                                        style={{ marginTop: theme.spacing(3) }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleSubmit();
                                        }}
                                    >
                                        Yes
                                    </LoadingButton>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        );
    }

    let mainCard = (
        <>
            <MainCard title={'Uncancel Current Plan?'}>
                <PlanCancelView></PlanCancelView>
            </MainCard>
        </>
    );
    return mainCard;
};

export default PlanCancel;
