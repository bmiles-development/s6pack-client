import React from 'react';
import AuthenticationLayout from '../layout/AuthenticationLayout';
import AmplifyAuthenticator from './components/AmplifyAuthenticator';

const Login = () => (
    <AuthenticationLayout width={400} height={300}>
        <AmplifyAuthenticator flowType="signIn" width={400} height={300} />
    </AuthenticationLayout>
);

export default Login;
