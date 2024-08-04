import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import ContactForm from '../../../view-components/ContactForm';

function ProductSmokingHero() {
    return (
        <Container
            id="contact"
            component="section"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                my: 15,
                width: '40%',
                minWidth: '367px'
            }}
        >
            <Typography variant="h4" component="span" sx={{ pb: 4 }}>
                Email Us
            </Typography>
            <ContactForm subject="General Question" body="I would Like..."></ContactForm>
        </Container>
    );
}

export default ProductSmokingHero;
