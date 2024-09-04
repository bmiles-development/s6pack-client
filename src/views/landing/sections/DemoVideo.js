import React from 'react';
import demoVideo from '../../../assets/video/s6packDemo.mp4';
import { styled } from '@mui/material/styles';
import ReactPlayer from 'react-player';

const DemoVideoLayout = styled('section')(({ theme }) => ({
    color: theme.palette.secondary.light,
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '5px',
    [theme.breakpoints.up('lg')]: {
        height: '800px',
        top: '-60px'
    }
}));

function DemoVideo() {
    return (
        <DemoVideoLayout width={'100%'}>
            <ReactPlayer width={'100%'} height={'100%'} loop muted playing playIcon={<button>Play</button>} url={demoVideo} />
        </DemoVideoLayout>
    );
}

export default DemoVideo;
