import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff', // White color for primary elements
    },
    secondary: {
      main: '#000000', // Black color for secondary elements
    },
    background: {
      default: '#ffffff', // White background color
      paper: '#ffffff',   // Black color for paper components
    },
    text: {
      primary: '#000000', // Black text
      secondary: '#3e3636', // Darker black text (adjust as needed)
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000', // Black AppBar background
          color: '#ffffff',
        },
      },
    },
  },
  typography: {
    fontFamily: 'Bebas Neue, Belleza, sans-serif',
    h1: {
      fontFamily: 'Bebas Neue, sans-serif',
    },
    h2: {
      fontFamily: 'Bebas Neue, sans-serif',
    },
    h3: {
      fontFamily: 'Bebas Neue, sans-serif',
    },
    h4: {
      fontFamily: 'Bebas Neue, sans-serif',
    },
    h5: {
      fontFamily: 'Bebas Neue, sans-serif',
    },
    h6: {
      fontFamily: 'Bebas Neue, sans-serif',
    },
    body1: {
      fontFamily: 'Belleza, sans-serif',
    },
    body2: {
      fontFamily: 'Belleza, sans-serif',
    },
    subtitle1: {
      fontFamily: 'Belleza, sans-serif',
    },
    subtitle2: {
      fontFamily: 'Belleza, sans-serif',
    },
    button: {
      fontFamily: 'Bebas Neue, sans-serif',
    },
  },
});

export default theme;
