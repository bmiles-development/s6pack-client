import React from 'react';
import { PropTypes } from 'prop-types';
import { useEffect } from 'react';
import { Authenticator, ThemeProvider, useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate, useLocation } from 'react-router';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import '../../../themes/amplify-authenticator.module.css';

//type: signUp, signIn
const AmplifyAuthenticator = (props) => {
    const defaultTheme = useTheme();
    const flowType = props.flowType;
    const amplifyTheme = {
        name: 'amplify-theme-bridge',
        tokens: {
            components: {
                button: {
                    primary: {
                        backgroundColor: { value: defaultTheme.palette.primary.main },
                        _hover: {
                            backgroundColor: { value: defaultTheme.palette.primary.dark }
                        }
                    }
                },
                textField: {
                    color: { value: defaultTheme.palette.primary.dark },
                    _focus: {
                        borderColor: { value: defaultTheme.palette.primary.dark }
                    },
                    _hover: {
                        borderColor: { value: defaultTheme.palette.primary.light }
                    }
                },
                authenticator: {
                    maxWdth: { value: '400px' }
                }
            }
        }
    };
    const formFields = {
        signIn: {
            username: {
                placeholder: 'Enter Your Email',
                isRequired: true,
                label: 'Email'
            }
        },
        signUp: {
            username: {
                placeholder: 'Enter Your Email',
                isRequired: true,
                label: 'Email'
            }
        }
    };

    const { route } = useAuthenticator((context) => [context.route]);
    useAuthenticator((context) => [context.user]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (route === 'authenticated') {
            let from = location.state?.from?.pathname || '/dashboard/default';
            navigate(from, { replace: true });
        }
    }, [route, navigate, location]);

    return (
        <ThemeProvider theme={amplifyTheme}>
            <Grid>
                <Authenticator height={props.height} width={props.width} formFields={formFields} initialState={flowType}></Authenticator>
            </Grid>
        </ThemeProvider>
    );
};

AmplifyAuthenticator.propTypes = {
    flowType: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number
};

export default AmplifyAuthenticator;
