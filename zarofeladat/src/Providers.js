import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import {
  createContext, useContext, useMemo, useState,
} from 'react';
import { AuthContextProvider } from './hooks/useAuth';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function useMyTheme() {
  return useContext(ColorModeContext);
}

export default function Providers({ children }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const lightTheme = {
    type: 'light',
    primary: {
      main: '#8bc34a',
    },
    secondary: {
      main: '#ff9100',
    },
    success: {
      main: '#33691e',
    },
    background: {
      default: '#eeeeee',
    },
  };

  const darkTheme = {
    mode: 'dark',
    primary: {
      main: '#8bc34a',
    },
    secondary: {
      main: '#ff9100',
    },
    success: {
      main: '#33691e',
    },
  };

  const theme = useMemo(
    () => createTheme({
      palette: mode === 'light' ? lightTheme : darkTheme,
      typography: {
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
      },
    }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <AuthContextProvider>
            <BrowserRouter>
              {children}
            </BrowserRouter>
          </AuthContextProvider>
        </CssBaseline>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
