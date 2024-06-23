import { createTheme } from '@mui/material/styles';

const primary = '#C49261';
const secondary = '#022426';

export const lightTheme = createTheme({
  typography: {
    fontFamily: 'DM Sans, Arial',
  },
  palette: {
    mode: 'light',
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
    background: {
      default: '#EBEDED',
      paper: '#FDFDFD',
    },
    success: {
      main: '#1CBA76',
    },
    error: {
      main: '#D43D28',
    },
  },
});
