import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { useApolloClient } from '@apollo/client';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Receipt, Logout, Payment, ContactSupport, PersonOutline } from '@mui/icons-material';

// assets
import { useNavigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

const ProfileTab = () => {
    const theme = useTheme();
    const client = useApolloClient();
    const { user } = useAuthenticator((context) => [context.user]);

    const { signOut } = useAuthenticator((context) => [context.route, context.signOut]);
    const navigate = useNavigate();
    const ownerPermissions =
        user.signInUserSession.idToken.payload['cognito:groups'][0] == 'Owner' ||
        user.signInUserSession.idToken.payload['cognito:groups'][0] == 'Free';
    const adminPermissions = user.signInUserSession.idToken.payload['cognito:groups'][0] == 'Admin';
    function logout() {
        client.clearStore();
        signOut();
        navigate('/login');
    }

    function billing() {
        navigate('/billing');
    }

    function support() {
        navigate('/support');
    }

    function plan() {
        navigate('/plans');
    }

    function account() {
        navigate('/account');
    }

    return (
        <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
            <ListItemButton onClick={account}>
                <ListItemIcon>
                    <PersonOutline />
                </ListItemIcon>
                <ListItemText primary="Account" />
            </ListItemButton>
            {(ownerPermissions || adminPermissions) && (
                <ListItemButton onClick={plan}>
                    <ListItemIcon>
                        <Receipt />
                    </ListItemIcon>
                    <ListItemText primary="Plan" />
                </ListItemButton>
            )}
            {(ownerPermissions || adminPermissions) && (
                <ListItemButton onClick={billing}>
                    <ListItemIcon>
                        <Payment />
                    </ListItemIcon>
                    <ListItemText primary="Billing" />
                </ListItemButton>
            )}
            <ListItemButton onClick={support}>
                <ListItemIcon>
                    <ContactSupport />
                </ListItemIcon>
                <ListItemText primary="Support" />
            </ListItemButton>
            <ListItemButton onClick={logout}>
                <ListItemIcon>
                    <Logout />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItemButton>
        </List>
    );
};

export default ProfileTab;
