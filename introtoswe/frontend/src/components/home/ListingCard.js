import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function ListingCard({ category, title, description }) {
  const listingStyles = {
    "Tech": { backgroundColor: "#4CAF50" },
    "Education": { backgroundColor: "#2196F3" },
    "Health": { backgroundColor: "#FF5722" },
    "Art": { backgroundColor: "#9C27B0" },
  };

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
