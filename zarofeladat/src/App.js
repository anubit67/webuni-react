import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import LoginScreen from './screens/login/LoginScreen';
import OneWalletScreen from './screens/onewallet/OneWalletScreen';
import MyWalletsScreen from './screens/wallets/MyWalletsScreen';
import WalletsScreen from './screens/wallets/WalletsScreen';

function App() {
  const { authToken } = useAuth();

  if (authToken) {
    return (
      <Routes>
        <Route element={<WalletsScreen />} path="/wallets" />
        <Route element={<MyWalletsScreen />} path="/mywallets" />
        <Route element={<OneWalletScreen />} path="wallet/:id" />
        <Route path="/" element={<Navigate to="/wallets" replace />} />
        <Route element={<h1>404 - Not found</h1>} path="*" />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route element={<LoginScreen />} path="/" />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
