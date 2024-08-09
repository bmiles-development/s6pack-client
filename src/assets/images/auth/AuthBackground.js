import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import backgroundImage from '../s6pack.svg';

// ==============================|| AUTH BLUR BACK SVG ||============================== //

const BackgroundImage = styled(Box)(({ theme }) => ({
    display: 'block',
    position: 'absolute',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    left: '-25%',
    right: 0,
    top: 0,
    bottom: 0,
    backgroundImage: 'url(' + backgroundImage + ')',
    filter: 'blur(15px)',
    [theme.breakpoints.up('sm')]: {
        filter: 'blur(20px)',
        backgroundSize: 'contain'
    }
}));

const AuthBackground = () => {
    return (
        <Box width="100%" height="100%" sx={{ position: 'absolute', zIndex: -1, bottom: 0 }}>
            <BackgroundImage></BackgroundImage>
        </Box>
    );
};

export default AuthBackground;
