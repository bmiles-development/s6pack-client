import React from 'react';
import { Link } from 'react-router-dom';
import AuthenticationLayout from './authentication/components/AuthenticationLayout';

export default function NotFound404() {
    return (
        <AuthenticationLayout>
            <h1>Oops! You seem to be lost.</h1>
            <p>Here are some helpful links:</p>
            <Link to="/">Home</Link>
            <Link to="/login">Sign Up</Link>
        </AuthenticationLayout>
    );
}
