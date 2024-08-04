import React from 'react';
import LogoImg from '../assets/images/s6pack.svg';
import { Box, Typography } from '@mui/material';

const Logo = () => {
    return (
        <Box display={'flex'}>
            <Box component="img" src={LogoImg} width="50px" alt="s6pack"></Box>
            <Typography sx={{ lineHeight: '1.7em' }} variant="h3">
                s6pack
            </Typography>
        </Box>
    );
};

export default Logo;
