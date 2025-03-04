import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import backgroundImage from '../../../assets/images/stations.svg'; // use this to remove svg to jsxc errors: https://www.svgminify.com/
import { Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';

const ProductHeroLayout = styled('section')(({ theme }) => ({
    color: theme.palette.common.white,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 300,
    [theme.breakpoints.up('sm')]: {
        minHeight: 600
    },
    [theme.breakpoints.up('md')]: {
        alignItems: 'end'
    },
    [theme.breakpoints.up('lg')]: {
        minHeight: 800
    },
    [theme.breakpoints.up('xl')]: {
        minHeight: 800
    }
}));

const Background = styled(Box)(({ theme }) => ({
    color: theme.palette.common.white,
    backgroundColor: '#ff7600',
    position: 'absolute',
    backgroundRepeat: 'no-repeat',
    left: '-40px',
    right: 0,
    top: '3px',
    bottom: 0,
    backgroundSize: 'cover',
    zIndex: -2,
    [theme.breakpoints.up('lg')]: {
        minHeight: 700,
        backgroundImage: 'url(' + backgroundImage + ')',
        backgroundSize: '750px',
        backgroundPosition: '0px 80px'
    },
    [theme.breakpoints.up('xl')]: {
        minHeight: 900,
        backgroundImage: 'url(' + backgroundImage + ')',
        backgroundSize: '850px',
        backgroundPosition: '0px 60px'
    }
}));

const BoxImage = styled(Box)(({}) => ({
    alt: 'stations',
    width: '100%'
}));

const BoxImageSmall = styled(BoxImage)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'none'
    }
}));

const BoxImageLarge = styled(BoxImage)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.up('md')]: {
        display: 'flex'
    },
    [theme.breakpoints.up('lg')]: {
        display: 'none'
    }
}));

const ListBox = styled(Box)(({ theme }) => ({
    top: '-20px',
    paddingTop: '20px',
    paddingBottom: '20px',
    paddingLeft: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
        padding: 0,
        position: 'absolute',
        top: '-10%',
        left: '65%'
    },
    [theme.breakpoints.up('lg')]: {
        top: 0,
        left: '55%'
    },
    [theme.breakpoints.up('xl')]: {
        top: 0,
        left: '65%'
    }
}));

const Superscript = styled(Typography)(({}) => ({
    fontSize: '0.7rem',
    borderBottom: 'none',
    padding: 0,
    verticalAlign: 'top'
}));

const ListTableCellRight = styled(TableCell)(({ theme }) => ({
    display: 'flex',
    fontSize: '1.5rem',
    color: theme.palette.common.white,
    borderBottom: 'none',
    padding: 0,
    verticalAlign: 'center',
    [theme.breakpoints.up('lg')]: {
        fontSize: '2rem'
    }
}));

const Title = styled(Box)(({ theme }) => ({
    fontSize: '2rem',
    color: theme.palette.common.white,
    borderBottom: 'none',
    padding: 0,
    width: '100%',
    justifyContent: 'center',
    [theme.breakpoints.up('lg')]: {
        fontSize: '2.5rem'
    }
}));

function ProductHero() {
    return (
        <ProductHeroLayout>
            <Title sx={{ display: 'flex', py: 4, px: 2, justifyItems: 'center' }}>
                <Box sx={{ display: 'block' }}>
                    <Typography sx={{ textAlign: 'center', pt: 2, pb: 1 }} variant="h1">
                        Create Your Subscription-Based Web App.{' '}
                    </Typography>
                    <Typography sx={{ textAlign: 'center' }} variant="h3">
                        Get Started by Downloading the Open Source Code for This Demo Site.{' '}
                    </Typography>
                </Box>
            </Title>
            <BoxImageSmall component={'img'} src={backgroundImage}></BoxImageSmall>
            <BoxImageLarge component={'img'} src={backgroundImage}></BoxImageLarge>

            <ListBox sx={{ width: '180px', height: '100%' }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <ListTableCellRight>
                                S<Superscript>1</Superscript>erverless
                            </ListTableCellRight>
                        </TableRow>
                        <TableRow>
                            <ListTableCellRight>
                                S<Superscript>2</Superscript>ecure
                            </ListTableCellRight>
                        </TableRow>
                        <TableRow>
                            <ListTableCellRight>
                                S<Superscript>3</Superscript>calable
                            </ListTableCellRight>
                        </TableRow>
                        <TableRow>
                            <ListTableCellRight>
                                S<Superscript>4</Superscript>oftware&nbsp;as&nbsp;a
                            </ListTableCellRight>
                        </TableRow>
                        <TableRow>
                            <ListTableCellRight>
                                S<Superscript>5</Superscript>ervice
                            </ListTableCellRight>
                        </TableRow>
                        <TableRow>
                            <ListTableCellRight>
                                S<Superscript>6</Superscript>tarter
                            </ListTableCellRight>
                        </TableRow>
                        <TableRow>
                            <ListTableCellRight>Pack</ListTableCellRight>
                        </TableRow>
                    </TableBody>
                </Table>
            </ListBox>
            <Background />
        </ProductHeroLayout>
    );
}

export default ProductHero;
