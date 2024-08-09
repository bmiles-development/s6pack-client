import React from 'react';
import PropTypes from 'prop-types';
import MainCard from '../../view-components/MainCard';
import ContactForm from '../../view-components/ContactForm';

// material-ui

function ContactUs(props) {
    const {
        title = 'Contact Us',
        subject = 'Enterprise Pricing Options Request',
        body = 'I would like to request enterprise pricing options that you have available.',
        captcha = true
    } = props;
    let mainCard = (
        <MainCard title={title}>
            <ContactForm subject={subject} body={body} captcha={captcha}></ContactForm>
        </MainCard>
    );

    return mainCard;
}

ContactUs.propTypes = {
    title: PropTypes.string,
    subject: PropTypes.string,
    body: PropTypes.string,
    captcha: PropTypes.bool
};

export default ContactUs;
