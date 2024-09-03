// material-ui
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Button, Stack } from '@mui/material';

// assets
import Github from '../../../assets/images/icons/github.svg';
import Twitter from '../../../assets/images/icons/twitter.svg';
import Discord from '../../../assets/images/icons/discord.svg';
import { useNavigate } from 'react-router';

// ==============================|| FIREBASE - SOCIAL BUTTON ||============================== //

const FirebaseSocial = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    const githubHandler = async () => {
        return navigate('https://github.com/bmiles-development/s6pack-client');
    };

    const twitterHandler = async () => {
        return navigate('https://x.com/s6pack_build');// login || singup
    };

    const discordHandler = async () => {
        return navigate('https://discord.gg/84bWSVbq');
    };

    return (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={matchDownSM ? 1 : 2}>
            <Button
                variant="outlined"
                color="secondary"
                fullWidth={!matchDownSM}
                startIcon={<img src={Github} alt="Github" width="16px" />}
                onClick={githubHandler}
            >
                {!matchDownSM && 'Github'}
            </Button>
            <Button
                variant="outlined"
                color="secondary"
                fullWidth={!matchDownSM}
                startIcon={<img src={Twitter} alt="Twitter" />}
                onClick={twitterHandler}
            >
                {!matchDownSM && 'Twitter'}
            </Button>
            <Button
                variant="outlined"
                color="secondary"
                fullWidth={!matchDownSM}
                startIcon={<img src={Discord} alt="Discord" width="16px" />}
                onClick={discordHandler}
            >
                {!matchDownSM && 'Discord'}
            </Button>
        </Stack>
    );
};

export default FirebaseSocial;
