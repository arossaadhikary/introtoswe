import React, { useState } from 'react';
import { TextField, Box, Typography, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import homeImg from '../../assets/home_page_image.jpg';
import './HomeImg.css';

const HomeImg = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <div className="homeImgContainer">
      {/* Background Image */}
      <img src={homeImg} className="homeImg" alt="Home" />

      {/* Centered Overlay Content */}
      <Box className="overlayContent">
        <Typography variant="h3" className="overlayText">
          skillswap
        </Typography>
        <Typography variant="subtitle1" className="overlaySubText">
          skills for you. skills for me.
        </Typography>

        {/* Search Bar with Icon */}
        {/* <TextField
          variant="outlined"
          placeholder="Search..."
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            style: { backgroundColor: 'white', borderRadius: '4px' },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        /> */}
      </Box>
    </div>
  );
};

export default HomeImg;
