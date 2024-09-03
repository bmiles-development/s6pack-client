import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { LIST_CHARGES } from '../../graphql/queries';
import MainCard from '../../view-components/MainCard';
import {
    Typography,
    Container,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid,
    Box
} from '@mui/material';
import Moment from 'react-moment';
import Item from '../../views/layout/skeletons/Item';

function PlanPayments() {
    const [payments, setPayments] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [lastPage, setLastPage] = useState(false);
    const [newPage, setNewPage] = useState(0);
    const [nextPageId, setNextPageId] = useState('');
    const [prevPageId, setPrevPageId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const itemsPerPage = 20;

    useEffect(() => {
        async function startFetching() {
            setIsLoading(true);
            let params = {};

            try {
                if (payments.length > 0 && newPage < currentPage) {
                    params = { endingBefore: nextPageId };
                }

                if (payments.length > 0 && newPage > currentPage) {
                    params = { startingAfter: prevPageId };
                }

                const res = await API.graphql({ query: LIST_CHARGES, variables: { input: params, limit: itemsPerPage } });
                setPayments(res.data.listCharges);

                if (res.data.listCharges.length > 0) {
                    // change this to use if "more" = true then setNextPageId
                    setPrevPageId(res.data.listCharges[res.data.listCharges.length - 1].Id);
                }

                setLastPage(false);
                if (res.data.listCharges.length < itemsPerPage || res.data.listCharges.length == 0) {
                    setLastPage(true);
                }

                if (currentPage > 0) {
                    setNextPageId(res.data.listCharges[0].Id);
                }

                setCurrentPage(newPage);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        }

        startFetching();
    }, [newPage, currentPage, nextPageId, payments.length, prevPageId]);

    const handleOlder = () => {
        setNewPage((currentPage) => currentPage + 1);
    };

    const handleNewer = () => {
        setNewPage((currentPage) => currentPage - 1);
    };

    let mainCard = (
        <MainCard title={'Payment History'}>
            <Container maxWidth="md" component="main">
                {isLoading ? (
                    <Item />
                ) : (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date/Payment Id</TableCell>
                                    <TableCell>Payment Type</TableCell>
                                    <TableCell>Amount Paid</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {payments.map((payment) => (
                                    <TableRow key={payment.Id}>
                                        <TableCell>
                                            {' '}
                                            <strong>
                                                <Moment unix format="MMM D, YYYY">
                                                    {payment.Created}
                                                </Moment>
                                            </strong>
                                            <br />
                                            <Typography component="h6" variant="h7" color="text.secondary">
                                                {payment.Id}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            {payment.PaymentType[0].toUpperCase() + payment.PaymentType.slice(1)}&nbsp;****
                                            {payment.Last4}
                                        </TableCell>
                                        <TableCell>
                                            <strong>${(payment.Amount - payment.RefundedAmount) / 100}&nbsp;</strong>
                                            {payment.Refunded ? '(Refunded: $' + payment.RefundedAmount / 100 + ')' : ''}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                <Box>
                    <Typography variant="h6" align="right" color="text.primary" gutterBottom sx={{ mt: 2 }}>
                        Page: {currentPage + 1}
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
                            disabled={currentPage === 0}
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
                            disabled={lastPage}
                        >
                            Next
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </MainCard>
    );
    return mainCard;
}

export default PlanPayments;
