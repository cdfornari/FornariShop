import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1E1E1E'
    },
    secondary: {
      main: '#3A64D8'
    },
    info: {
      main: '#FFF'
    }
  },
  typography: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto','Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
    fontWeightMedium: 600,
    allVariants: {
      letterSpacing: -0.5
    }
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'none'
      },
      styleOverrides: {
        root: {
          cursor: 'pointer'
        }
      }
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: 'fixed',
      },
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          backdropFilter: 'blur(10px)',
          height: 60,
        },
      }
    },

    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: 30,
          fontWeight: 900,
          letterSpacing: -1
        },
        h2: {
          fontSize: 20,
          fontWeight: 500
        },
        h6: {
          fontWeight: 800
        },
        subtitle1: {
          fontSize: 18,
          fontWeight: 700
        }
      }
    },

    MuiButton: {
      defaultProps: {
        variant: 'contained',
        size: 'small',
        disableElevation: true,
        color: 'info'
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          borderRadius: 10,
          ":hover": {
            backgroundColor: 'rgba(90,90,90,0.1)',
            color: '#1E1E1E',
            transition: 'all 0.3s ease-in-out'
          }
        },
        text: {
          ":hover": {
            color: 'rgb(211, 47, 47)'
          }
        },
        containedSecondary: {
          borderRadius: '30px',
          ":hover": {
            backgroundColor: '#274494',
            color: 'rgba(250,250,250,0.95)'
          }
        }
      }
    },
  
    MuiCard: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          boxShadow: '0px 5px 5px rgba(0,0,0,0.05)',
          borderRadius: '10px'
        }
      }
    }
    
  }
});