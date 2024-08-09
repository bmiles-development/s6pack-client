import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import { Link } from 'react-router-dom';

const item = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    px: 2,
    justifyContent: 'left'
};

function ProductValues() {
    return (
        <Box component="section" sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'primary.lighter' }}>
            <Container sx={{ mt: 15, mb: 15, display: 'flex', position: 'relative' }}>
                <Box component="img" alt="curvy lines" sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }} />
                <Grid container spacing={0}>
                    <Grid item xs={12} md={3}>
                        <Box sx={item}>
                            <Typography variant="h3" sx={{ my: 5 }}>
                                Serverless
                            </Typography>
                            <Typography variant="h5">
                                {'No need to manage any infrastructure, pay for what you use with cloud infrastructure deployed using '}
                                <Link to="https://terraform.io" target="_blank">
                                    Terraform
                                </Link>
                                {' Infrastructure as Code.'}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Box sx={item}>
                            <Typography variant="h3" sx={{ my: 5 }}>
                                Scalable
                            </Typography>
                            <Typography variant="h5">{'From zero to millions of users.'}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Box sx={item}>
                            <Typography variant="h3" sx={{ my: 5 }}>
                                Secure
                            </Typography>
                            <Typography variant="h5">{'User Authentication/Management syetem using AWS Cognito.'}</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Box sx={item}>
                            <Typography variant="h3" sx={{ my: 5 }}>
                                SaaS Starter Pack
                            </Typography>
                            <Typography variant="h5">
                                {
                                    'Multitenant out-of-the-box. Payment Plan system out-of-the-box. Focus on building your core SaaS App without developing boilerplate.'
                                }
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ProductValues;
