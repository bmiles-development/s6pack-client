import React from 'react';
import { Link } from 'react-router-dom';
import AuthWrapper from './authentication/components/AuthWrapper';

export default function NotFound404() {
    return (
        <AuthWrapper>
            <h1>Oops! You seem to be lost.</h1>
            <p>Here are some helpful links:</p>
            <Link to="/">Home</Link>
            <Link to="/login">Sign Up</Link>
        </AuthWrapper>
    );
}
