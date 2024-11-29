import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import ListingCard from './ListingCard';

function RecentListings() {
  const listings = [
    { category: "Coding", title: "Tech Workshop", description: "Learn React basics." },
    { category: "Science", title: "Math Tutoring", description: "Algebra tutoring available." },
    { category: "Health", title: "Yoga Class", description: "Free yoga session on Sunday." },
    { category: "Art", title: "Painting Workshop", description: "Explore your creativity with colors." },
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
            <ListingCard
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