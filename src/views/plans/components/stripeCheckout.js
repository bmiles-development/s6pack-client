import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './checkoutForm';
import SkeletonItem from '../../../views/layout/skeletons/Item';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function StripeCheckout(props) {
    const [options, setOptions] = useState(null);

    useEffect(() => {
        (async () => {
            let opts = {};
            opts.mode = 'setup';
            opts.currency = 'usd';
            opts.paymentMethodCreation = 'manual';
            setOptions(opts);
        })();
    }, [props]);
    if (options === null) {
        return <SkeletonItem />;
    }
    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm paymentMethodOnly={props.paymentMethodOnly} />
        </Elements>
    );
}

StripeCheckout.propTypes = {
    paymentMethodOnly: PropTypes.bool
};

export default StripeCheckout;
