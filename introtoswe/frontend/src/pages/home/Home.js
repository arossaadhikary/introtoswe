import React from 'react';
import './Home.css';
import HomeImg from '../../components/home/HomeImg';
import RecentListings from '../../components/home/RecentListings';
import Categories from '../../components/home/Categories';
import { Box } from '@mui/material';

function Home() {
  return (
    <div className="container">
      <Box sx={{ width: '97%', margin: '0 auto' }}>
        <HomeImg />
        <Categories /> 
      </Box>

      <div className="recentListingsContainer">
        <RecentListings />
      </div>
    </div>
  );
}

export default Home;
