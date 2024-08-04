import React from 'react';
import MainCard from '../../view-components/MainCard';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import StripeCheckout from '../plans/components/stripeCheckout';

function AddPaymentMethod() {
    return (
        <MainCard title={'Add Payment Method'}>
            <Grid container alignitems="center" justifyContent="center">
                <Card>
                    <CardContent>
                        <div style={{ paddingTop: '50px' }}>
                            <StripeCheckout paymentMethodOnly={true} />
                        </div>
                    </CardContent>
                </Card>
            </Grid>
        </MainCard>
    );
}

export default AddPaymentMethod;
