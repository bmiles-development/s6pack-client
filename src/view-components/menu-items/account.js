const admin = {
    id: 'account',
    title: 'Account',
    type: 'group',
    children: [
        {
            id: 'plan',
            title: 'Plan',
            type: 'item',
            url: '/plans'
        },
        {
            id: 'billing',
            title: 'Billing',
            type: 'item',
            url: '/billing'
        },
        {
            id: 'support',
            title: 'Support',
            type: 'item',
            url: '/support'
        }
    ]
};

export default admin;
