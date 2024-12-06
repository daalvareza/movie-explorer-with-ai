import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Default blue color
    },
    secondary: {
      main: '#dc004e', // Default pink color
    },
    background: {
      default: '#f5f5f5', // Light gray background
    },
  },
  typography: {
    fontFamily: `'Roboto', 'Helvetica', 'Arial', sans-serif`,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none', // Prevent uppercase transformation
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Rounded buttons
        },
      },
    },
  },
});

export default theme;