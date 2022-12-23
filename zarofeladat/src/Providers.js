import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import {
  createContext, useContext, useMemo, useState,
} from 'react';
import {
  grey, lightGreen, orange,
} from '@mui/material/colors';
import { AuthContextProvider } from './hooks/useAuth';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function useMyTheme() {
  return useContext(ColorModeContext);
}

export default function Providers({ children }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light');

  const lightTheme = {
    primary: lightGreen,
    secondary: orange,
    neutral: {
      main: '#eee',
    },
    text: {
      primary: grey[900],
      secondary: grey[800],
    },
    background: {
      default: grey[100],
    },
  };

  const darkTheme = {
    primary: lightGreen,
    secondary: orange,
    neutral: {
      main: '#bbb',
      contrastText: '#000000',
    },
    text: {
      primary: '#fff',
      secondary: grey[500],
    },
  };

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const getDesignTokens = (m) => ({
    palette: {
      mode: m,
      ...(m === 'light'
        ? lightTheme : darkTheme
      ),
    },
  });

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme>
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
