import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const CategoryCard = ({ title, icon, color, onClick }) => {
  return (
    <Card
      sx={{
        backgroundColor: color,
        textAlign: 'center',
        cursor: 'pointer',
        height: '120px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        color: '#ffffff',
        '&:hover': {
          backgroundColor: '#333333',
          color: '#ffffff',
        },
      }}
      onClick={onClick} // Trigger on click
    >
      <CardContent>
        {icon}
        <Typography variant="body2" sx={{ mt: 1, fontWeight: 'bold' }}>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
