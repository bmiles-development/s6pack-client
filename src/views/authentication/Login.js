import React from 'react';
import AuthWrapper from './components/AuthWrapper';
import AmplifyAuthenticator from './components/AmplifyAuthenticator';

const Login = () => (
    <AuthWrapper>
        <AmplifyAuthenticator flowType="signIn" />
    </AuthWrapper>
);

export default Login;
