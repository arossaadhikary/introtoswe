import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'; // Empty bookmark
import BookmarkIcon from '@mui/icons-material/Bookmark'; // Filled bookmark

function ListingCard({ category, title, description, organization, deadline, type, createdByUser }) {
  const [isBookmarked, setIsBookmarked] = useState(false); // Track bookmark state

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked); // Toggle bookmark state
  };

  const listingStyles = {
    "STEM & Technology": { backgroundColor: "#7FB3D5", color: "#000000" }, // Lighter Blue
    "Arts": { backgroundColor: "#73C2FB", color: "#000000" }, // Light Sky Blue
    "Leadership & Professional Development": { backgroundColor: "#FF8300", color: "#000000" }, // Vibrant Orange
    "Community Service": { backgroundColor: "#FBC77F", color: "#000000" }, // Lighter Golden Orange
    "Health & Recreation": { backgroundColor: "#5DADE2", color: "#000000" }, // Lighter Blue
  };

  return (
    <Card sx={{ minHeight: 160, ...listingStyles[category], borderRadius: 2, position: 'relative' }}>
      <CardContent>
        {/* Title */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          {title}
        </Typography>

        {/* Description */}
        <Typography variant="body2" sx={{ mb: 2 }}>
          {description}
        </Typography>

        <Box>
          {/* Organization */}
          {organization && (
            <Typography variant="body2">
              <strong>Organization:</strong> {organization}
            </Typography>
          )}

          {/* Deadline */}
          {deadline && (
            <Typography variant="body2">
              <strong>Deadline:</strong> {deadline}
            </Typography>
          )}

          {/* Type */}
          {type && (
            <Typography variant="body2">
              <strong>Type:</strong> {type}
            </Typography>
          )}
        </Box>
      </CardContent>

      {/* Bookmark Icon */}
      {!createdByUser && (
        <IconButton
          onClick={handleBookmarkToggle}
          sx={{ position: 'absolute', bottom: 8, right: 8 }}
          aria-label="bookmark"
        >
          {isBookmarked ? (
            <BookmarkIcon sx={{ color: '#000000' }} /> // Filled bookmark
          ) : (
            <BookmarkBorderIcon sx={{ color: '#000000' }} /> // Empty bookmark
          )}
        </IconButton>
      )}
    </Card>
  );
}

export default ListingCard;
