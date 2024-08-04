import React, { useEffect, useState } from 'react';
import { store } from '../../store';
import MainCard from '../../view-components/MainCard';
import { Container, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import StripeCheckout from './components/stripeCheckout';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

function PlanDetails() {
    const theme = useTheme();
    let navigate = useNavigate();
    let [plan] = useState(store.getState().plan.selectedPlan.payload);

    useEffect(() => {
        if (typeof plan === 'undefined') {
            const plansDetailUri = '/plans/';
            navigate(plansDetailUri);
        }
    });
    return (
        <MainCard title={'Subscription Plan - ' + (plan?.title || '')}>
            <Container maxWidth="md" component="main">
                <Grid container alignitems="center" justifyContent="center">
                    <Grid item key={plan?.title || ''} md={6}>
                        <Card>
                            <CardHeader
                                title={plan?.title || ''}
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
                                {plan?.id == process.env.REACT_APP_TRIAL_PERIOD_SUBSCRIPTION_ID ? (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <div>
                                            <Typography align="center" component="h2" variant="h3" color="text.primary">
                                                <br />
                                                Free
                                                <br />
                                            </Typography>
                                            <Typography align="center" variant="h5" color={theme.palette.warning.main}>
                                                14 Day Trial Period
                                                <br />
                                                <br />
                                            </Typography>
                                            <Typography align="center" variant="h6" color="text.secondary">
                                                Then ${plan?.price / 100}/mo After
                                            </Typography>
                                        </div>
                                    </Box>
                                ) : (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'baseline',
                                            mb: 2,
                                            pt: 3
                                        }}
                                    >
                                        <Typography component="h2" variant="h3" color="text.primary">
                                            ${plan?.price / 100 || ''}
                                        </Typography>
                                        <Typography variant="h6" color="text.secondary">
                                            /mo
                                        </Typography>
                                    </Box>
                                )}
                                <ul>
                                    {plan?.featureList.split(',').map((line) => (
                                        <Typography component="li" variant="subtitle1" align="center" key={line}>
                                            {line}
                                        </Typography>
                                    )) || ''}
                                </ul>
                                <div style={{ paddingTop: '50px' }}>
                                    <StripeCheckout />
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </MainCard>
    );
}

export default PlanDetails;
