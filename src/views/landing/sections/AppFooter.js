import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import TextField from '../components/TextField';
import FirebaseSocial from '../components/FirebaseSocial';

function Copyright() {
    return (
        <React.Fragment>
            {'© '}
            s6pack&nbsp;
            {new Date().getFullYear()}
        </React.Fragment>
    );
}

const LANGUAGES = [
    {
        code: 'en-US',
        name: 'English'
    }
];

export default function AppFooter() {
    return (
        <Typography component="footer" sx={{ display: 'flex', bgcolor: 'secondary.light' }}>
            <Container sx={{ my: 8 }}>
                <Grid container spacing={12}>
                    <Grid item>
                        <Grid container direction="column" justifyContent="center" spacing={2} sx={{ height: 120 }}>
                            <Grid item>
                                <FirebaseSocial></FirebaseSocial>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" marked="left" gutterBottom>
                            Legal
                        </Typography>
                        <Box component="ul" sx={{ m: 0, listStyle: 'none', p: 0 }}>
                            <Box component="li" sx={{ py: 0.5 }}>
                                <Link href="/privacy.html">Privacy</Link>
                            </Box>
                            <Box component="li" sx={{ py: 0.5 }}>
                                <Link href="/terms.md">Terms of Use</Link>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" marked="left" gutterBottom>
                            Support
                        </Typography>
                        <Box component="ul" sx={{ m: 0, listStyle: 'none', p: 0 }}>
                            <Box component="li" sx={{ py: 0.5 }}>
                                <Link href="https://docs.s6pack.build/getting-started/welcome/">Documentation</Link>
                            </Box>
                            <Box component="li" sx={{ py: 0.5 }}>
                                <Link href="#contact">Contact</Link>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" marked="left" gutterBottom>
                            Language
                        </Typography>
                        <TextField
                            select
                            size="medium"
                            variant="standard"
                            SelectProps={{
                                native: true
                            }}
                            sx={{ mt: 1, width: 150 }}
                        >
                            {LANGUAGES.map((language) => (
                                <option value={language.code} key={language.code}>
                                    {language.name}
                                </option>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
                <Copyright />
            </Container>
        </Typography>
    );
}
