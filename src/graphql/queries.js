export const LIST_INVOICES = /* GraphQL */ `
    query listInvoices {
        listInvoices {
            id
            planId
            periodStart
            periodEnd
            description
            pdfUrl
            number
            startingBalance
        }
    }
`;

export const GET_TENANT = /* GraphQL */ `
    query getTenant {
        getTenant {
            id
            planId
            trialPeriodDays
            trialPeriodTimestamp
            cancelPlanAt
            deleteAccountFlag
            plan {
                id
                title
                price
                statementDescriptor
                featureList
                totalUsers
            }
            trialPeriod {
                trialPeriodStatus
            }
        }
    }
`;

export const PREVIEW_PLAN_CANCEL = /* GraphQL */ `
    query previewPlanCancel {
        getTenant {
            id
            planId
            trialPeriodDays
            trialPeriodTimestamp
            cancelPlanAt
            plan {
                id
                title
                price
                statementDescriptor
                featureList
                totalUsers
            }
            trialPeriod {
                trialPeriodStatus
            }
        }
        getUpcomingInvoice {
            nextInvoiceTimestamp
        }
    }
`;

export const LIST_USERS = /* GraphQL */ `
    query listUsers {
        listUsers {
            email
            enabled
            id
            group
            created
            modified
            status
        }
    }
`;

export const GET_USER = /* GraphQL */ `
    query getUser($id: String!) {
        getUser(id: $id) {
            email
            enabled
            id
            group
            created
            modified
            status
        }
    }
`;

export const LIST_CHARGES = /* GraphQL */ `
    query listCharges($input: ListChargesInput, $limit) {
        listCharges(input: $input, limit: $limit) {
            id
            created
            amount
            paid
            paymentType
            last4
            refunded
            refundedAmount
            failureMessage
        }
    }
`;

export const GET_CURRENT_AND_ALL_PLANS = /* GraphQL */ `
    query getCurrentAndAllPlans {
        listPlans {
            id
            title
            price
            statementDescriptor
            featureList
            totalUsers
        }
        getTenant {
            id
            planId
            trialPeriodDays
            trialPeriodTimestamp
            cancelPlanAt
            plan {
                id
                price
                statementDescriptor
                featureList
                totalUsers
            }
            trialPeriod {
                trialPeriodStatus
            }
        }
    }
`;

export const LIST_PAYMENT_METHODS = /* GraphQL */ `
    query listPaymentMethods {
        listPaymentMethods {
            id
            paymentType
            expirationDate
            last4
            cardType
            default
        }
    }
`;

export const LIST_PLANS = /* GraphQL */ `
    query listPlans {
        listPlans {
            id
            title
            price
            statementDescriptor
            featureList
            totalUsers
        }
    }
`;

export const CHECKOUT = /* GraphQL */ `
    query checkout($id: String!) {
        checkout(planId: $id) {
            nextInviceSubTotal
            newPlanTotal
            oldPlanTotal
            newPlanTotalRemaining
            oldPlanTotalUnused
            nextInvoiceTimestamp
            previousInvoiceTimestamp
        }
    }
`;
