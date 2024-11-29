import React, { useState } from 'react';
import { Box, Grid, Typography, Button, Card, Avatar } from '@mui/material';
import ListingCard from '../../components/home/ListingCard';
import MakeListingDialog from '../../pages/make-listing/MakeListingDialog'; 

function UserProfile() {
  // current state variable = openMakeListingDialog
  // setter function (setOpenMakeListingDialog) updates value of current state  
  const [openMakeListingDialog, setOpenMakeListingDialog] = useState(false);

  const openMakeListing = () => {
    setOpenMakeListingDialog(true);
  };

  const closeMakeListingDialog = () => {
    setOpenMakeListingDialog(false);
  };

  const recentListings = [
    { category: "Coding", title: "Tech Workshop", description: "Learn React basics." },
    { category: "Science", title: "Math Tutoring", description: "Algebra tutoring available." },
  ];

  const starredListings = [
    { category: "Coding", title: "Tech Workshop", description: "Learn React basics." },
    { category: "Science", title: "Math Tutoring", description: "Algebra tutoring available." },
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
          {/*Created Listings Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5">Created Listings</Typography>
            <Button onClick={openMakeListing} variant="contained" sx={{ backgroundColor: '#66BB6A', color: 'white', my: 1 }}>
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

          {/* Starred Listings */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5">Starred Listings</Typography>
            <Grid container spacing={2}>
              {starredListings.map((listing, index) => (
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


      <MakeListingDialog open={openMakeListingDialog} onClose={closeMakeListingDialog} />
    </Box>
  );
}

export default UserProfile;
