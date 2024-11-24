import React from 'react';
import demoVideo from '../../../assets/video/s6packDemo.mp4';
import { styled } from '@mui/material/styles';
import ReactPlayer from 'react-player';
import { Typography } from '@mui/material';

const DemoVideoLayout = styled('section')(({ theme }) => ({
    position: 'relative',
    alignItems: 'center',
    padding: '5px',
    borderRadius: '0px',
    margin: '0px 30px 30px 30px',
    overflow: 'hidden',
    [theme.breakpoints.up('lg')]: {
        height: '720px',
        top: '-60px',
        padding: '0px',
        width: '1280px',
        borderRadius: '20px'
    }
}));

function DemoVideo() {
    return (
        <div style={{ textAlign: 'center' }}>
            <DemoVideoLayout>
                <ReactPlayer
                    width={'100%'}
                    height={'100%'}
                    style={{ borderRadius: '20px' }}
                    loop
                    muted
                    playing
                    playIcon={<button>Play</button>}
                    url={demoVideo}
                />
            </DemoVideoLayout>
            <div style={{ width: '100%', position: 'relative', top: '-30px' }}>
                <Typography component="h3" variant="h3" color="text.primary">
                    <a href="https://github.com/bmiles-development/s6pack-cloud">Download</a> This Project &#8679;
                    <br />
                    <br />
                </Typography>
            </div>
        </div>
    );
}

export default DemoVideo;
