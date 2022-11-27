import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { AuthContextProvider } from './hooks/useAuth';

const theme = createTheme({});

export default function Providers({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </AuthContextProvider>
    </ThemeProvider>
  );
}
