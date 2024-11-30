import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginDialog = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Track password visibility

  // Check if both fields are filled
  const isFormValid = email.trim() && password.trim();

  // Toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent sx={{ padding: 4 }}>
        <Typography 
          variant="h5" 
          fontWeight="bold" 
          gutterBottom
          sx={{
            mb: '20px',
            textAlign: 'center',
          }}
        >
          Welcome Back to Skillswap.
        </Typography>
        <Box component="form" display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'} // Show/hide password based on state
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Login Button */}
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth
            disabled={!isFormValid} // Disable button if form is invalid
            sx={{
              backgroundColor: isFormValid ? 'primary.main' : '#CCCCCC',
              color: isFormValid ? 'white' : '#333333',
            }}
          >
            Login
          </Button>

          <Typography
            sx={{
              fontSize: '13px',
              fontStyle: 'italic',
              textAlign: 'center',
            }}
          >
            Need an account? Create one.
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
