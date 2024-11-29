import React from 'react';
import { Grid } from '@mui/material';
import CategoryCard from './CategoryCard';
import './Categories.css';

// icons for categories
import ComputerIcon from '@mui/icons-material/Computer';
import BrushIcon from '@mui/icons-material/Brush';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HandshakeIcon from '@mui/icons-material/Handshake';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const categories = [
  { title: 'STEM & Technology', icon: <ComputerIcon />, color: '#FF5722' },
  { title: 'Arts & Creativity', icon: <BrushIcon />, color: '#2196F3' },
  { title: 'Leadership & Professional Development', icon: <PeopleAltIcon />, color: '#9C27B0' },
  { title: 'Community & Service', icon: <HandshakeIcon />, color: '#FFA726' },
  { title: 'Health, Wellness, & Recreation', icon: <FitnessCenterIcon />, color: '#FFA726' },
];

const Categories = () => {
  return (
    <div className="categoriesContainer">
      <Grid container spacing={2} justifyContent="center">
        {categories.map((category, index) => (
          <Grid item xs={6} sm={2} key={index}>
            <CategoryCard
              title={category.title}
              icon={category.icon}
              color={category.color}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Categories;
