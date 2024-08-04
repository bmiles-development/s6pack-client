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
    px: 5,
    justifyContent: 'left'
};

function ProductFeatures() {
    return (
        <Box component="section" sx={{ display: 'block', overflow: 'hidden' }}>
            <Container sx={{ mt: 15, mb: 5, display: 'flex', position: 'relative' }}>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={6} sx={{ pb: 20, bgcolor: 'primary.light' }}>
                        <Box sx={item}>
                            <Typography variant="h3" sx={{ my: 5 }}>
                                Deployment and Development Simplicity and Redundancy
                            </Typography>
                            <Typography variant="h5">
                                {
                                    'Blue/Green Deployment Stacks, Your own Dev Stack, and as many other stacks with just a couple lines of code per stack. '
                                }
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={item}></Box>
                    </Grid>
                </Grid>
            </Container>
            <Container sx={{ mt: 15, mb: 5, display: 'flex', position: 'relative' }}>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={6}>
                        <Box sx={item}></Box>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ pb: 20, bgcolor: 'secondary.light' }}>
                        <Box sx={item}>
                            <Typography variant="h3" sx={{ my: 5 }}>
                                GraphQL API Cloud Service
                            </Typography>
                            <Typography variant="h5">
                                {
                                    'AWS Appsync GraphQL API using AWS Step Functions provide a powerful application interface and tool set. Build your own Step Function applications or Lambda code (or Both) to take advantage of AWS`s unparalleled monitoring and logging services.'
                                }
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Container sx={{ mt: 15, mb: 5, display: 'flex', position: 'relative' }}>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={6} sx={{ pb: 20, bgcolor: 'primary.200' }}>
                        <Box sx={item}>
                            <Typography variant="h3" sx={{ my: 5 }}>
                                Cloud Infrascructure as Code
                            </Typography>
                            <Typography variant="h5">
                                {
                                    'Comes out of the box with AWS and Stripe infrastructure Backend deployed with node.js Terraform CDKTF. With Terraform, you can access your.'
                                }
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={item}></Box>
                    </Grid>
                </Grid>
            </Container>
            <Container sx={{ mt: 15, mb: 5, display: 'flex', position: 'relative' }}>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={6}>
                        <Box sx={item}></Box>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ pb: 20, bgcolor: 'primary.lighter' }}>
                        <Box sx={item}>
                            <Typography variant="h3" sx={{ my: 5 }}>
                                SPA Client App
                            </Typography>
                            <Typography variant="h5">
                                {
                                    'Using React.js, AWS amplify for User Authentiation, and Apollo Client for Graphql requests with browser cashing for optimal speed and minimal server requests.'
                                }
                                <br />
                                <br />
                                {'Special thanks to '}
                                <Link to="https://mui.com/store/items/onepirate/" target="_blank">
                                    OnePirate
                                </Link>
                                {' for landingpage theme and '}
                                <Link to="https://dev.to/codedthemes/introducing-mantis-m-ant-is-pi6" target="_blank">
                                    Mantis2
                                </Link>
                                {' for the admin page templates.'}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ProductFeatures;
