import { createMuiTheme } from '@material-ui/core';

export const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#d50000',
    },
  },
  typography: {
    fontFamily: 'Yusei Magic',
    fontSize: 16,
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#c54924',
    },
    secondary: {
      main: '#388e3c',
    },    
  },
  typography: {
    fontFamily: 'Yusei Magic',
    fontSize: 16,
  },
})