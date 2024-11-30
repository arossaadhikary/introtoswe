import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import womanImage from "../../assets/womenWorking.jpg";
import { useLocation } from 'react-router-dom';

const categories = [
  { title: 'STEM & Technology', color: '#005EB8' },
  { title: 'Arts', color: '#73C2FB' },
  { title: 'Leadership & Professional Development', color: '#FF8300' },
  { title: 'Community Service', color: '#FBC77F' },
  { title: 'Health & Recreation', color: '#0073CF' },
];

const Search = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedUrgency, setSelectedUrgency] = useState('all');

  // Set category from navigation and reset other filters
  useEffect(() => {
    if (location.state?.category) {
      setSelectedCategory(location.state.category);
    } else {
      setSelectedCategory('all');
    }
    setSelectedDifficulty('all');
    setSelectedUrgency('all');
  }, [location.state]);

  const handleFilterSubmit = () => {
    console.log('Filters:', {
      category: selectedCategory,
      difficulty: selectedDifficulty,
      urgency: selectedUrgency,
    });
    // Add filtering logic to fetch or filter data here
  };

  return (
    <Box>
      {/* Header Section */}
      <Box
        sx={{
          position: 'relative',
          height: '300px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: `url(${womanImage})`,
          backgroundSize: 'cover',
          backgroundPosition: '60% 60%',
          color: '#FFFFFF',
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
          Results for '{selectedCategory !== 'all' ? selectedCategory : 'All Categories'}'
        </Typography>
      </Box>

      {/* Filters Section */}
      <Box sx={{ padding: 4 }}>
        <Grid container spacing={3}>
          {/* Category Filter */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <MenuItem value="all">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.title} value={category.title}>
                    {category.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Difficulty Filter */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Difficulty</InputLabel>
              <Select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                <MenuItem value="all">All Levels</MenuItem>
                {[1, 2, 3, 4, 5].map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Urgency Filter */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Urgency</InputLabel>
              <Select
                value={selectedUrgency}
                onChange={(e) => setSelectedUrgency(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Apply Filters Button */}
        <Box sx={{ textAlign: 'center', marginTop: 3 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#333333', color: '#FFF' }}
            onClick={handleFilterSubmit}
          >
            Apply Filters
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Search;
