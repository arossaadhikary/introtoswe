import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ListingDialog from '../../components/listing-view/ListingDialog'; // Import the dialog component

function ListingCard({ category, title, description, organization, deadline, type, createdByUser }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false); // Manage dialog state

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleCardClick = () => {
    setDialogOpen(true); // Open the dialog
  };

  const handleCloseDialog = () => {
    setDialogOpen(false); // Close the dialog
  };

  const listingStyles = {
    "STEM & Technology": { backgroundColor: "#7FB3D5", color: "#000000" },
    "Arts": { backgroundColor: "#73C2FB", color: "#000000" },
    "Leadership & Professional Development": { backgroundColor: "#FF8300", color: "#000000" },
    "Community Service": { backgroundColor: "#FBC77F", color: "#000000" },
    "Health & Recreation": { backgroundColor: "#5DADE2", color: "#000000" },
  };

  return (
    <>
      <Card
        sx={{
          minHeight: 160,
          ...listingStyles[category],
          borderRadius: 2,
          position: 'relative',
          cursor: 'pointer', // Show pointer cursor
        }}
        onClick={handleCardClick} // Open dialog on card click
      >
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {description}
          </Typography>
          <Box>
            {organization && (
              <Typography variant="body2">
                <strong>Organization:</strong> {organization}
              </Typography>
            )}
            {deadline && (
              <Typography variant="body2">
                <strong>Deadline:</strong> {deadline}
              </Typography>
            )}
            {type && (
              <Typography variant="body2">
                <strong>Type:</strong> {type}
              </Typography>
            )}
          </Box>
        </CardContent>

        {!createdByUser && (
          <IconButton
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click from triggering
              handleBookmarkToggle();
            }}
            sx={{ position: 'absolute', bottom: 8, right: 8 }}
            aria-label="bookmark"
          >
            {isBookmarked ? (
              <BookmarkIcon sx={{ color: '#000000' }} />
            ) : (
              <BookmarkBorderIcon sx={{ color: '#000000' }} />
            )}
          </IconButton>
        )}
      </Card>

      {/* Dialog for expanded information */}
      <ListingDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        listing={{
          category,
          title,
          description,
          organization,
          deadline,
          type,
        }}
      />
    </>
  );
}

export default ListingCard;
