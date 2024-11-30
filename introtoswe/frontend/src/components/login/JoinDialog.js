import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Box, Typography } from '@mui/material';

const LoginDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent sx={{ padding: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Login
        </Typography>
        <Box component="form" display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
          />
          <Button variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
