import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import ListingCard from './ListingCard';

function RecentListings() {
  const listings = [
    {
      category: "STEM & Technology",
      title: "Tech Workshop",
      description: "Learn React basics.",
      organization: "UF Coding Club",
      deadline: "12/10/2024",
      type: "Workshop",
    },
    {
      category: "Leadership & Professional Development",
      title: "Mock Trial Participant",
      description: "Participate in mock trials to develop public speaking skills.",
      organization: "UF Mock Trial Team",
      deadline: "12/15/2024",
      type: "Event Participation",
    },
    {
      category: "Health & Recreation",
      title: "Yoga Class",
      description: "Free yoga session on Sunday.",
      organization: "UF Wellness Club",
      deadline: "12/05/2024",
      type: "Class",
    },
    {
      category: "Arts",
      title: "Painting Workshop",
      description: "Explore your creativity with colors.",
      organization: "UF Art Society",
      deadline: "12/20/2024",
      type: "Workshop",
    },
    {
      category: "Community Service",
      title: "Gardening Graphic",
      description: "Design promotional graphics for the gardening event.",
      organization: "UF Gardening Club",
      deadline: "12/08/2024",
      type: "Design Request",
    },
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
              organization={listing.organization} // Pass organization
              deadline={listing.deadline} // Pass deadline
              type={listing.type} // Pass type of service
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default RecentListings;
