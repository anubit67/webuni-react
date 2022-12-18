import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {
  Divider, IconButton, Menu, MenuItem,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useTheme } from '@emotion/react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useAuth } from '../hooks/useAuth';
import { useMyTheme } from '../Providers';

function MenuBar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout, sessionUser } = useAuth();
  const { toggleColorMode } = useMyTheme();
  const theme = useTheme();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => {
              navigate('/wallets');
            }}
          >
            Wallet App
          </Typography>
          <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <div>
            <IconButton
              size="large"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Typography sx={{ p: 1 }} variant="h5" textAlign="center">
                {sessionUser.name}
              </Typography>
              <Divider />
              <MenuItem onClick={() => navigate('/mywallets')}>My wallets</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MenuBar;
