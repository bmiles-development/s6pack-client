import React, { useState, useRef } from 'react';
import { store } from '../store';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { API, GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { contactUs } from '../graphql/mutations';
import ReCAPTCHA from 'react-google-recaptcha';
import { addSnackBarMessage } from '../store/reducers/snackBarMessages';
import PropTypes from 'prop-types';
import { Button, Divider, FormHelperText, Grid, Stack, TextField, CircularProgress, FormControl } from '@mui/material';
import * as Yup from 'yup';
import { useAuthenticator } from '@aws-amplify/ui-react';

const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    subject: Yup.string().max(255).required('Subject is required'),
    body: Yup.string().required('Body is required')
});

function ContactForm(props) {
    const { subject, body } = props;
    let navigate = useNavigate();
    const { user } = useAuthenticator((context) => [context.user]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const recaptchaRef = useRef();

    const onSubmit = async (event) => {
        setIsSubmitting(true);
        const recaptchaValue = recaptchaRef.current.getValue();
        if (recaptchaValue === '') {
            setErrorMessage('Please Verify Captcha.');
            setIsSubmitting(false);
            return false;
        }
        try {
            const contactUsData = {
                email: user ? user.username : event.email,
                subject: event.subject,
                message: event.body,
                captchaToken: recaptchaValue
            };

            await API.graphql({
                query: contactUs,
                variables: { input: contactUsData },
                authMode: user ? GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS : GRAPHQL_AUTH_MODE.AWS_IAM
            });
            store.dispatch(addSnackBarMessage('Thank you for contacting us, we will reach out to you shortly.'));

            const plansDetailUri = user ? '/dashboard/default' : '/';
            await recaptchaRef.current.reset();
            await recaptchaRef.current.getValue();

            setIsSubmitting(false);
            return navigate(plansDetailUri);
        } catch (error) {
            console.log(error);
            setIsSubmitting(false);
            //setStatus({ success: false });
            setErrorMessage(error.message);
            return false;
        }
    };

    let form = (
        <Container maxWidth="md" component="main">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <TextField
                                error={errors.email != undefined ? true : false}
                                helperText={errors.email && errors.email.message}
                                name="email"
                                {...register('email')}
                                label="Email"
                                htmlFor="email"
                                InputProps={{ readOnly: user ? true : false }}
                                defaultValue={user?.username}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <TextField
                                error={errors.subject != undefined ? true : false}
                                helperText={errors.subject && errors.subject.message}
                                name="subject"
                                {...register('subject')}
                                label="Subject"
                                htmlFor="subject"
                                defaultValue={subject}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <TextField
                                name="body"
                                error={errors.body != undefined ? true : false}
                                {...register('body')}
                                label="Body"
                                multiline
                                rows={6}
                                helperText={errors.body && errors.body.message}
                                defaultValue={body}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                                onChange={() => {
                                    setErrorMessage('');
                                }}
                            />

                            {errorMessage && (
                                <FormControl error={true}>
                                    <FormHelperText>{errorMessage}</FormHelperText>
                                </FormControl>
                            )}
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            disableElevation
                            disabled={isSubmitting}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            {isSubmitting ? <CircularProgress size={24} /> : 'Submit'}
                        </Button>
                    </Grid>
                    <Grid item xs={12} sx={{ pb: 10 }}>
                        <Divider></Divider>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
    return form;
}

ContactForm.propTypes = {
    subject: PropTypes.string,
    body: PropTypes.string,
    captcha: PropTypes.bool
};

export default ContactForm;
