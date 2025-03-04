import React from 'react';
// project import
import Navigation from './Navigation';
import SimpleBar from '../../../../../view-components/cards/SimpleBar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => (
    <SimpleBar
        sx={{
            '& .simplebar-content': {
                display: 'flex',
                flexDirection: 'column'
            }
        }}
    >
        <Navigation />
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://stations.com/">
                stations
            </Link>{' '}
            {new Date().getFullYear()}
        </Typography>
    </SimpleBar>
);

export default DrawerContent;
