import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import './CategoryCard.css';

const CategoryCard = ({ category, title, icon, color }) => {
  return (
    <Card className="categoryCard" sx={{ backgroundColor: color }}>
      <CardContent>
        <Box className="categoryIcon">{icon}</Box>
        <Typography variant="h6" className="categoryTitle">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
