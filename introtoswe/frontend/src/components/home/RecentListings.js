import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import CategoryCard from '../../components/CategoryCard';

function RecentListings() {
  const listings = [
    { category: "Tech", title: "Tech Workshop", description: "Learn React basics." },
    { category: "Education", title: "Math Tutoring", description: "Algebra tutoring available." },
    { category: "Health", title: "Yoga Class", description: "Free yoga session on Sunday." },
    { category: "Art", title: "Painting Workshop", description: "Explore your creativity with colors." },
  ];

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Recent Listings
      </Typography>
      <Grid container spacing={2}>
        {listings.map((listing, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <CategoryCard
              category={listing.category}
              title={listing.title}
              description={listing.description}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default RecentListings;
