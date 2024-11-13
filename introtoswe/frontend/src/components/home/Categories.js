import React from 'react';
import { Grid } from '@mui/material';
import CategoryCard from './CategoryCard';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import ScienceIcon from '@mui/icons-material/Science';
import PaletteIcon from '@mui/icons-material/Palette';
import CodeIcon from '@mui/icons-material/Code';
import './Categories.css';

const categories = [
  { title: 'Health', icon: <SportsBasketballIcon />, color: '#FF5722' },
  { title: 'Science', icon: <ScienceIcon />, color: '#2196F3' },
  { title: 'Art', icon: <PaletteIcon />, color: '#9C27B0' },
  { title: 'Coding', icon: <CodeIcon />, color: '#FFA726' },
];

const Categories = () => {
  return (
    <div className="categoriesContainer">
      <Grid container spacing={2} justifyContent="center">
        {categories.map((category, index) => (
          <Grid item xs={6} sm={3} key={index}>
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
