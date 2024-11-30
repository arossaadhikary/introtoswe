import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import LoginDialog from '../login/LoginDialog'; 
import JoinDialog from '../login/JoinDialog';

function NavBar() {
  const [openLogin, setOpenLogin] = useState(false); // State for LoginDialog
  const [openJoin, setOpenJoin] = useState(false); // State for JoinDialog

  const handleOpenLogin = () => setOpenLogin(true); // Open LoginDialog
  const handleCloseLogin = () => setOpenLogin(false); // Close LoginDialog

  const handleOpenJoin = () => setOpenJoin(true); // Open JoinDialog
  const handleCloseJoin = () => setOpenJoin(false); // Close JoinDialog

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            skillswap
          </Typography>

          {/* Sign In Button */}
          <Button color="inherit" onClick={handleOpenLogin}>
            Sign In
          </Button>

          {/* Join Button */}
          <Button
            variant="contained"
            sx={{backgroundColor: '#333333', ml: '5px'}}
            onClick={handleOpenJoin}
          >
            Join
          </Button>
        </Toolbar>
      </AppBar>

      {/* Dialog Components */}
      <LoginDialog open={openLogin} onClose={handleCloseLogin} />
      <JoinDialog open={openJoin} onClose={handleCloseJoin} />
    </>
  );
}

export default NavBar;
