import React from 'react';
import AuthWrapper from './components/AuthWrapper';
import AmplifyAuthenticator from './components/AmplifyAuthenticator';

const Login = () => (
    <AuthWrapper width={400} height={300}>
        <AmplifyAuthenticator flowType="signIn" width={400} height={300} />
    </AuthWrapper>
);

export default Login;
