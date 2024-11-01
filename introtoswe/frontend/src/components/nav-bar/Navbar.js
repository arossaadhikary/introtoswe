import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

function NavBar() {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          skillswap
        </Typography>
        <Button color="inherit">Sign In</Button>
        <Button variant="contained" color="primary" sx={{ marginLeft: 1 }}>
          Join
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar