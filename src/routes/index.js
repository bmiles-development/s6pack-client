import React from 'react';
import { useRoutes } from 'react-router-dom';

// project import
import LoginRoutes from './LandingRoutes';
import MainRoutes from './AdminRoutes';

// ==============================|| ROUTING RENDER ||============================== //

function ThemeRoutes() {
    return <div>{useRoutes([LoginRoutes, MainRoutes])}</div>;
}
export default ThemeRoutes;
