import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import logo from '../assets/VULCOM-logo-600px.webp'
import MainMenu from './MainMenu'
import AuthControl from './AuthControl'

export default function TopBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <MainMenu />
          <Box sx={{ flexGrow: 1 }}>
            <img src={logo} alt="Logotipo VULCOM" style={{ width: '300px' }} />
          </Box>
          <AuthControl />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
