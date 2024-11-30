import React, { useState } from 'react';
import { Box, Grid, Typography, Button, Card, Avatar, IconButton } from '@mui/material';
import ListingCard from '../../components/home/ListingCard';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import userProfileImage from '../../assets/userProfileImage.jpg';

function UserProfile({ onOpenMakeListing }) {
  const [recentIndex, setRecentIndex] = useState(0);
  const [starredIndex, setStarredIndex] = useState(0);

  const handleNextRecent = () => {
    if (recentIndex < recentListings.length - 2) {
      setRecentIndex(recentIndex + 1);
    }
  };

  const handlePrevRecent = () => {
    if (recentIndex > 0) {
      setRecentIndex(recentIndex - 1);
    }
  };

  const handleNextStarred = () => {
    if (starredIndex < starredListings.length - 2) {
      setStarredIndex(starredIndex + 1);
    }
  };

  const handlePrevStarred = () => {
    if (starredIndex > 0) {
      setStarredIndex(starredIndex - 1);
    }
  };

  const recentListings = [
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
      title: "Math Tutoring",
      description: "Algebra tutoring available.",
      organization: "UF Math Society",
      deadline: "12/12/2024",
      type: "Tutoring",
    },
    {
      category: "Health & Recreation",
      title: "Yoga Class",
      description: "Free yoga session.",
      organization: "UF Wellness Club",
      deadline: "12/05/2024",
      type: "Class",
    },
    {
      category: "Arts & Creativity",
      title: "Painting Workshop",
      description: "Explore your creativity with colors.",
      organization: "UF Art Society",
      deadline: "12/20/2024",
      type: "Workshop",
    },
  ];

  const starredListings = [
    {
      category: "Health & Recreation",
      title: "Tech Workshop",
      description: "Learn React basics.",
      organization: "UF Tech Club",
      deadline: "12/15/2024",
      type: "Workshop",
    },
    {
      category: "Community Service",
      title: "Math Tutoring",
      description: "Algebra tutoring available.",
      organization: "UF Volunteering Team",
      deadline: "12/08/2024",
      type: "Service",
    },
    {
      category: "Arts",
      title: "Painting Workshop",
      description: "Explore your creativity with colors.",
      organization: "UF Art Club",
      deadline: "12/18/2024",
      type: "Workshop",
    },
  ];

  return (
    <Box>
      {/* Header Section with Background Image */}
      <Box
        sx={{
          position: 'relative',
          height: '200px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: `url(${userProfileImage})`,
          backgroundSize: 'cover',
          backgroundPosition: '60% 70%',
          color: '#FFFFFF',
        }}
      >
        <Typography
          variant="h2"
          align="center"
          sx={{
            fontWeight: 'bold',
            animation: 'fadeIn 1.5s ease-in-out',
            '@keyframes fadeIn': {
              from: { opacity: 0 },
              to: { opacity: 1 },
            },
          }}
        >
          Welcome to your Skillswap, John
        </Typography>
      </Box>

      {/* Profile Content */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 10 }}>
        <Grid container spacing={10} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Card sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#333333', width: 80, height: 80, fontSize: '2rem' }}>JA</Avatar>
              <Typography variant="h6" sx={{ mt: 2 }}>John Appleseed</Typography>
              <Typography variant="subtitle2" color="textSecondary">@drjohnweg</Typography>
              <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard.
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={8}>
            {/* Created Listings Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5">Created Listings</Typography>
              <Button onClick={onOpenMakeListing} variant="contained" sx={{ backgroundColor: '#333333', color: 'white', my: 1 }}>
                Make Listing
              </Button>
              <Box sx={{ position: 'relative' }}>
                {/* Arrows for navigation */}
                {recentIndex > 0 && (
                  <IconButton
                    onClick={handlePrevRecent}
                    sx={{ position: 'absolute', top: '50%', left: '-40px', transform: 'translateY(-50%)', zIndex: 1 }}
                  >
                    <ArrowBackIosIcon />
                  </IconButton>
                )}
                {recentIndex < recentListings.length - 2 && (
                  <IconButton
                    onClick={handleNextRecent}
                    sx={{ position: 'absolute', top: '50%', right: '-40px', transform: 'translateY(-50%)', zIndex: 1 }}
                  >
                    <ArrowForwardIosIcon />
                  </IconButton>
                )}

                <Grid container spacing={2}>
                  {recentListings.slice(recentIndex, recentIndex + 2).map((listing, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <ListingCard {...listing} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>

            {/* Saved Listings Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5">Saved Listings</Typography>
              <Box sx={{ position: 'relative' }}>
                {starredIndex > 0 && (
                  <IconButton
                    onClick={handlePrevStarred}
                    sx={{ position: 'absolute', top: '50%', left: '-40px', transform: 'translateY(-50%)', zIndex: 1 }}
                  >
                    <ArrowBackIosIcon />
                  </IconButton>
                )}
                {starredIndex < starredListings.length - 2 && (
                  <IconButton
                    onClick={handleNextStarred}
                    sx={{ position: 'absolute', top: '50%', right: '-40px', transform: 'translateY(-50%)', zIndex: 1 }}
                  >
                    <ArrowForwardIosIcon />
                  </IconButton>
                )}

                <Grid container spacing={2}>
                  {starredListings.slice(starredIndex, starredIndex + 2).map((listing, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <ListingCard {...listing} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default UserProfile;
