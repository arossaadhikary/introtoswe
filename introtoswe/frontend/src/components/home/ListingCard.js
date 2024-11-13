import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function ListingCard({ category, title, description }) {
  const listingStyles = {
    "Coding": { backgroundColor: "#FFA726" },
    "Science": { backgroundColor: "#2196F3" },
    "Health": { backgroundColor: "#FF5722" },
    "Art": { backgroundColor: "#9C27B0" },
  };

  // const categories = [
  //   { title: 'Sports', icon: <SportsBasketballIcon />, color: '#FFA726' },
  //   { title: 'Science', icon: <ScienceIcon />, color: '#66BB6A' },
  //   { title: 'Art', icon: <PaletteIcon />, color: '#42A5F5' },
  //   { title: 'Coding', icon: <CodeIcon />, color: '#AB47BC' },
  // ];

  
  return (
    <Card sx={{ minHeight: 120, ...listingStyles[category] }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
    </Card>
  );
}

export default ListingCard;
