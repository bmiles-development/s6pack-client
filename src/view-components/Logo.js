import React from 'react';
import LogoImg from '../assets/images/stations.svg';
import { Box, Typography } from '@mui/material';

const Logo = () => {
    return (
        <Box display={'flex'}>
            <Box component="img" src={LogoImg} width="50px" alt="stations"></Box>
            <Typography sx={{ lineHeight: '1.7em' }} variant="h3">
                stations
            </Typography>
        </Box>
    );
};

export default Logo;
