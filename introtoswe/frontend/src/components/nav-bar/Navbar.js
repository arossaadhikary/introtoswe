import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import LoginDialog from '../login/LoginDialog'; 
import JoinDialog from '../login/JoinDialog';

function NavBar() {
  const [openLogin, setOpenLogin] = useState(false);

  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            skillswap
          </Typography>
          <Button color="inherit" onClick={handleOpenLogin}>Sign In</Button>
          <Button variant="contained" color="primary" sx={{ marginLeft: 1 }} onClick={handleOpenLogin}>
            Join
          </Button>
        </Toolbar>
      </AppBar>

      <LoginDialog open={openLogin} onClose={handleCloseLogin} />
    </>
  );
}

export default NavBar;
