import React, { useState } from 'react';
import { Dialog, DialogContent, TextField, Button, Box, Typography, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginDialog = ({ open, onClose }) => {
  // State for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation rules
  const hasUppercase = /[A-Z]/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasMinLength = password.length >= 8;

  // Check if all fields, email, +  password are valid => if valid then finally user can submit
  const isFormValid =
    firstName.trim() &&
    lastName.trim() &&
    isValidEmail(email) &&
    hasUppercase &&
    hasSymbol &&
    hasMinLength;

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent sx={{ padding: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom textAlign="center">
          Welcome to SkillSwap.
        </Typography>
        <Typography
          gutterBottom
          sx={{
            fontSize: '15px',
            fontStyle: 'italic',
            textAlign: 'center',
            mt: '-5px',
            mb: '20px',
          }}
        >
          Let's Get Signed Up.
        </Typography>

        <Box component="form" display="flex" flexDirection="column" gap={2}>
          <TextField
            label="First Name"
            type="text"
            variant="outlined"
            fullWidth
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            label="Last Name"
            type="text"
            variant="outlined"
            fullWidth
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={email && !isValidEmail(email)} // Show error if email is invalid
            helperText={
              email && !isValidEmail(email) ? 'Please enter a valid email address' : ''
            }
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Password requirements */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              Password Requirements:
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: hasUppercase ? 'green' : 'gray' }}
            >
              ✔ At least one uppercase letter
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: hasSymbol ? 'green' : 'gray' }}
            >
              ✔ At least one symbol (!@#$%^&)
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: hasMinLength ? 'green' : 'gray' }}
            >
              ✔ At least 8 characters in length
            </Typography>
          </Box>

          {/* Signup button */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: isFormValid ? '#333333' : '#CCCCCC',
              color: 'white',
              my: 1,
            }}
            fullWidth
            disabled={!isFormValid} // Disable button if form is invalid
          >
            Sign Up
          </Button>
        </Box>

        {/* Have an account? Sign in. */}
        <Typography
          sx={{
            fontSize: '13px',
            fontStyle: 'italic',
            textAlign: 'center',
          }}
        >
          Have an account? Login.
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
