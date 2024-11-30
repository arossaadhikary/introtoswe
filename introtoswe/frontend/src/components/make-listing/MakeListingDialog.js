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
  const [category, setCategory] = useState('');

  const isFormValid =
    serviceRequest.trim() &&
    deadline.trim() &&
    difficulty.trim() &&
    urgency.trim() &&
    category.trim() &&
    description.trim();

  const handleSubmit = () => {
    if (!isFormValid) return;

    console.log('Form submitted:', {
      serviceRequest,
      deadline,
      difficulty,
      urgency,
      category,
      description,
    });
    onClose(); 
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth scroll="paper">
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
            sx = {{mt: '7px'}}
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
              shrink: true, // PREVENTS LABEL OVERLAPPING
            }}
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />


          {/* Difficulty Dropdown */}
          <FormControl fullWidth required error={!difficulty}>
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
            {!difficulty && <FormHelperText>This field is required</FormHelperText>}
          </FormControl>

          {/* Category Dropdown */}
          <FormControl fullWidth required error={!category}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="sports">Sports</MenuItem>
              <MenuItem value="tech">Tech</MenuItem>
              <MenuItem value="medicine">Medicine</MenuItem>
            </Select>
            {!category && <FormHelperText>Please select a category</FormHelperText>}
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

          {/* Brief Description Field */}
          <TextField
            label="Short 'Eyecatching' Description"
            type="text"
            variant="outlined"
            fullWidth
            multiline
            required
            value={description}
            onChange={(e) => {
              if (e.target.value.length <= 100) {
                setDescription(e.target.value);
              }
            }}
            inputProps={{ maxLength: 100 }} // Enforce a hard limit
          />
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontSize: '12px', mt: -2 }}
          >
            This description will be visible to those considering your task. Make it captivating, clear, and enticing to draw their interest.          
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontSize: '12px', mt: -3.5, textAlign: 'right' }}
          >
            {description.length}/100 characters
          </Typography>


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
          <Typography
          variant="body2"
          color="textSecondary"
          sx={{ fontSize: '12px', mt: -2 }}
          >
            Provide a detailed description that will be visible when others click on your listing. Expand on the service you're seeking to have fulfilled (i.e. colors you want included).
          </Typography>

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSubmit}
            disabled={!isFormValid}
            aria-label="submit-listing"
          >
            Submit
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default MakeListingDialog;
