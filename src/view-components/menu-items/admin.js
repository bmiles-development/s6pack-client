// assets
import { Group, QuestionMark } from '@mui/icons-material';

const admin = {
    id: 'administration',
    title: 'Admin',
    type: 'group',
    children: [
        {
            id: 'users',
            title: 'Users',
            type: 'item',
            url: '/users',
            icon: Group
        },
        {
            id: 'documentation',
            title: 'Documentation',
            type: 'item',
            url: 'https://docs.stations.build/getting-started/welcome/',
            icon: QuestionMark,
            external: true,
            target: true
        }
    ]
};

export default admin;
