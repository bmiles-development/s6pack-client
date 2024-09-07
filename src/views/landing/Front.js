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
import { clearSnackBarMessage, setSnackBarOpen } from '../../store/reducers/snackBarMessages';
import ProductSmokingHero from './sections/ProductSmokingHero';

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
