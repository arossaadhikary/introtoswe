import React from 'react';
import './Home.css';

import homeImg from '../../assets/home_page_image.jpg';
import RecentListings from '../../components/home/RecentListings';

function Home() {
  return (
    <div className="container">
      <div className="homeImgContainer">
        <img src={homeImg} className="homeImg" alt="Home" />
      </div>
      <div className="recentListingsContainer">
        <RecentListings />
      </div>
    </div>
  );
}

export default Home;
