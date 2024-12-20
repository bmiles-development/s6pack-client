import React from 'react';

// project import
import Routes from './routes';
import ThemeCustomization from './themes';
import ScrollTop from './view-components/ScrollTop';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
    return (
        <ThemeCustomization>
            <ScrollTop>
                <Routes />
            </ScrollTop>
        </ThemeCustomization>
    );
};

export default App;
