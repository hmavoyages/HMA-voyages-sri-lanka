// AdvantagesMUI.jsx
import * as React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import LocalAirportIcon from "@mui/icons-material/LocalAirport";
import HotelIcon from "@mui/icons-material/Hotel";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

export default function AdvantagesMUI() {
  const advantages = [
    {
      icon: "✈️",
      title: "Airport Pick-up",
      description: "Convenient and comfortable airport transfers to start your journey smoothly."
    },
    {
      icon: "🏨",
      title: "Hotel Booking",
      description: "Book the best hotels across Sri Lanka with ease, from luxury resorts to cozy stays."
    },
    {
      icon: "🚐",
      title: "Vehicle/Van with A/C",
      description: "Travel in comfort with our fully air-conditioned vehicles and experienced drivers."
    },
    {
      icon: "🍽️",
      title: "Restaurant Reservation",
      description: "Reserve tables at popular local restaurants and enjoy authentic Sri Lankan cuisine."
    },
    {
      icon: "🎫",
      title: "Ticket Booking",
      description: "Book tickets for tours, events, and activities hassle-free with our assistance."
    }
  ];

  const stats = [
    { number: "250+", label: "Happy Travelers" },
    { number: "5+", label: "Years Experience" },
    { number: "150+", label: "Unique Destinations" },
    { number: "97%", label: "Satisfaction Rate" },
  ];

  return (
    <Box component="section" id="advantages" sx={{ py: { xs: 8, md: 10 }, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        {/* Heading */}
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography variant="h3" fontWeight={800} color="text.primary">
            Why Choose HMA Voyages?
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ maxWidth: 740, mx: "auto", mt: 2 }}
          >
            We don't just organize trips – we create life-changing experiences that connect you
            with the heart and soul of Sri Lanka.
          </Typography>
        </Box>

        {/* Advantages Grid */}
        <Grid
          container
          spacing={4}
          sx={{ mt: { xs: 4, md: 6 } }}
        >
          {advantages.map((item, idx) => (
            <Grid item xs={12} sm={4} md={4} key={idx}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  maxWidth: 360,
                  borderRadius: 3,
                  bgcolor: "grey.50",
                  transition: "transform .25s ease, box-shadow .25s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ p: 4, textAlign: "center" }}>
                  <Box
                    sx={{
                      fontSize: 48,
                      lineHeight: 1,
                      mb: 2,
                      display: "inline-flex",
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Stats Section */}
        <Box
          sx={{
            mt: { xs: 8, md: 10 },
            borderRadius: 4,
            overflow: "hidden",
            position: "relative",
            p: { xs: 6, md: 8 },
            textAlign: "center",
            color: "#fff",
            backgroundImage:
              "url('https://i.pinimg.com/736x/0a/2d/12/0a2d1232dab309a9d3de38109705b9bc.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            // Gradient overlay
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(26,71,42,0.85) 0%, rgba(74,155,142,0.7) 30%, rgba(212,175,55,0.6) 70%, rgba(255,107,71,0.55) 100%)",
              zIndex: 0,
            },
          }}
        >
          <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, mb: 4, color: "#fff" }}
            >
              Our Track Record
            </Typography>

            <Grid container spacing={3} justifyContent="center">
              {stats
                .filter((s) => s.number && s.label)
                .map((stat, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Stack alignItems="center" spacing={1.2}>
                      <Typography variant="h3" sx={{ color: "#fff" }}>
                        {stat.number}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ color: "#fff", opacity: 0.95 }}>
                        {stat.label}
                      </Typography>
                    </Stack>
                  </Grid>
                ))}
            </Grid>
          </Container>
        </Box>
      </Container>
    </Box>
  );
}
