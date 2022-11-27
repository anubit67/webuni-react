import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Providers from './Providers';
import LoginScreen from './screens/LoginScreen';
import WalletsScreen from './screens/WalletsScreen';

function App() {
  return (
    <Providers>
      <Routes>
        <Route element={<LoginScreen />} path="/" />
        <Route element={<WalletsScreen />} path="/wallets" />
        <Route element={<h1>404 - Not found</h1>} path="*" />
      </Routes>
    </Providers>
  );
}

export default App;
