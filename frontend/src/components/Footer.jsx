import React, { useState } from "react";
import { Grid } from '@mui/material';
import {
  Box,
  Typography,
  Link,
  IconButton,
  Container,
  Divider,
} from "@mui/material";
import { Facebook, Instagram, Twitter, YouTube, Flight } from "@mui/icons-material";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Newsletter subscription:", email);
    setEmail("");
    alert("Thank you for subscribing to our newsletter!");
  };

  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(135deg, #1a1a1a, #121212)",
        color: "#fff",
        mt: 5,
        pt: 8,
        pb: 4,
        position: "relative",
        zIndex: 10,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Company Info */}
          <Grid size={{ xs: 12, md: 3 }}> 
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", mb: 2, color: "#79DBDC" }}>
              HMA Voyages
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.8, color: "grey.300" }}>
              We are committed to filling your vacation with beautiful memories and making every moment of it enjoyable. "HAPPY MOMENT ALWAYS "
            </Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              {[Facebook, Instagram, Twitter, YouTube, Flight].map((Icon, index) => (
                <IconButton
                  key={index}
                  sx={{
                    color: "#fff",
                    transition: "0.3s",
                    "&:hover": { color: "#79DBDC", transform: "scale(1.2)" },
                  }}
                >
                  <Icon />
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Contact Information */}
          <Grid size={{ xs: 12, md: 3 }}> 
            <Typography variant="h6" gutterBottom sx={{ color: "#79DBDC" }}>
              Contact Information
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>📍 Boragodawaththa, Minuwangoda, Sri Lanka</Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              📞{" "}
              <Link
                href="https://wa.me/94763011488"
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                sx={{ color: "inherit" }}
              >
                +94 76 3011 488 (WhatsApp)
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>✉️ hmavoyages@gmail.com</Typography>
            <Typography variant="body2" sx={{ mt: 1, lineHeight: 1.6 }}>
              <strong>Office Hours:</strong><br />
              24/7 Customer Support
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 12, md: 3 }}> 
            <Typography variant="h6" gutterBottom sx={{ color: "#79DBDC" }}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {[
                { label: "Tour Packages", href: "/tours" },
                { label: "About Us", href: "/about" },
                { label: "Reviews", href: "/feedbacks" },
                { label: "Gallery", href: "/gallery" },
              ].map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  underline="hover"
                  sx={{
                    color: "grey.300",
                    transition: "0.3s",
                    "&:hover": { color: "#79DBDC", ml: 1 },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}> 
            <Typography variant="h6" gutterBottom sx={{ color: "#79DBDC" }}>
              Settings
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {[
                { label: "Review Dasboard", href: "/admin/reviews" },
                { label: "Gallery Dasboard", href: "/admin/gallery" },
                { label: "Tours Dashboard", href: "/admin/tours" },
              ].map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  underline="hover"
                  sx={{
                    color: "grey.300",
                    transition: "0.3s",
                    "&:hover": { color: "#79DBDC", ml: 1 },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 5, bgcolor: "grey.700" }} />

        {/* Footer Bottom */}
        <Box textAlign="center">
          <Typography variant="body2" color="grey.500">
            © 2026 HMA Voyages. All rights reserved.{" "}
            <br />
            Proudly showcasing the beauty of Sri Lanka since 2020.
          </Typography>
          <Link
            href="https://www.vinuja.me"
            underline="hover"
            variant="body2"
            sx={{ color: "grey.500", "&:hover": { color: "#79DBDC" } }}
          >
            CRAFTED BY VINUJA RANSITH
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
