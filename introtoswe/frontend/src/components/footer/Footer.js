import React from 'react';
import { Box, Typography, Grid, Link } from '@mui/material';
import "./Footer.css";

const Footer = ({ onMakeListingClick }) => {
  const footerSections = [
    {
      title: "Categories",
      links: [
        "STEM & Technology",
        "Arts & Creativity",
        "Leadership & Professional Development",
        "Community Service",
        "Health & Recreation",
      ],
    },
    {
      title: "For Students",
      links: ["How It Works", "Offer Your Skills"],
    },
    {
      title: "For Organizations",
      links: [
        {
          text: "Make a Listing",
          onClick: onMakeListingClick, // Attach the handler for this specific link
        },
      ],
    },
    {
      title: "Company",
      links: ["About Us"],
    },
  ];

  return (
    <Box
      className="container_footer"
      sx={{ backgroundColor: "#f9f9f9", padding: "40px" }}
    >
      <Grid container spacing={4}>
        {footerSections.map((section, index) => (
          <Grid item xs={6} sm={4} md={2} key={index}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              {section.title}
            </Typography>
            {section.links.map((link, i) => {
              // Check if the link is an object with `text` and `onClick`
              if (typeof link === "object") {
                return (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    key={i}
                    sx={{ mb: 1 }}
                  >
                    <Link
                      href="#"
                      color="inherit"
                      underline="none"
                      onClick={link.onClick} // Trigger the onClick handler
                    >
                      {link.text}
                    </Link>
                  </Typography>
                );
              }

              // Default behavior for standard links
              return (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  key={i}
                  sx={{ mb: 1 }}
                >
                  <Link href="#" color="inherit" underline="none">
                    {link}
                  </Link>
                </Typography>
              );
            })}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Footer;
