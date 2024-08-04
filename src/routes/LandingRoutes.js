import React from 'react';
import { lazy } from 'react';
import Loadable from '../view-components/Loadable';
import Front from '../views/landing/Front';
import NotFound404 from '../views/NotFound404';

// render - login
const AuthLogin = Loadable(lazy(() => import('../views/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('../views/authentication/Register')));
const ContactUs = Loadable(lazy(() => import('../views/contact/contactUs')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    children: [
        {
            path: '*',
            element: <NotFound404 />
        },
        {
            path: 'login',
            element: <AuthLogin />
        },
        {
            path: 'register',
            element: <AuthRegister />
        },
        {
            path: 'contact_us',
            element: <ContactUs />
        },
        {
            path: '/',
            element: <Front />
        }
    ]
};

export default LoginRoutes;
