import * as React from 'react';
import { store } from '../../store';
import ProductFeatures from './sections/ProductFeatures';
//import ProductSmokingHero from './sections/ProductSmokingHero';
import AppFooter from './sections/AppFooter';
import ProductHero from './sections/ProductHero';
import ProductValues from './sections/ProductValues';
import AppAppBar from './sections/AppAppBar';
import Snackbar from '../../views/landing/components/Snackbar';
import DemoVideo from './sections/DemoVideo';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { clearSnackBarMessage, setSnackBarOpen } from '../../store/reducers/snackBarMessages';
import ProductSmokingHero from './sections/ProductSmokingHero';
import { Typography } from '@mui/material';

function Front() {
    let snackBarOpen = useSelector((state) => state.snackBarMessages.snackBarOpen);
    let [snackBarMessage] = useState(store.getState().snackBarMessages.snackBarMessage);

    const handleSnackBarClose = () => {
        store.dispatch(setSnackBarOpen(false));
        store.dispatch(clearSnackBarMessage());
    };

    useEffect(() => {
        if (snackBarMessage !== '') {
            store.dispatch(setSnackBarOpen(true));
        }
    }, [snackBarMessage]);

    return (
        <React.Fragment>
            <AppAppBar />
            <ProductHero />
            <div style={{ backgroundColor: '#efefef' }}>
                <DemoVideo />
                <div style={{ backgroundColor: '#fff', padding: '1rem', textAlign: 'center' }}>
                    <Typography component="h3" variant="h3" color="text.primary">
                        {' '}
                        <a href="http://s6pack.build/register/">Test</a> the live demo.
                    </Typography>
                    <Typography component="h5" variant="h5" color="text.primary">
                        Use test crdit card: 4242424242424242
                        <br></br>to check out the example payment plans and their features.
                        <br />
                        <br />
                    </Typography>
                    <Typography component="h3" variant="h3" color="text.primary">
                        Read the <a href="https://docs.s6pack.build/getting-started/welcome/">Docs</a>.
                        <br />
                        <br />
                    </Typography>
                </div>
            </div>
            <ProductValues />
            <ProductFeatures />
            <ProductSmokingHero />
            <AppFooter />
            <Snackbar open={snackBarOpen} closeFunc={handleSnackBarClose} message={snackBarMessage} />
        </React.Fragment>
    );
}

export default Front;
