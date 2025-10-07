// AdvantagesMUI.jsx (responsive alignments)
import * as React from "react";
import { Box, Container, Grid, Typography, Card, CardContent, Stack } from "@mui/material";

export default function AdvantagesMUI() {
  const advantages = [
    { icon: "✈️", title: "Airport Pick-up", description: "Convenient and comfortable airport transfers to start your journey smoothly." },
    { icon: "🏨", title: "Hotel Booking", description: "Book the best hotels across Sri Lanka with ease, from luxury resorts to cozy stays." },
    { icon: "🚐", title: "Vehicle/Van with A/C", description: "Travel in comfort with our fully air-conditioned vehicles and experienced drivers." },
    { icon: "🍽️", title: "Restaurant Reservation", description: "Reserve tables at popular local restaurants and enjoy authentic Sri Lankan cuisine." },
    { icon: "🎫", title: "Ticket Booking", description: "Book tickets for tours, events, and activities hassle-free with our assistance." }
  ];

  const stats = [
    { number: "250+", label: "Happy Travelers" },
    { number: "5+", label: "Years Experience" },
    { number: "150+", label: "Unique Destinations" },
    { number: "97%", label: "Satisfaction Rate" },
  ];

  return (
    <Box component="section" id="advantages" sx={{ py: { xs: 6, md: 10 }, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        {/* Heading */}
        <Stack spacing={1} sx={{ textAlign: { xs: "center", md: "Center" }, mb: { xs: 4, md: 6 } }}>
          <Typography
            component="h2"
            sx={{ fontWeight: 800, fontSize: { xs: 28, md: 36 }, lineHeight: 1.2 }}
          >
            Why Choose HMA Voyages?
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ fontWeight: 200, mx: { xs: "auto", md: 0 }, lineHeight: 1.2 }}
          >
            We don't just organize trips – we create life-changing experiences that connect you
            with the heart and soul of Sri Lanka.
          </Typography>
        </Stack>

        {/* Advantages Grid */}
        <Grid container justifyContent="center" gap={{ xs: 2, md: 4 }} sx={{ mt: { xs: 2, md: 4 } }}>
          {advantages.map((item, idx) => (
            <Grid key={idx} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  bgcolor: "grey.50",
                  display: "flex",
                  flexDirection: "column",
                  transform: "translateZ(0)",
                  transition: "transform .25s ease, box-shadow .25s ease",
                  "&:hover": { transform: { md: "translateY(-6px)" }, boxShadow: { md: 6 } },
                  // center on mobile
                }}
              >
                <CardContent
                  sx={{
                    p: { xs: 3, md: 4 },
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                    // helps equalize heights so footers align if you add actions later
                    flexGrow: 1,
                  }}
                >
                  <Box sx={{ fontSize: { xs: 40, md: 56 }, lineHeight: 1, mb: { xs: 1, md: 2 } }}>
                    {item.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, fontSize: { xs: 18, md: 20 } }}
                    gutterBottom
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: 13, md: 14 } }}>
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Stats Section 
        <Box
          sx={{
            mt: { xs: 8, md: 10 },
            borderRadius: 4,
            overflow: "hidden",
            position: "relative",
            p: { xs: 5, md: 8 },
            textAlign: "center",
            color: "#fff",
            backgroundImage:
              "url('https://images.unsplash.com/photo-1581420456035-58b8efadcdea?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNyaSUyMGxhbmthJTIwYmVhY2h8ZW58MHx8MHx8fDA%3D')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            // disable fixed on mobile to avoid scroll jank
            backgroundAttachment: { xs: "scroll", md: "fixed" },
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
              component="h3"
              sx={{ fontWeight: 800, mb: { xs: 3, md: 4 }, color: "#fff", fontSize: { xs: 26, md: 34 } }}
            >
              Our Track Record
            </Typography>

            <Grid container justifyContent="center" gap={{ xs: 2, md: 3 }}>
              {stats.filter((s) => s.number && s.label).map((stat, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                  <Stack alignItems="center" spacing={1}>
                    <Typography
                      sx={{ color: "#fff", fontWeight: 800, fontSize: { xs: 28, md: 36 }, lineHeight: 1.1 }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "#fff", opacity: 0.95, fontSize: { xs: 14, md: 16 } }}
                    >
                      {stat.label}
                    </Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>*/}
      </Container>
    </Box>
  );
}
