import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Link,
  IconButton,
  TextField,
  Button,
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
          <Grid item xs={12} md={3}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", mb: 2, color: "#ff9800" }}>
              HMA Voyages
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.8, color: "grey.300" }}>
              Your trusted partner for discovering the wonders of Sri Lanka.
              Authentic travel experiences that connect you with culture,
              landscapes, and hospitality of the Pearl of the Indian Ocean.
            </Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              {[Facebook, Instagram, Twitter, YouTube, Flight].map((Icon, index) => (
                <IconButton
                  key={index}
                  sx={{
                    color: "#fff",
                    transition: "0.3s",
                    "&:hover": { color: "#ff9800", transform: "scale(1.2)" },
                  }}
                >
                  <Icon />
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ color: "#ff9800" }}>
              Contact Information
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>📍 Hakmana, Matara, Sri Lanka</Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>📞 +94 78 912 6818</Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>✉️ rs.rsandun@gmail.com</Typography>
            <Typography variant="body2" sx={{ mt: 1, lineHeight: 1.6 }}>
              <strong>Office Hours:</strong><br />
              Mon - Fri: 9:00 AM - 6:00 PM
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ color: "#ff9800" }}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {[
                { label: "Tour Packages", href: "/tours" },
                { label: "Travel Guide", href: "/guide" },
                { label: "Practical Information", href: "/practical-info" },
                { label: "About Our Agency", href: "/agency" },
                { label: "Travel Blog", href: "/blog" },
                { label: "Contact Us", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms & Conditions", href: "/terms-conditions" },
              ].map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  underline="hover"
                  sx={{
                    color: "grey.300",
                    transition: "0.3s",
                    "&:hover": { color: "#ff9800", ml: 1 },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ color: "#ff9800" }}>
              Stay Connected
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: "grey.300", lineHeight: 1.6 }}>
              Subscribe to our newsletter for the latest travel insights,
              exclusive offers, and tips delivered to your inbox.
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", gap: 1 }}>
              <TextField
                variant="outlined"
                placeholder="Enter your email"
                size="small"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": { borderRadius: 2 },
                }}
                InputProps={{
                  sx: { fontSize: "14px" },
                }}
                required
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#ff9800",
                  "&:hover": { backgroundColor: "#fb8c00" },
                  borderRadius: 2,
                  textTransform: "none",
                  px: 3,
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 5, bgcolor: "grey.700" }} />

        {/* Footer Bottom */}
        <Box textAlign="center">
          <Typography variant="body2" color="grey.500">
            © 2024 HMA Voyages. All rights reserved. |{" "}
            <Link href="/privacy-policy" color="inherit" underline="hover">
              Privacy Policy
            </Link>{" "}
            |{" "}
            <Link href="/terms-conditions" color="inherit" underline="hover">
              Terms of Service
            </Link>
            <br />
            Proudly showcasing the beauty of Sri Lanka since 2009.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
