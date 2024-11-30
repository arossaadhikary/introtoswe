import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
  Avatar,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"; // Empty bookmark
import BookmarkIcon from "@mui/icons-material/Bookmark"; // Filled bookmark
import ComputerIcon from "@mui/icons-material/Computer";
import BrushIcon from "@mui/icons-material/Brush";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import HandshakeIcon from "@mui/icons-material/Handshake";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

const categoryDetails = {
  "STEM & Technology": { icon: <ComputerIcon />, color: "#7FB3D5" },
  Arts: { icon: <BrushIcon />, color: "#73C2FB" },
  "Leadership & Professional Development": { icon: <PeopleAltIcon />, color: "#FF8300" },
  "Community Service": { icon: <HandshakeIcon />, color: "#FBC77F" },
  "Health & Recreation": { icon: <FitnessCenterIcon />, color: "#5DADE2" },
};

function ListingDialog({ open, onClose, listing }) {
  const [isBookmarked, setIsBookmarked] = useState(false); // Always declare useState at the top

  // Return null early if `listing` is not provided
  if (!listing) {
    return null;
  }

  // Get the corresponding icon and color based on the category
  const categoryInfo = categoryDetails[listing.category] || { icon: null, color: "#E0E0E0" };

  const handleContactClick = () => {
    console.log("Contact button clicked!");
  };

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked); // Toggle bookmark state
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Request for {listing.title}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          {/* Avatar with dynamic icon and color */}
          <Avatar
            sx={{
              bgcolor: categoryInfo.color,
              width: 80,
              height: 80,
              fontSize: "2rem",
              margin: "0 auto",
            }}
          >
            {categoryInfo.icon}
          </Avatar>
          <Typography variant="h6" sx={{ mt: 1 }}>
            {listing.organization}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Difficulty: {listing.difficulty} | Deadline: {listing.deadline} | Urgency:{" "}
            {listing.urgency || "Standard"}
          </Typography>

          {/* Brief description */}
          <Typography
            variant="body2"
            sx={{ mb: 2, textAlign: "center", fontStyle: "italic" }}
          >
            {listing.description}
          </Typography>
        </Box>

        {/* Long description */}
        <Typography variant="body2" sx={{ mb: 2 }}>
          We are looking for a talented graphic designer to create a visually engaging
          promotional poster for our annual community charity event, "Helping Hands Day."
          This event focuses on bringing together local residents, volunteers, and
          organizations to support various charitable causes in our neighborhood.
        </Typography>

        <Box textAlign="center" sx={{ mt: 3 }}>
          {/* Contact Button */}
          <Button
            variant="contained"
            onClick={handleContactClick}
            sx={{
              backgroundColor: categoryInfo.color,
              color: "#000",
              fontWeight: "bold",
              textTransform: "capitalize",
              "&:hover": {
                backgroundColor: "white",
                border: `2px solid ${categoryInfo.color}`,
              },
            }}
          >
            Contact {listing.requesterName || "Requester"}
          </Button>

          {/* Bookmark Icon */}
          <IconButton
            onClick={handleBookmarkToggle}
            sx={{
              ml: 2,
              color: isBookmarked ? categoryInfo.color : "#000",
            }}
            aria-label="bookmark"
          >
            {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ListingDialog;
