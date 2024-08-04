import React from 'react';
import AuthWrapper from './components/AuthWrapper';
import AmplifyAuthenticator from './components/AmplifyAuthenticator';

const Register = () => (
    <AuthWrapper>
        <AmplifyAuthenticator flowType="signUp" />
    </AuthWrapper>
);

export default Register;
