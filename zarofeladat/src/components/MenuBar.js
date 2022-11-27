/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../hooks/useAuth';

function MenuBar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => {
              navigate('/wallets');
            }}
          >
            Wallet App
          </Typography>
          <LogoutIcon fontSize="medium" onClick={handleLogout} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MenuBar;
