import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
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
  const [mode, setMode] = useState('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () => createTheme({
      palette: {
        mode,
      },
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
