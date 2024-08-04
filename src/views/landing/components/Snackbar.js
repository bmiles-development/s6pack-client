import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import MuiSnackbar from '@mui/material/Snackbar';
import { snackbarContentClasses } from '@mui/material/SnackbarContent';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
//import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import { SnackbarContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const styles = ({ theme }) => ({
    [`& .${snackbarContentClasses.root}`]: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.text.primary,
        flexWrap: 'inherit',
        [theme.breakpoints.up('md')]: {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 4,
            borderBottomLeftRadius: 4
        }
    },
    [`& .${snackbarContentClasses.message}`]: {
        fontSize: 16,
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'pre-wrap'
    },
    [`& .${snackbarContentClasses.action}`]: {
        paddingLeft: theme.spacing(2)
    },
    '& .MuiSnackbarContent-info': {
        flexShrink: 0,
        marginRight: theme.spacing(2)
    },
    '& .MuiSnackbarContent-close': {
        padding: theme.spacing(1)
    }
});

function Transition(props) {
    return <Slide {...props} direction="down" timeout={{ appear: 500, enter: 500, exit: 0 }} />;
}

function Snackbar(props) {
    const theme = useTheme();
    const { message, closeFunc, alertColor = 'success', ...other } = props;
    const classes = {
        info: 'MuiSnackbarContent-info',
        close: 'MuiSnackbarContent-close'
    };

    return (
        <MuiSnackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={10000}
            TransitionComponent={Transition}
            {...other}
        >
            <SnackbarContent
                style={{
                    backgroundColor: alertColor == 'success' ? theme.palette.success.light : theme.palette.error.light
                }}
                action={[
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        className={classes.close}
                        onClick={() => closeFunc && closeFunc()}
                    >
                        <CloseIcon />
                    </IconButton>
                ]}
                message={
                    <React.Fragment>
                        <span>{message}</span>
                    </React.Fragment>
                }
            />
        </MuiSnackbar>
    );
}

Snackbar.propTypes = {
    closeFunc: PropTypes.func,
    /**
     * The message to display.
     */
    message: PropTypes.node,
    alertColor: PropTypes.string
};

export default styled(Snackbar)(styles);
