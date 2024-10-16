import React from 'react';
import demoVideo from '../../../assets/video/s6packDemo.mp4';
import { styled } from '@mui/material/styles';
import ReactPlayer from 'react-player';
import { Typography } from '@mui/material';

const DemoVideoLayout = styled('section')(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '5px',
    [theme.breakpoints.up('lg')]: {
        height: '720px',
        top: '-90px',
        padding: '0px'
    }
}));

function DemoVideo() {
    return (
        <div style={{ textAlign: 'center' }}>
            <DemoVideoLayout width={'100%'}>
                <ReactPlayer width={'100%'} height={'100%'} loop muted playing playIcon={<button>Play</button>} url={demoVideo} />
            </DemoVideoLayout>

            <Typography component="h3" variant="h3" color="text.primary">
                <a href="https://github.com/bmiles-development/s6pack-cloud">Download</a> This Project &#8679;
                <br />
                <br />
            </Typography>
        </div>
    );
}

export default DemoVideo;
