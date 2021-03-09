import { createMuiTheme } from '@material-ui/core';

export const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#ef6c00',
    },
    secondary: {
      main: '#5D4037',
    },
    background: {
      default: '#fff8e1',
      paper: '#fff',
    },
    text: {
      primary: '#6d4c41',
    },
  },
  props: {
    MuiTooltip: {
      arrow: true,
    },
  },
})

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
})