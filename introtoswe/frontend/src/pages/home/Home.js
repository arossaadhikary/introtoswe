import React from 'react';
import './Home.css';
import HomeImg from '../../components/home/HomeImg';
import RecentListings from '../../components/home/RecentListings';
import Categories from '../../components/home/Categories';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  // Handle category click and navigate to Search page
  const handleCategoryClick = (category) => {
    navigate('/search', { state: { category } });
  };

  return (
    <div className="container">
      <Box sx={{ width: '97%', margin: '0 auto' }}>
        <HomeImg />
        <Categories onCategoryClick={handleCategoryClick} />
      </Box>

      <div className="recentListingsContainer">
        <RecentListings />
      </div>
    </div>
  );
}

export default Home;
