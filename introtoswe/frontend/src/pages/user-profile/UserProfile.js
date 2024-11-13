import React from 'react';
import { Box, Grid, Typography, Button, Card, Avatar } from '@mui/material';
import ListingCard from '../../components/home/ListingCard';

function UserProfile() {
  const recentListings = [
    { category: "Coding", title: "Tech Workshop", description: "Learn React basics." },
    { category: "Science", title: "Math Tutoring", description: "Algebra tutoring available." },
  ];
  const inProgressListings = [
    { category: "Health", title: "Yoga Class", description: "Free yoga session on Sunday." },
  ];
  const completedListings = [
    { category: "Art", title: "Painting Mural", description: "Test"},
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 10,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
        John's Skillswap
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={4}>
          {/* Profile Card */}
          <Card sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: '#FFD700', width: 80, height: 80, fontSize: '2rem' }}>DR</Avatar>
            <Typography variant="h6" sx={{ mt: 2 }}>John Appleseed</Typography>
            <Typography variant="subtitle2" color="textSecondary">@drjohnweg</Typography>
            <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
              Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard.
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={8}>
          {/* Recent Listings Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5">Recent Listings</Typography>
            <Button variant="contained" sx={{ backgroundColor: '#66BB6A', color: 'white', my: 1 }}>
              Make another listing
            </Button>
            <Grid container spacing={2}>
              {recentListings.map((listing, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <ListingCard
                    category={listing.category}
                    title={listing.title}
                    description={listing.description}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* In Progress Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5">In Progress</Typography>
            <Grid container spacing={2}>
              {inProgressListings.map((listing, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <ListingCard
                    category={listing.category}
                    title={listing.title}
                    description={listing.description}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

           {/* In Progress Section */}
           <Box>
            <Typography variant="h5">Completed</Typography>
            <Grid container spacing={2}>
              {completedListings.map((listing, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <ListingCard
                    category={listing.category}
                    title={listing.title}
                    description={listing.description}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

        </Grid>
      </Grid>
    </Box>
  );
}

export default UserProfile;
