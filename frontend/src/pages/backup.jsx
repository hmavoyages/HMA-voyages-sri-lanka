// src/pages/AllPlans.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  Stack,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import MapIcon from "@mui/icons-material/Map";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

const fadeIn = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45 },
};

// Plans (unchanged)
const plans = [
  {
    title: "Sri Lanka Signature Journey",
    path: "/tours/d12",
    duration: "12 Days / 11 Nights",
    "cover":
      "https://upload.wikimedia.org/wikipedia/commons/e/e6/Sigiriya_%28141688197%29.jpeg",
  },
  {
    title: "Sri Lanka Grand Circuit",
    path: "/tours/d16",
    duration: "16 Days / 15 Nights",
    "cover":"https://upload.wikimedia.org/wikipedia/commons/f/f6/The_Nine_Arches_Bridge.jpg",
  },
  {
    title: "Sri Lanka Explorer Plus",
    path: "/tours/d18",
    duration: "18 Days / 17 Nights",
    "cover": "https://upload.wikimedia.org/wikipedia/commons/8/83/Unawatuna.jpg",
  },
  {
    title: "Colombo Day Tour",
    path: "/tours/colombo",
    duration: "≈ 5 Hours",
    "cover":"https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Colombo_City%2C_Sri_Lanka.jpg/1200px-Colombo_City%2C_Sri_Lanka.jpg",
  },
  {
    title: "Negombo Day Tour",
    path: "/tours/negombo",
    duration: "≈ 5 Hours",
    "cover":"https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Boats_Anchored_in_Negambo_Lagoon.jpg/1200px-Boats_Anchored_in_Negambo_Lagoon.jpg",
  },
  {
    title: "Galle Day Tour",
    path: "/tours/galle",
    duration: "≈ 15 Hours",
    "cover": "https://upload.wikimedia.org/wikipedia/commons/3/3a/Srilanka_galle_fort.jpg",
  },
  {
    title: "Kandy Day Tour",
    path: "/tours/kandy",
    duration: "≈ 14 Hours",
    "cover":"https://whc.unesco.org/uploads/thumbs/site_0450_0020-1200-630-20151105154018.jpg",
  },
  {
    title: "Sigiriya & Dambulla Day Tour",
    path: "/tours/sigiriya",
    duration: "≈ 15 Hours",
    "cover":"https://upload.wikimedia.org/wikipedia/commons/e/e6/Sigiriya_%28141688197%29.jpeg",
  },
  {
    title: "Yala National Park Day Tour",
    path: "/tours/yala",
    duration: "≈ 16 Hours",
    "cover": "https://upload.wikimedia.org/wikipedia/commons/f/f4/Leopards_Yala.jpg",
  },
];

const labelFor = (duration) =>
  duration.toLowerCase().includes("days") ? "Multi-Day" : "Day Tour";

export default function AllPlans() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box sx={{ bgcolor: "background.default", color: "text.primary" }}>
      {/* HERO HEADER */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(1200px 600px at 10% -10%, rgba(255,193,7,0.25), transparent), radial-gradient(900px 500px at 100% 0%, rgba(25,118,210,0.18), transparent)",
          borderBottomLeftRadius: { xs: 24, md: 32 },
          borderBottomRightRadius: { xs: 24, md: 32 },
          py: { xs: 5, sm: 7, md: 9 },
          mt: { xs: 2, md: 4 },
        }}
      >
        <br/>
        <br/>
        <Container maxWidth="lg" component={motion.div} {...fadeIn}>
          <Stack spacing={1.25} alignItems="center" textAlign="center">
            <Chip
              icon={<FlightTakeoffIcon />}
              label="Handpicked Sri Lanka Experiences"
              sx={{
                bgcolor: "rgba(255,255,255,0.9)",
                fontWeight: 700,
                mb: 0.5,
              }}
            />
            <Typography
              variant="h4"
              fontWeight={800}
              sx={{ fontSize: { xs: "1.8rem", md: "2.4rem" } }}
            >
              Explore Our Tour Plans
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 760 }}
            >
              Choose from immersive multi-day journeys and exciting day tours
              across Sri Lanka.
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* GRID (MUI Grid v2) */}
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
        <Grid
          container
          gap={{ xs: 2, md: 3 }}
          alignItems="stretch"
          justifyContent="center"
        >
          {plans.map((p, i) => {
            const planType = labelFor(p.duration);
            return (
              <Grid key={i} size={{ xs: 12, sm: 4, md: 3 }}>
                <Card
                  component={motion.div}
                  {...fadeIn}
                  whileHover={isMdUp ? { y: -4 } : {}}
                  transition={{ type: "spring", stiffness: 240, damping: 22 }}
                  elevation={3}
                  sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  {/* "cover" */}
                  <Box sx={{ position: "relative" }}>
                    <Box
                      component="img"
                      src={
                        p.cover ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfmOngfjEFXuomRBrD-WyA5OKTar7MXAuyEw&s"
                      }
                      alt={p.title}
                      loading="lazy"
                      decoding="async"
                      sx={{
                        width: "100%",
                        display: "block",
                        objectFit: "cover",
                        objectPosition: "center",
                        aspectRatio: { xs: "16 / 9", sm: "16 / 9", md: "4 / 2" },
                      }}
                    />
                    <Chip
                      size="small"
                      label={planType}
                      sx={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        bgcolor:
                          planType === "Multi-Day"
                            ? "rgba(25,118,210,0.9)"
                            : "rgba(76,175,80,0.9)",
                        color: "#fff",
                        fontWeight: 700,
                        backdropFilter: "blur(4px)",
                      }}
                    />
                  </Box>

                  {/* CONTENT (clickable, SPA navigation) */}
                  <CardActionArea
                    component={RouterLink}
                    to={p.path}
                    sx={{ flexGrow: 1 }}
                  >
                    <CardContent sx={{ py: { xs: 1.75, md: 2.25 } }}>
                      <Stack spacing={1} alignItems="flex-start">
                        <Typography
                          variant="h6"
                          fontWeight={800}
                          sx={{
                            lineHeight: 1.2,
                            fontSize: { xs: 16.5, md: 18 },
                          }}
                        >
                          {p.title}
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          sx={{ color: "text.secondary" }}
                        >
                          <FlightTakeoffIcon fontSize="small" />
                          <Typography variant="body2">{p.duration}</Typography>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </CardActionArea>

                  <Divider sx={{ opacity: 0.5 }} />

                  {/* CTA */}
                  <Box sx={{ p: { xs: 1.5, md: 2 } }}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="warning"
                      size="medium"
                      startIcon={<MapIcon />}
                      component={RouterLink}
                      to={p.path}
                      sx={{
                        fontWeight: 800,
                        borderRadius: 2,
                        textTransform: "none",
                        py: 1.05,
                      }}
                    >
                      View Plan
                    </Button>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
