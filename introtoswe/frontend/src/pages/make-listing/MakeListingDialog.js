import React from 'react'
import { Dialog, DialogTitle, DialogContent, TextField, Button, Box, Typography } from '@mui/material';

const MakeListingDialog = ( {open, onClose }) => {
  return (
    <Dialog open={open} onClose = {onClose} maxWidth="xs" fullWidth>
      <DialogContent sx = {{ padding: 4}}>
        <Typography variant="h5" fontWeight="bold" gutterbottom>
          Make a Listing
        </Typography>
        <Box component = "form" display = "flex" flexDirection="column" gap ={2}>
          <TextField
            label="Service Request"
            type="text"
            variant='outlined'
            fullwidth
          />
          <TextField
            label="Estimated Difficulty:"
            type="number"
            variant='outlined'
            fullwidth
          />



        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default MakeListingDialog;