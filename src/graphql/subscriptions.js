export const PLAN_MODIFIED = /* GraphQL */ `
    subscription planModified($id: String!) {
        planModified(id: $id) {
            id
        }
    }
`;

export const PLAN_CANCELED = /* GraphQL */ `
    subscription planCanceled($id: String!) {
        planCanceled(id: $id) {
            id
            planId
            cancelPlanAt
            plan {
                id
            }
        }
    }
`;

export const PAYMENT_METHOD_ADDED = /* GraphQL */ `
    subscription paymentMethodAdded($tenantId: String!) {
        paymentMethodAdded(tenantId: $tenantId) {
            id
            paymentType
            expirationDate
            last4
            cardType
            default
        }
    }
`;

export const USER_ADDED = /* GraphQL */ `
    subscription userAdded($tenantId: String!) {
        userAdded(tenantId: $tenantId) {
            email
            enabled
            id
            group
            groupModfified
            created
            modified
            status
            tenantId
        }
    }
`;

export const USER_DELETED = /* GraphQL */ `
    subscription userDeleted($tenantId: String!) {
        userDeleted(tenantId: $tenantId) {
            id
            tenantId
        }
    }
`;
