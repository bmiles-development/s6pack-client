// material-ui
import { createTheme } from '@mui/material/styles';

// third-party
import { red, amber, cyan, green, grey } from '@mui/material/colors';

// ==============================|| DEFAULT THEME - PALETTE  ||============================== //
const contrastText = '#fff';

const getDesignTokens = (mode) => ({
    palette: {
        ...(mode === 'light'
            ? {
                  // palette values for light mode
                  common: {
                      black: '#000',
                      white: '#fff'
                  },
                  primary: {
                      lighter: cyan[50],
                      100: cyan[100],
                      200: cyan[200],
                      light: cyan[300],
                      400: cyan[400],
                      main: cyan[500],
                      dark: cyan[600],
                      700: cyan[700],
                      darker: cyan[800],
                      900: cyan[900]
                  },
                  secondary: {
                      lighter: grey[100],
                      100: grey[100],
                      200: grey[200],
                      light: grey[300],
                      400: grey[400],
                      main: grey[500],
                      600: grey[600],
                      dark: grey[700],
                      800: grey[800],
                      darker: grey[900],
                      A100: grey[50],
                      A200: grey[400],
                      A300: grey[700],
                      contrastText: grey[50]
                  },
                  error: {
                      lighter: red[50],
                      light: red[200],
                      main: red[400],
                      dark: red[700],
                      darker: red[900],
                      contrastText
                  },
                  warning: {
                      lighter: amber[50],
                      light: amber[300],
                      main: amber[500],
                      dark: amber[700],
                      darker: amber[900],
                      contrastText: grey[100]
                  },
                  info: {
                      lighter: cyan[50],
                      light: cyan[300],
                      main: cyan[500],
                      dark: cyan[700],
                      darker: cyan[900],
                      contrastText
                  },
                  success: {
                      lighter: green[50],
                      light: green[300],
                      main: green[500],
                      dark: green[700],
                      darker: green[900],
                      contrastText
                  },
                  text: {
                      primary: grey[900],
                      secondary: grey[700],
                      disabled: grey[400]
                  },
                  action: {
                      disabled: grey[300]
                  },
                  divider: grey[200],
                  background: {
                      paper: grey[50],
                      default: grey[50]
                  }
              }
            : {
                  // palette values for dark mode
                  common: {
                      black: '#000',
                      white: '#ccc'
                  },
                  primary: {
                      lighter: cyan[700],
                      100: cyan[700],
                      200: cyan[700],
                      light: cyan[700],
                      400: cyan[800],
                      main: cyan[900],
                      dark: cyan[900],
                      700: cyan[900],
                      darker: cyan[900],
                      900: cyan[900]
                  },
                  secondary: {
                      lighter: grey[500],
                      100: grey[500],
                      200: grey[600],
                      light: grey[700],
                      400: grey[800],
                      main: grey[900],
                      600: grey[900],
                      dark: grey[900],
                      800: grey[900],
                      darker: grey[900],
                      A100: grey[500],
                      A200: grey[900],
                      A300: grey[900],
                      contrastText: grey[500]
                  },
                  error: {
                      lighter: red[500],
                      light: red[600],
                      main: red[700],
                      dark: red[800],
                      darker: red[900],
                      contrastText
                  },
                  warning: {
                      lighter: amber[500],
                      light: amber[600],
                      main: amber[700],
                      dark: amber[800],
                      darker: amber[900],
                      contrastText: grey[500]
                  },
                  info: {
                      lighter: cyan[500],
                      light: cyan[600],
                      main: cyan[700],
                      dark: cyan[800],
                      darker: cyan[900],
                      contrastText
                  },
                  success: {
                      lighter: green[500],
                      light: green[600],
                      main: green[700],
                      dark: green[800],
                      darker: green[900],
                      contrastText
                  },
                  text: {
                      primary: grey[800],
                      secondary: grey[900],
                      disabled: grey[700]
                  },
                  action: {
                      disabled: grey[700]
                  },
                  divider: grey[600],
                  background: {
                      paper: grey[500],
                      default: grey[200]
                  }
              })
    }
});

const Palette = (mode) => {
    return createTheme(getDesignTokens(mode));
};

export default Palette;
