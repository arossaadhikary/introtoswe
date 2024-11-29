import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const MakeListingDialog = ({ open, onClose }) => {
  const [serviceRequest, setServiceRequest] = useState('');
  const [deadline, setDeadline] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [urgency, setUrgency] = useState('');
  const [description, setDescription] = useState('');

  const isFormValid =
    serviceRequest.trim() &&
    deadline.trim() &&
    difficulty.trim() &&
    urgency.trim() &&
    description.trim();

  const handleSubmit = () => {
    if (!isFormValid) return;

    console.log('Form submitted:', {
      serviceRequest,
      deadline,
      difficulty,
      urgency,
      description,
    });
    onClose(); // close MakeListingDialog when submitted
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="s" fullWidth scroll="paper">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Make a Listing</Typography>
        <IconButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ padding: 5 }}>
        <Box component="form" display="flex" flexDirection="column" gap={2}>
          {/* Service Request Field */}
          <TextField
            style={{ marginTop: '5px' }}
            label="Service Request"
            type="text"
            variant="outlined"
            fullWidth
            required
            value={serviceRequest}
            onChange={(e) => setServiceRequest(e.target.value)}
          />

          {/* Deadline */}
          <TextField
            label="Deadline"
            type="date"
            variant="outlined"
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          {/* Difficulty Dropdown */}
          <FormControl fullWidth required>
            <InputLabel id="difficulty-label">Estimated Difficulty</InputLabel>
            <Select
              labelId="difficulty-label"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="5">5</MenuItem>
            </Select>
          </FormControl>

          {/* Urgency Dropdown */}
          <FormControl fullWidth required error={!urgency}>
            <InputLabel id="urgency-label">Urgency</InputLabel>
            <Select
              labelId="urgency-label"
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
            {!urgency && <FormHelperText>Please select an urgency level</FormHelperText>}
          </FormControl>

          {/* Description Field */}
          <TextField
            label="Description"
            type="text"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            Submit
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default MakeListingDialog;
