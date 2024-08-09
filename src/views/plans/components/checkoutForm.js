import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { store } from '../../../store';
import { LoadingButton } from '@mui/lab';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { gql, useMutation } from '@apollo/client';
import { CREATE_PLAN_INTENT, CREATE_PAYMENT_METHOD_INTENT, CONFIRM_ADD_PLAN, CONFIRM_ADD_PAYMENT_METHOD } from '../../../graphql/mutations';
import { useNavigate } from 'react-router';
import { addSnackBarMessage } from '../../../store/reducers/snackBarMessages';

const CheckoutForm = (props) => {
    const [clickLoading, setClickLoading] = useState(false);
    const [skeletonLoading, setSkeletonLoading] = useState(true);
    const stripe = useStripe();
    const elements = useElements();
    const plan = store.getState().plan.selectedPlan.payload;
    const navigate = useNavigate();

    function handleError(error) {
        console.log(error);
    }

    const [addPaymentMethod, { loading: paymentMethodLoading, error }] = useMutation(gql(CONFIRM_ADD_PAYMENT_METHOD), {
        update(cache, { data: addPaymentMethod }) {
            cache.modify({
                fields: {
                    listPaymentMethods(existingPaymentMethods = []) {
                        const newPaymentMethodRef = cache.writeFragment({
                            data: addPaymentMethod.confirmAddPaymentMethod,
                            fragment: gql`
                                fragment newPaymentMethod on PaymentMethod {
                                    id
                                    cardType
                                    default
                                    expirationDate
                                    last4
                                    paymentType
                                }
                            `
                        });
                        return [...existingPaymentMethods, newPaymentMethodRef];
                    }
                }
            });
        }
    });

    const [confirmAddPlan, { loading: paymentMethodLoading2, error2 }] = useMutation(gql(CONFIRM_ADD_PLAN), {
        onError: (error) => {
            console.log(error);
        }
    });

    const handleSubmit = async (event) => {
        setClickLoading(true);
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            setClickLoading(false);
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }
        await Auth.currentSession().then((data) => data.idToken.payload);
        const { error: submitError } = await elements.submit();
        if (submitError) {
            setClickLoading(false);
            handleError(submitError);
            return;
        }
        let clientSecret = '';
        let returnUrl = '';

        if (props.paymentMethodOnly) {
            const paymentMethodIntent = await API.graphql(graphqlOperation(CREATE_PAYMENT_METHOD_INTENT));
            clientSecret = paymentMethodIntent.data.createPaymentMethodIntent.clientSecret;
        } else {
            const setupIntent = await API.graphql(graphqlOperation(CREATE_PLAN_INTENT, { planId: plan.id }));
            clientSecret = setupIntent.data.createPlanIntent.clientSecret;
        }

        const { error, paymentMethod: newPaymentMethod } = await stripe.createPaymentMethod({
            elements
        });

        if (error) {
            console.log(error);
        }
        if (props.paymentMethodOnly) {
            await addPaymentMethod({ variables: { paymentMethodId: newPaymentMethod.id, setupIntentClientSecret: clientSecret } });
            store.dispatch(addSnackBarMessage('Payment Method added successfully.'));
            returnUrl = '/billing';
        } else {
            await confirmAddPlan({
                variables: { paymentMethodId: newPaymentMethod.id, planId: plan.id, setupIntentClientSecret: clientSecret }
            });
            returnUrl = '/plans';
        }
        setClickLoading(false);
        navigate(returnUrl);
    };

    if (error) return `Error! ${error.message}`;
    if (error2) return `Error! ${error2.message}`;

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement onReady={() => setSkeletonLoading(false)} />
            <LoadingButton
                id="loadingButton"
                type="submit"
                fullWidth
                disabled={!elements}
                loading={paymentMethodLoading || paymentMethodLoading2 || clickLoading || skeletonLoading}
                variant="contained"
            >
                Submit
            </LoadingButton>
        </form>
    );
};

CheckoutForm.propTypes = {
    paymentMethodOnly: PropTypes.bool
};

export default CheckoutForm;
