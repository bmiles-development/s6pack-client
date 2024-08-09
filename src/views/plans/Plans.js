import React from 'react';
import { store } from '../../store';
import MainCard from '../../view-components/MainCard';
import { Container, Box, Link, Alert } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { GET_CURRENT_AND_ALL_PLANS } from '../../graphql/queries';
import SkeletonPlan from '../../views/layout/skeletons/Plan';
import { useNavigate } from 'react-router-dom';
import { selectPlan } from '../../store/reducers/plan';
import { useTheme } from '@mui/material/styles';
import { gql, useQuery } from '@apollo/client';
import Moment from 'react-moment';

const Plans = () => {
    const theme = useTheme();
    let navigate = useNavigate();

    function routePlanChangeType(selectedPlan) {
        if (typeof data.getTenant?.plan.price == 'undefined' || data.getTenant.plan.price == 0) {
            createPaidPlanAndNavigateToPayment(selectedPlan);
        } else if (selectedPlan.Price == 0) {
            downgradePaidPlanAndVerify(selectedPlan);
        } else {
            modifyPaidPlanAndVerify(selectedPlan);
        }
    }

    function downgradePaidPlanAndVerify(plan) {
        store.dispatch(selectPlan(plan));
        const plansDetailUri = '/plans_cancel/' + plan.id;
        navigate(plansDetailUri);
    }

    function createPaidPlanAndNavigateToPayment(plan) {
        store.dispatch(selectPlan(plan));
        const plansDetailUri = '/plans/' + plan.id;
        navigate(plansDetailUri);
    }

    function modifyPaidPlanAndVerify(plan) {
        store.dispatch(selectPlan(plan));
        const plansDetailUri = '/plan_update/' + plan.id;
        navigate(plansDetailUri);
    }

    const { loading, error, data } = useQuery(gql(GET_CURRENT_AND_ALL_PLANS));

    if (loading)
        return (
            <MainCard title="Subscription Plans">
                <Container maxWidth="md" component="main">
                    <SkeletonPlan />
                </Container>
            </MainCard>
        );
    if (error) {
        return (
            <MainCard title="Subscription Plans">
                <Alert severity="error" variant="filled">
                    {error.message}
                </Alert>
            </MainCard>
        );
    }

    function PlansList() {
        const now = Date.now();
        let trialPeriodStamp = Number(data.getTenant.trialPeriodTimestamp) * 1000;
        const diff = now - trialPeriodStamp;
        const trialPeriodDaysRemaining = Math.floor(diff / (1000 * 60 * 60 * 24));
        return (
            <Container maxWidth="md" component="main">
                <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
                    {data.listPlans.map((plan) => (
                        <Grid item key={plan.title} xs={12} sm={6} md={3} sx={{ display: plan.title == 'Free' ? 'none' : '' }}>
                            <Card>
                                <CardHeader
                                    title={plan.title}
                                    subheader={plan.subheader}
                                    titleTypographyProps={{ align: 'center' }}
                                    //action={plan.title === 'Pro' ? <StarIcon /> : null}
                                    subheaderTypographyProps={{
                                        align: 'center'
                                    }}
                                    sx={{
                                        backgroundColor:
                                            data.getTenant.planId == plan.id
                                                ? typeof data.getTenant.cancelPlanAt != 'undefined' && data.getTenant.cancelPlanAt != null
                                                    ? (theme) => theme.palette.warning.main
                                                    : (theme) =>
                                                          theme.palette.mode === 'light'
                                                              ? theme.palette.primary.light
                                                              : theme.palette.primary.main
                                                : (theme) =>
                                                      theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[700]
                                    }}
                                />
                                <CardContent>
                                    {plan.id == data.getTenant.planId &&
                                    typeof data.getTenant.cancelPlanAt != 'undefined' &&
                                    data.getTenant.cancelPlanAt != null ? (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Card variant="none">
                                                <CardContent>
                                                    <Typography align="center" component="h4" variant="h6" color="text.primary">
                                                        Your Plan Expires on{' '}
                                                        <Moment unix format="MMM D, YYYY">
                                                            {data.getTenant.cancelPlanAt}
                                                        </Moment>
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Box>
                                    ) : (
                                        <></>
                                    )}
                                </CardContent>
                                <CardContent>
                                    {(plan.id == data.getTenant.planId &&
                                        (data.getTenant.trialPeriod.trialPeriodStatus == 'AVAILABLE' ||
                                            data.getTenant.trialPeriod.trialPeriodStatus == 'ACTIVE')) ||
                                    (plan.id == process.env.REACT_APP_TRIAL_PERIOD_SUBSCRIPTION_ID &&
                                        data.getTenant.trialPeriod.trialPeriodStatus == 'AVAILABLE') ? (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                mb: data.getTenant.planId == plan.id ? 5 : 2
                                            }}
                                        >
                                            <Card variant="outlined">
                                                <CardContent>
                                                    <Typography align="center" component="h2" variant="h3" color="text.primary">
                                                        Free
                                                    </Typography>

                                                    <Typography align="center" variant="h5" color={theme.palette.warning.main}>
                                                        {data.getTenant.trialPeriod.trialPeriodStatus == 'AVAILABLE' ? (
                                                            <>{data.getTenant.trialPeriodDays} Day Trial Period</>
                                                        ) : (
                                                            <>
                                                                {Number(data.getTenant.trialPeriodDays) - trialPeriodDaysRemaining} Day
                                                                {trialPeriodDaysRemaining == 1 ? '' : 's'} Remaining in Free Trial
                                                            </>
                                                        )}
                                                    </Typography>

                                                    <Typography align="center" variant="h6" color="text.secondary">
                                                        Then ${plan.price / 100}/mo After
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Box>
                                    ) : (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'baseline',
                                                mb: data.getTenant.planId == plan.id ? 5 : 2
                                            }}
                                        >
                                            <Typography component="h2" variant="h3" color="text.primary">
                                                {plan.price / 100}
                                            </Typography>
                                            <Typography variant="h6" color="text.secondary">
                                                /mo
                                            </Typography>
                                        </Box>
                                    )}

                                    <ul>
                                        <Typography component="li" variant="subtitle1" align="center">
                                            {plan.totalUsers == 1 ? '1 User' : plan.totalUsers + ' Users'}
                                        </Typography>
                                    </ul>
                                </CardContent>
                                <CardActions>
                                    {data.getTenant.planId == plan.id ? (
                                        <Box
                                            sx={{
                                                display: 'block',
                                                alignItems: 'baseline',
                                                width: '100%'
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'baseline'
                                                }}
                                            >
                                                <Typography variant="h6" color="text.secondary">
                                                    Currently Selected Plan
                                                </Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'baseline'
                                                }}
                                            >
                                                <Typography variant="caption" color="text.secondary">
                                                    <Link
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => {
                                                            navigate('/plans/payments/');
                                                        }}
                                                    >
                                                        See Billing Details
                                                    </Link>
                                                </Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'baseline'
                                                }}
                                            >
                                                {typeof data.getTenant.cancelPlanAt != 'undefined' &&
                                                data.getTenant.cancelPlanAt != null ? (
                                                    <Typography variant="caption" color="text.secondary">
                                                        <Link
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => {
                                                                navigate('/plan_reactivate/');
                                                            }}
                                                        >
                                                            Reactivate Plan
                                                        </Link>
                                                    </Typography>
                                                ) : (
                                                    <Typography variant="caption" color="text.secondary">
                                                        {typeof data.getTenant.trialPeriod.trialPeriodStatus != 'ACTIVE' ? (
                                                            <Link
                                                                style={{ cursor: 'pointer' }}
                                                                onClick={() => {
                                                                    navigate('/plan_cancel/');
                                                                }}
                                                            >
                                                                Cancel Plan
                                                            </Link>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </Typography>
                                                )}
                                            </Box>
                                        </Box>
                                    ) : (
                                        <Button
                                            fullWidth
                                            disabled={data.getTenant.planId == plan.id}
                                            onClick={() => {
                                                if (plan.title == 'Enterprise') {
                                                    navigate('/plans/contact_us');
                                                } else {
                                                    routePlanChangeType(plan);
                                                }
                                            }}
                                            variant={data.getTenant.planId == plan.id ? 'contained' : 'outlined'}
                                        >
                                            {data.getTenant.planId == plan.id
                                                ? 'Current Plan'
                                                : plan.title == 'Enterprise'
                                                  ? 'Contact Us'
                                                  : data.getTenant.plan.price > plan.price
                                                    ? 'Downgrade'
                                                    : data.getTenant.plan.price > 0
                                                      ? 'Upgrade'
                                                      : 'Select'}
                                        </Button>
                                    )}
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        );
    }

    let mainCard = (
        <MainCard title={'Subscription Plans'}>
            <PlansList></PlansList>
        </MainCard>
    );
    return mainCard;
};

export default Plans;
