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
  { title: 'STEM & Technology', icon: <ComputerIcon />, color: '#7FB3D5' }, // Lighter Blue
  { title: 'Arts', icon: <BrushIcon />, color: '#73C2FB' }, // Light Sky Blue
  { title: 'Leadership & Professional Development', icon: <PeopleAltIcon />, color: '#FF8300' }, // Vibrant Orange
  { title: 'Community Service', icon: <HandshakeIcon />, color: '#FBC77F' }, // Lighter Golden Orange
  { title: 'Health & Recreation', icon: <FitnessCenterIcon />, color: '#5DADE2' }, // Lighter Blue
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
