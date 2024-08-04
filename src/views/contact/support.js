import React from 'react';
import MainCard from '../../view-components/MainCard';
import ContactUs from './contactUs';

const Support = () => {
    let mainCard = (
        <MainCard>
            <ContactUs title="Support" subject="" body="" captcha={false}></ContactUs>
        </MainCard>
    );
    return mainCard;
};

export default Support;
