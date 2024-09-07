export const ADD_ADMIN_USER = /* GraphQL */ `
    mutation AddAdminUser($username: AWSEmail!) {
        addAdminUser(username: $username) {
            id
            tenantId
            email
            enabled
            group
            created
            modified
            status
        }
    }
`;

export const ADD_STANDARD_USER = /* GraphQL */ `
    mutation AddStandardUser($username: AWSEmail!) {
        addStandardUser(username: $username) {
            id
            tenantId
            email
            enabled
            group
            created
            modified
            status
        }
    }
`;

export const DELETE_STANDARD_USER = /* GraphQL */ `
    mutation DeleteStandardUser($id: String!) {
        deleteStandardUser(id: $id) {
            id
            tenantId
        }
    }
`;

export const DELETE_ADMIN_USER = /* GraphQL */ `
    mutation DeleteStandardUser($id: String!) {
        deleteAdminUser(id: $id) {
            id
            tenantId
        }
    }
`;

export const CHANGE_ADMIN_USER_TO_STANDARD = /* GraphQL */ `
    mutation ChangeAdminToStandardUser($id: String!) {
        changeAdminToStandardUser(id: $id) {
            id
            group
            tenantId
        }
    }
`;

export const CHANGE_STANDARD_USER_TO_ADMIN = /* GraphQL */ `
    mutation ChangeStandardUserToAdmin($id: String!) {
        changeStandardUserToAdmin(id: $id) {
            id
            group
            tenantId
        }
    }
`;

export const ACTIVATE_USER = /* GraphQL */ `
    mutation ActivteUser($id: String!) {
        activateUser(id: $id) {
            id
            enabled
            tenantId
        }
    }
`;

export const DEACTIVATE_USER = /* GraphQL */ `
    mutation DeactivateUser($id: String!) {
        deactivateUser(id: $id) {
            id
            enabled
            tenantId
        }
    }
`;

export const CHANGE_PLAN = /* GraphQL */ `
    mutation changePlan($planId: String!) {
        changePlan(planId: $planId) {
            id
            planId
            cancelPlanAt
            plan {
                id
                title
                price
                statementDescriptor
                featureList
                totalUsers
            }
            users {
                id
                enabled
            }
        }
    }
`;

export const CANCEL_PAID_PLAN_AT_PERIOD_END = /* GraphQL */ `
    mutation cancelPaidPlanAtPeriodEnd {
        cancelPaidPlanAtPeriodEnd {
            id
            cancelPlanAt
        }
    }
`;

export const REACTIVATE_CANCELING_PAID_PLAN = /* GraphQL */ `
    mutation reactivateCancelingPaidPlan {
        reactivateCancelingPaidPlan {
            id
        }
    }
`;

export const CREATE_PLAN_INTENT = /* GraphQL */ `
    mutation createPlanIntent($planId: String!) {
        createPlanIntent(planId: $planId) {
            planId
            clientSecret
        }
    }
`;

export const CREATE_PAYMENT_METHOD_INTENT = /* GraphQL */ `
    mutation createPaymentMethodIntent {
        createPaymentMethodIntent {
            clientSecret
        }
    }
`;

export const CONFIRM_ADD_PLAN = /* GraphQL */ `
    mutation confirmAddPlan($paymentMethodId: String!, $planId: String!, $setupIntentClientSecret: String!) {
        confirmAddPlan(paymentMethodId: $paymentMethodId, planId: $planId, setupIntentClientSecret: $setupIntentClientSecret) {
            id
            planId
            plan {
                id
                title
                price
                statementDescriptor
                featureList
                totalUsers
            }
        }
    }
`;

export const CONFIRM_ADD_PAYMENT_METHOD = /* GraphQL */ `
    mutation confirmAddPaymentMethod($paymentMethodId: String!, $setupIntentClientSecret: String!) {
        confirmAddPaymentMethod(paymentMethodId: $paymentMethodId, setupIntentClientSecret: $setupIntentClientSecret) {
            id
            paymentType
            expirationDate
            last4
            cardType
            default
        }
    }
`;

export const SET_DEFAULT_PAYMENT_METHOD = /* GraphQL */ `
    mutation setDefaultPaymentMethod($paymentMethodId: String!) {
        setDefaultPaymentMethod(paymentMethodId: $paymentMethodId) {
            default
            id
        }
    }
`;

export const contactUs = /* GraphQL */ `
    mutation contactUs($input: ContactUsInput!) {
        contactUs(input: $input) {
            messageType
            message
        }
    }
`;

export const DELETE_PAYMENT_METHOD = /* GraphQL */ `
    mutation deletePaymentMethod($paymentMethodId: String!) {
        deletePaymentMethod(paymentMethodId: $paymentMethodId) {
            id
        }
    }
`;

export const ENABLE_DELETE_ACCOUNT = /* GraphQL */ `
    mutation enableDeleteAccount {
        enableDeleteAccount {
            id
            deleteAccountFlag
        }
    }
`;

export const DISABLE_DELETE_ACCOUNT = /* GraphQL */ `
    mutation disableDeleteAccount {
        disableDeleteAccount {
            id
            deleteAccountFlag
        }
    }
`;

export const DELETE_ACCOUNT = /* GraphQL */ `
    mutation deleteAccount {
        deleteAccount {
            id
        }
    }
`;
