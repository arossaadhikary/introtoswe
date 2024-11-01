import React from 'react';
import { Grid } from '@mui/material';
import CategoryCard from './CategoryCard';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import ScienceIcon from '@mui/icons-material/Science';
import PaletteIcon from '@mui/icons-material/Palette';
import CodeIcon from '@mui/icons-material/Code';
import './Categories.css';

const categories = [
  { title: 'Sports', icon: <SportsBasketballIcon />, color: '#FFA726' },
  { title: 'Science', icon: <ScienceIcon />, color: '#66BB6A' },
  { title: 'Art', icon: <PaletteIcon />, color: '#42A5F5' },
  { title: 'Coding', icon: <CodeIcon />, color: '#AB47BC' },
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
