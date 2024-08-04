import React, { useEffect, useState } from 'react';
import MainCard from '../../view-components/MainCard';
import {
    Alert,
    Box,
    Button,
    Chip,
    Container,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { LIST_PAYMENT_METHODS, LIST_INVOICES } from '../../graphql/queries';
import { SET_DEFAULT_PAYMENT_METHOD, DELETE_PAYMENT_METHOD } from '../../graphql/mutations';
import { PAYMENT_METHOD_ADDED } from '../../graphql/subscriptions';
import SkeletonItem from '../../views/layout/skeletons/Item';
import SkeletonPlan from '../../views/layout/skeletons/Plan';
import { useNavigate } from 'react-router-dom';
import { Fab } from '@mui/material/index';
import AddIcon from '@mui/icons-material/Add';
import PaymentMethodTypeIcon from '../../view-components/PaymentMethodIcon';
import { gql, useQuery, useMutation, useSubscription } from '@apollo/client';
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteDialog from '../../view-components/DeleteDialog';
import { Auth } from 'aws-amplify';
import Moment from 'react-moment';
import PictureAsPdf from '@mui/icons-material/PictureAsPdf';

const Billing = () => {
    //const [currentPlan, setCurrentPlan] = useState({});

    let [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState('');
    let [idTokenData, setIdTokenData] = useState('');

    let navigate = useNavigate();

    function checkExpDate(date) {
        const monthYear = date.split('/');
        const current = new Date();
        const exp = new Date();
        exp.setFullYear(monthYear[1], monthYear[0] - 1, 1);
        if (exp.getMonth() == current.getMonth() && exp.getYear() == current.getYear()) {
            return 'expiresThisMonth';
        }

        if (exp.getYear() == current.getYear()) {
            if (exp.getMonth() < current.getMonth()) {
                return 'expired';
            }
        }

        if (exp.getYear() < current.getYear()) {
            return 'expired';
        }
        return 'valid';
    }

    useEffect(() => {
        (async () => {
            if (idTokenData == '') {
                const idToken = await Auth.currentSession().then((data) => data.idToken.payload);
                setIdTokenData(idToken);
            }
        })();
    }, [idTokenData]);

    function PaymentMethods() {
        const { loading, error, data } = useQuery(gql(LIST_PAYMENT_METHODS));
        const [setDefaultPaymentMethod, { loading: buttonLoading }] = useMutation(gql(SET_DEFAULT_PAYMENT_METHOD));
        const [deletePaymentMethod, { loading: deleteLoading }] = useMutation(gql(DELETE_PAYMENT_METHOD), {
            update: (cache, { data: { deletePaymentMethod } }) => {
                const delRef = cache.identify(deletePaymentMethod);
                cache.modify({
                    fields: {
                        listPaymentMethods(existingPaymentMethods = []) {
                            const returnPaymentMethods = [];
                            for (let i = 0; i < existingPaymentMethods.length; i++) {
                                if (existingPaymentMethods[i]['__ref'] !== delRef) {
                                    returnPaymentMethods[i] = existingPaymentMethods[i];
                                }
                            }
                            return returnPaymentMethods;
                        }
                    }
                });
                cache.evict({
                    id: delRef
                });
                cache.gc();
            }
        });

        useSubscription(gql(PAYMENT_METHOD_ADDED), {
            variables: { tenantId: idTokenData.name },
            onData: (data) => {
                console.log(data);
            },
            onError: (error) => {
                console.log(error);
            }
        });

        if (loading) return <SkeletonPlan />;
        if (error)
            return (
                <Alert severity="error" variant="filled">
                    Error! ${error.message}
                </Alert>
            );

        return (
            <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
                {data.listPaymentMethods.map((paymentMethod) => (
                    // Enterprise card is full width at sm breakpoint
                    <Grid item key={paymentMethod.id} xs={12} sm={6} md={4}>
                        {deleteLoading && paymentMethod.id == selectedPaymentMethodId ? (
                            <SkeletonItem sx={{ display: 'inline-block' }} height={180} />
                        ) : (
                            <Card>
                                <CardHeader
                                    title={PaymentMethodTypeIcon({ type: paymentMethod.cardType, width: 75 })}
                                    titleTypographyProps={{ align: 'left' }}
                                    subheaderTypographyProps={{
                                        align: 'left'
                                    }}
                                    action={
                                        paymentMethod.default ? (
                                            ''
                                        ) : (
                                            <DeleteDialog
                                                title={'Delete Payment Method'}
                                                noun={'payment method ' + paymentMethod.cardType + ' ending in ' + paymentMethod.last4}
                                                loading={deleteLoading}
                                                onDelete={() => {
                                                    setSelectedPaymentMethodId(paymentMethod.id);
                                                    deletePaymentMethod({ variables: { paymentMethodId: paymentMethod.id } });
                                                }}
                                            />
                                        )
                                    }
                                    sx={{
                                        backgroundColor: (theme) =>
                                            paymentMethod.enabled === false
                                                ? theme.palette.secondary.lighter
                                                : theme.palette.mode === 'light'
                                                  ? theme.palette.primary[100]
                                                  : theme.palette.primary[700]
                                    }}
                                />
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: 'block',
                                            justifyContent: 'left',
                                            alignItems: 'baseline',
                                            mb: 0
                                        }}
                                    >
                                        <Typography component="h3" variant="h5" color="text.primary">
                                            {'Last Four Digits: ' + paymentMethod.last4}
                                        </Typography>
                                        <Typography
                                            component="h3"
                                            variant="h6"
                                            color={(theme) =>
                                                checkExpDate(paymentMethod.expirationDate) == 'expiresThisMonth' ||
                                                checkExpDate(paymentMethod.expirationDate) == 'expired'
                                                    ? theme.palette.error.dark
                                                    : theme.palette.secondary
                                            }
                                        >
                                            {' Exp Date: ' + paymentMethod.expirationDate}
                                        </Typography>
                                        <Typography
                                            component="h3"
                                            variant="h6"
                                            color={(theme) =>
                                                checkExpDate(paymentMethod.expirationDate) == 'expiresThisMonth' ||
                                                checkExpDate(paymentMethod.expirationDate) == 'expired'
                                                    ? theme.palette.error.dark
                                                    : theme.palette.secondary
                                            }
                                        >
                                            {checkExpDate(paymentMethod.expirationDate) == 'expiresThisMonth'
                                                ? 'This Payment method is about to expire. Please add a new payment method to avoid a pause in service.'
                                                : checkExpDate(paymentMethod.expirationDate) == 'expired'
                                                  ? 'This payment method has expired. Please add a new payment method.'
                                                  : ''}
                                        </Typography>
                                    </Box>
                                </CardContent>
                                <CardActions>
                                    {paymentMethod.default == false ? (
                                        <LoadingButton
                                            loading={buttonLoading}
                                            fullWidth
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setDefaultPaymentMethod({ variables: { paymentMethodId: paymentMethod.id } });
                                            }}
                                            variant="outlined"
                                        >
                                            Make Default Payment Method
                                        </LoadingButton>
                                    ) : (
                                        <Chip sx={{ mb: 1, mt: 0 }} color="primary" disabled={false} label="Default Payment Method" />
                                    )}
                                </CardActions>
                            </Card>
                        )}
                    </Grid>
                ))}
                <Grid item key="addPaymentMethod" sx={{ justifyContent: 'center', alignContent: 'center', m: 5 }}>
                    <Fab
                        color="primary"
                        aria-label="add"
                        onClick={() => {
                            navigate('/billing_add_payment_method/');
                        }}
                    >
                        <AddIcon />
                    </Fab>
                </Grid>
            </Grid>
        );
    }

    function Invoices() {
        const { loading, error, data } = useQuery(gql(LIST_INVOICES));
        const currentPage = 1;
        const lastPage = false;
        if (loading) return <SkeletonPlan />;
        if (error)
            return (
                <Alert severity="error" variant="filled">
                    Error! ${error.message};
                </Alert>
            );
        return (
            <Container maxWidth="md" component="main">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Invoice</TableCell>
                                <TableCell>Billing Period</TableCell>
                                <TableCell>Download</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.listInvoices.map((invoice) => (
                                <TableRow key={invoice.id}>
                                    <TableCell>
                                        <Typography component="h6" variant="h5" color="text.secondary">
                                            {invoice.number}
                                        </Typography>
                                        <Typography component="h6" variant="h6" color="text.secondary">
                                            {invoice.description}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography component="h6" variant="h6" color="text.secondary">
                                            <strong>
                                                <Moment unix format="MMM D, YYYY">
                                                    {invoice.periodStart}
                                                </Moment>
                                                &nbsp;-&nbsp;
                                                <Moment unix format="MMM D, YYYY">
                                                    {invoice.periodEnd}
                                                </Moment>
                                            </strong>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton href={invoice.pdfUrl} color="secondary" size="small" sx={{ fontSize: '0.875rem' }}>
                                            <PictureAsPdf />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box>
                    <Typography variant="h6" align="right" color="text.primary" gutterBottom sx={{ mt: 2 }}>
                        Page: {currentPage}
                    </Typography>
                </Box>
                <Grid container spacing={2} direction="row" justifyContent="flex-end">
                    <Grid item>
                        <Button
                            onClick={() => {
                                handleNewer();
                            }}
                            variant="contained"
                            color="primary"
                            disabled={currentPage === 0 || true}
                        >
                            Prev
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            onClick={() => {
                                handleOlder();
                            }}
                            variant="contained"
                            color="primary"
                            disabled={lastPage || true}
                        >
                            Next
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        );
    }

    let mainCard = (
        <MainCard title="Billing">
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 6, pb: 6, border: false }}>
                <Typography component="h2" variant="h3" align="center" color="text.primary" gutterBottom>
                    Payment Methods
                </Typography>
            </Container>
            <PaymentMethods></PaymentMethods>
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 12, pb: 6, border: false }}>
                <Typography component="h2" variant="h3" align="center" color="text.primary" gutterBottom>
                    Invoices
                </Typography>
            </Container>
            <Invoices></Invoices>
        </MainCard>
    );
    return mainCard;
};

export default Billing;
