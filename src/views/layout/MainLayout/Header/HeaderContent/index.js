import React from 'react';
// material-ui
import { Box } from '@mui/material';

// project import
import Profile from './Profile';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
    return (
        <>
            <Box sx={{ width: '100%', ml: 1 }} />
            <Profile />
        </>
    );
};

export default HeaderContent;

/*
<Notification />
<IconButton
                component={Link}
                href="https://github.com/codedthemes/mantis-free-react-admin-template"
                target="_blank"
                disableRipple
                color="secondary"
                title="Download Free Version"
                sx={{ color: 'text.primary', bgcolor: 'grey.100' }}
            >
                <GithubOutlined />
            </IconButton>

*/
