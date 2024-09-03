import React, { useEffect, useState } from 'react';
import MainCard from '../../view-components/MainCard';
import { Container, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router-dom';
import SkeletonItem from '../../views/layout/skeletons/Item';
import { CHECKOUT } from '../../graphql/queries';
import { useTheme } from '@mui/material/styles';
import Moment from 'react-moment';
import { getRemainingDaysInBillingPeriod, getDaysSinceStartOfBillingPeriod } from './components/timestampConversion';
import 'moment-timezone';
import {
    Alert,
    AlertTitle,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    styled
} from '@mui/material/index';
import { CHANGE_PLAN } from '../../graphql/mutations';
import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
import { LoadingButton } from '@mui/lab';
import { Auth } from 'aws-amplify';

const StyledTableCell = styled(TableCell)({
    fontSize: '1rem'
});

const PlanUpdate = () => {
    const showError = false;
    const isSubmitting = false;
    let navigate = useNavigate();
    const theme = useTheme();
    let [idTokenData, setIdTokenData] = useState('');
    const { id } = useParams();
    const client = useApolloClient();
    let newPlan = client.readFragment({
        id: 'Plan:' + id,
        fragment: gql`
            fragment MyPlan on Plan {
                id
                title
                price
                statementDescriptor
                featureList
                totalUsers
            }
        `
    });

    newPlan = !newPlan ? '' : newPlan; // newPlan === null doesn't trigger useEffect()
    useEffect(() => {
        if (newPlan === '' || id === '') {
            navigate('/plans/');
        }
    }, [newPlan, navigate, id]);

    useEffect(() => {
        (async () => {
            if (idTokenData == '') {
                const idToken = await Auth.currentSession().then((data) => data.idToken.payload);
                setIdTokenData(idToken);
            }
        })();
    }, [idTokenData]);

    const {
        data,
        loading,
        error: errorCheckout
    } = useQuery(gql(CHECKOUT), {
        fetchPolicy: 'no-cache',
        variables: { id }
    });

    const [changePlan, { loading: changePlanLoading, error }] = useMutation(gql(CHANGE_PLAN), {
        update: () => {
            navigate('/plans');
        },
        onError: (error) => {
            console.log(error.graphQLErrors[0]);
        }
    });

    if (loading) {
        return (
            <MainCard title=" ">
                <Container maxWidth="md" component="main">
                    <SkeletonItem />
                </Container>
            </MainCard>
        );
    }

    if (error || errorCheckout) {
        return (
            <MainCard>
                <Alert severity="error" variant="filled">
                    {error.graphQLErrors[0].message || error.networkError.message || errorCheckout.message}
                </Alert>
            </MainCard>
        );
    }
    function CheckoutForm() {
        return (
            <>
                <Container maxWidth="md" component="main">
                    <Grid container alignitems="center" justifyContent="center">
                        <Grid item key={newPlan?.title || ''} md={12}>
                            <Card>
                                <CardHeader
                                    title={newPlan?.title || ''}
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
                                    {showError && (
                                        <Alert severity="error" style={{ marginTop: theme.spacing(3), marginBottom: theme.spacing(3) }}>
                                            <AlertTitle>Error</AlertTitle>
                                            {errorMessage}
                                        </Alert>
                                    )}
                                    <ul>
                                        {newPlan?.featureList.split(',').map((line) => (
                                            <Typography component="li" variant="subtitle1" align="center" key={line}>
                                                {line}
                                            </Typography>
                                        )) || ''}
                                    </ul>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'baseline',
                                            mb: 2,
                                            pt: 3
                                        }}
                                    >
                                        <Typography component="h2" variant="h5" color="text.primary">
                                            <br />
                                            Your unused plan amount is paid for the remainder of this blling cycle ending on{' '}
                                            <strong>
                                                <Moment unix format="MMM D, YYYY">
                                                    {data.checkout.nextInvoiceTimestamp}
                                                </Moment>
                                            </strong>{' '}
                                            so you will not be charged immediately, but rather you will be prorated on the next billing
                                            cycle.
                                            <br />
                                            <br /> The prorated charge is calculated as follows:
                                            <br />
                                            <br />
                                            <TableContainer component={Paper}>
                                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <StyledTableCell>Current Plan Already Used</StyledTableCell>
                                                            <StyledTableCell align="center">+</StyledTableCell>
                                                            <StyledTableCell>New Plan to be Used</StyledTableCell>
                                                            <StyledTableCell align="center">-</StyledTableCell>
                                                            <StyledTableCell>Current Paid Total</StyledTableCell>
                                                            <StyledTableCell align="center">=</StyledTableCell>
                                                            <StyledTableCell>Additional Proration on Next Bill</StyledTableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                            <StyledTableCell align="center">
                                                                $
                                                                {(
                                                                    (data.checkout.oldPlanTotal + data.checkout.oldPlanTotalUnused) /
                                                                    100
                                                                ).toFixed(2) || ''}
                                                                <br />
                                                                <Typography component="h4" variant="h6" color="text.primary">
                                                                    {getDaysSinceStartOfBillingPeriod(
                                                                        data.checkout.previousInvoiceTimestamp
                                                                    )}{' '}
                                                                    {getDaysSinceStartOfBillingPeriod(
                                                                        data.checkout.previousInvoiceTimestamp
                                                                    ) == 1
                                                                        ? 'day'
                                                                        : 'days'}{' '}
                                                                    used at <br />${(data.checkout.oldPlanTotal / 100).toFixed(2)}/mo
                                                                </Typography>
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">+</StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                ${(data.checkout.newPlanTotalRemaining / 100).toFixed(2) || ''}
                                                                <br />
                                                                <Typography component="h4" variant="h6" color="text.primary">
                                                                    {getRemainingDaysInBillingPeriod(data.checkout.nextInvoiceTimestamp)}{' '}
                                                                    {getRemainingDaysInBillingPeriod(data.checkout.nextInvoiceTimestamp) ==
                                                                    1
                                                                        ? 'day'
                                                                        : 'days'}{' '}
                                                                    remaining at <br />${(data.checkout.newPlanTotal / 100).toFixed(2)}/mo
                                                                </Typography>
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">-</StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                ${(data.checkout.oldPlanTotal / 100).toFixed(2) || ''}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">=</StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                $
                                                                {(
                                                                    (data.checkout.oldPlanTotal +
                                                                        data.checkout.oldPlanTotalUnused +
                                                                        data.checkout.newPlanTotalRemaining -
                                                                        data.checkout.oldPlanTotal) /
                                                                    100
                                                                ).toFixed(2) || ''}
                                                            </StyledTableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <StyledTableCell colSpan={8}></StyledTableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <StyledTableCell colSpan={4} />
                                                            <StyledTableCell colSpan={2} align="right">
                                                                Proration&nbsp;Total
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                $
                                                                {(
                                                                    (data.checkout.oldPlanTotal +
                                                                        data.checkout.oldPlanTotalUnused +
                                                                        data.checkout.newPlanTotalRemaining -
                                                                        data.checkout.oldPlanTotal) /
                                                                    100
                                                                ).toFixed(2) || ''}
                                                            </StyledTableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <StyledTableCell colSpan={4} />
                                                            <StyledTableCell align="right" colSpan={2}>
                                                                Next&nbsp;Bill&nbsp;Subtotal
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                {' '}
                                                                <strong>
                                                                    ${(data.checkout.nextInviceSubTotal / 100).toFixed(2) || ''}
                                                                </strong>
                                                            </StyledTableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <StyledTableCell colSpan={4} />
                                                            <StyledTableCell align="right" colSpan={2}>
                                                                {' '}
                                                                Monthly&nbsp;Charges&nbsp;Thereafter
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                ${(data.checkout.newPlanTotal / 100).toFixed(2) || ''}
                                                            </StyledTableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Typography>
                                    </Box>
                                    <Grid container spacing={2} direction="row" justifyContent="flex-end">
                                        <Grid item>
                                            <LoadingButton
                                                loading={changePlanLoading}
                                                variant={changePlanLoading ? 'outlined' : 'contained'}
                                                onClick={() => {
                                                    changePlan({ variables: { planId: id } });
                                                }}
                                            >
                                                {isSubmitting ? <CircularProgress size={24} /> : 'Modify Plan'}
                                            </LoadingButton>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </>
        );
    }

    return (
        <MainCard title={'Preview Change to ' + (newPlan?.title || '') + ' Plan'}>
            <CheckoutForm></CheckoutForm>
        </MainCard>
    );
};

export default PlanUpdate;
