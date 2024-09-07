import React from 'react';
import AuthenticationLayout from '../layout/AuthenticationLayout';
import AmplifyAuthenticator from './components/AmplifyAuthenticator';

const Register = () => (
    <AuthenticationLayout>
        <AmplifyAuthenticator flowType="signUp" />
    </AuthenticationLayout>
);

export default Register;
