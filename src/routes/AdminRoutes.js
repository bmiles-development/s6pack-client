import React from 'react';
import { lazy } from 'react';

// project import
import Loadable from '../view-components/Loadable';
import MainLayout from '../views/layout/MainLayout';
import { RequireAuth } from '../view-components/RequireAuth';
import Support from '../views/contact/support';
const AddPaymentMethod = Loadable(lazy(() => import('../views/billing/AddPaymentMethod')));
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard')));
const Users = Loadable(lazy(() => import('../views/users/Users')));
const Plans = Loadable(lazy(() => import('../views/plans/Plans')));
const PlanPayments = Loadable(lazy(() => import('../views/billing/PlanPayments')));
const PlanDetails = Loadable(lazy(() => import('../views/plans/PlanDetails')));
const PlanCancel = Loadable(lazy(() => import('../views/plans/PlanCancel')));
const PlanReactivate = Loadable(lazy(() => import('../views/plans/PlanReactivate')));
const PlanUpdate = Loadable(lazy(() => import('../views/plans/PlanUpdate')));
const ContactUs = Loadable(lazy(() => import('../views/contact/contactUs')));
const Billing = Loadable(lazy(() => import('../views/billing/Billing')));
const UserCreate = Loadable(lazy(() => import('../views/users/UserCreate')));
const UserUpdate = Loadable(lazy(() => import('../views/users/UserUpdate')));
const Account = Loadable(lazy(() => import('../views/account/Account')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <RequireAuth>
            <MainLayout />
        </RequireAuth>
    ),
    children: [
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: '/',
            children: [
                {
                    path: '/support/',
                    element: <Support />
                },
                {
                    path: '/account/',
                    element: <Account />
                },
                {
                    path: '/billing/',
                    element: <Billing />
                },
                {
                    path: '/billing_add_payment_method',
                    element: <AddPaymentMethod />
                },
                {
                    path: '/billing/payment_method_update/:paymentMethodId',
                    element: <Billing />
                },
                {
                    path: '/plans/',
                    element: <Plans />
                },
                {
                    path: '/plans/:id',
                    element: <PlanDetails />
                },
                {
                    path: '/plan_update/:id',
                    element: <PlanUpdate />
                },
                {
                    path: '/plan_cancel',
                    element: <PlanCancel />
                },
                {
                    path: '/plan_reactivate',
                    element: <PlanReactivate />
                },
                {
                    path: '/plans/contact_us',
                    element: <ContactUs title="Enterprise Pricing Options Request" />
                },
                {
                    path: '/plans/payments',
                    element: <PlanPayments />
                },
                {
                    path: '/users/',
                    element: <Users />
                },
                {
                    path: '/user_create',
                    element: <UserCreate />
                },
                {
                    path: '/user_update/:id',
                    element: <UserUpdate />
                }
            ]
        }
    ]
};

export default MainRoutes;
