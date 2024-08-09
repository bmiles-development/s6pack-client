import React from 'react';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, Container, Divider, GlobalStyles, Typography } from '@mui/material';

// project import
import Highlighter from './cards/Highlighter';

// ==============================|| CUSTOM - MAIN CARD ||============================== //

const MainCard = forwardRef(
    (
        {
            border = false,
            boxShadow,
            children,
            content = true,
            contentSX = {},
            divider = false,
            elevation,
            shadow,
            sx = {},
            title,
            codeHighlight,
            ...others
        },
        ref
    ) => {
        const theme = useTheme();
        boxShadow = theme.palette.mode === 'dark' ? boxShadow || true : boxShadow;

        return (
            <Card
                elevation={elevation || 0}
                ref={ref}
                {...others}
                sx={{
                    ...sx,
                    border: border ? '1px solid' : 'none',
                    borderRadius: 2,
                    borderColor: theme.palette.mode === 'dark' ? theme.palette.divider : theme.palette.grey.A800,
                    boxShadow: boxShadow && (!border || theme.palette.mode === 'dark') ? shadow || theme.customShadows.z1 : 'inherit',
                    ':hover': {
                        boxShadow: boxShadow ? shadow || theme.customShadows.z1 : 'inherit'
                    },
                    '& pre': {
                        m: 0,
                        p: '16px !important',
                        fontFamily: theme.typography.fontFamily,
                        fontSize: '0.75rem'
                    }
                }}
            >
                <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
                {/* card header and action */}
                {title && (
                    <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6, border: false }}>
                        <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                            {title}
                        </Typography>
                    </Container>
                )}

                {/* content & header divider */}
                {title && divider && <Divider />}

                {/* card content */}
                {content && <CardContent sx={contentSX}>{children}</CardContent>}
                {!content && children}

                {/* card footer - clipboard & highlighter  */}
                {codeHighlight && (
                    <>
                        <Divider sx={{ borderStyle: 'dashed' }} />
                        <Highlighter codeHighlight={codeHighlight} main>
                            {children}
                        </Highlighter>
                    </>
                )}
            </Card>
        );
    }
);

MainCard.propTypes = {
    border: PropTypes.bool,
    boxShadow: PropTypes.bool,
    contentSX: PropTypes.object,
    divider: PropTypes.bool,
    elevation: PropTypes.number,
    shadow: PropTypes.string,
    sx: PropTypes.object,
    title: PropTypes.string,
    codeHighlight: PropTypes.bool,
    content: PropTypes.bool,
    children: PropTypes.node
};

MainCard.displayName = 'MainCard';

export default MainCard;
