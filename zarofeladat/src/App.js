import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import WalletsScreen from './screens/WalletsScreen';
// import { ThemeProvider } from '@mui/material/styles';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoginScreen />} path="/" />
        <Route element={<WalletsScreen />} path="/wallets" />
        <Route element={<h1>404 - Not found</h1>} path="*" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
