// src/pages/ItineraryGalleDay.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Chip,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Button,
  Tooltip,
  useMediaQuery,
  Fab,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PeopleIcon from "@mui/icons-material/People";
import ScheduleIcon from "@mui/icons-material/Schedule";
import MapIcon from "@mui/icons-material/Map";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ===== HERO images (replace with your direct links) =====
const heroImages = [
  "https://via.placeholder.com/1600x900?text=Galle+Fort+Ramparts",
  "https://via.placeholder.com/1600x900?text=Galle+Lighthouse",
  "https://via.placeholder.com/1600x900?text=Sea+Turtle+Hatchery",
  "https://via.placeholder.com/1600x900?text=Madu+River+Boat+Ride",
];

const ph = (label) => `https://via.placeholder.com/1200x800?text=${encodeURIComponent(label)}`;

const day = (n, title, stay, bullets, drive = "", images = []) => ({
  n,
  title,
  stay,
  drive,
  bullets,
  images: images.length ? images : [ph(`Galle Day ${n}`)],
});

const days = [
  day(
    1,
    "Galle Fort & Coastal Highlights",
    "—",
    [
      "Pick up from your hotel.",
      "Visit Dutch Fort and explore Galle city.",
      "Lunch at Galle Fort.",
      "Sea Turtle Hatchery visit.",
      "Boat ride at Madu River.",
      "Travel back to your hotel.",
      "Drop off to your hotel.",
    ],
    "Hotel ↔ Galle Fort / Madu River",
    [
      ph("Galle Fort Ramparts"),
      ph("Galle Lighthouse"),
      ph("Sea Turtle Hatchery"),
      ph("Madu River Safari"),
    ]
  ),
];

// Base slider settings
const baseSliderSettings = {
  dots: true,
  infinite: true,
  speed: 450,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  adaptiveHeight: true,
  appendDots: (dots) => <ul style={{ margin: 0, padding: "8px 0" }}>{dots}</ul>,
};

const fadeIn = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 },
};

const WA_NUMBER = "+94763011488"; // update if you prefer

export default function ItineraryGalleDay() {
  const [showTop, setShowTop] = React.useState(false);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  React.useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 420);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const heroSlider = {
    ...baseSliderSettings,
    arrows: !isXs,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };

  const daySlider = {
    ...baseSliderSettings,
    arrows: !isXs,
    autoplay: isXs,
    autoplaySpeed: 3500,
  };

  return (
    <Box sx={{ bgcolor: "background.default", color: "text.primary" }}>
      {/* HERO */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 360, sm: 420, md: 520 },
          overflow: "hidden",
          borderBottomLeftRadius: { xs: 24, md: 32 },
          borderBottomRightRadius: { xs: 24, md: 32 },
          boxShadow: { xs: 2, md: 4 },
        }}
      >
        <Slider {...heroSlider}>
          {heroImages.map((src, i) => (
            <Box key={i} sx={{ position: "relative", height: { xs: 360, sm: 420, md: 520 } }}>
              <Box
                component="img"
                src={src}
                alt="Galle highlight"
                loading="lazy"
                decoding="async"
                sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.65) 100%)",
                }}
              />
            </Box>
          ))}
        </Slider>

        <Container
          maxWidth="lg"
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: { xs: "flex-end", md: "center" },
            pb: { xs: 2.5, md: 0 },
            zIndex: 2,
          }}
        >
          <Box
            component={motion.div}
            {...fadeIn}
            sx={{
              p: { xs: 1.5, sm: 2.5, md: 4 },
              maxWidth: { xs: "100%", md: 760 },
              backdropFilter: "blur(2px)",
            }}
          >
            <Chip
              icon={<FlightTakeoffIcon />}
              label="Galle Day Tour • Private & Customizable"
              sx={{
                mb: { xs: 1, md: 2 },
                bgcolor: "rgba(255,255,255,0.9)",
                fontSize: { xs: 12, sm: 13 },
                height: { xs: 28, sm: 32 },
              }}
            />
            <Typography variant={isXs ? "h4" : "h3"} fontWeight={800} color="#fff" sx={{ lineHeight: 1.15 }}>
              Galle Day Tour
            </Typography>
            <Typography variant={isXs ? "body1" : "h6"} color="#f5f5f5" sx={{ mt: 0.75, pr: { md: 6 } }}>
              “Experience the historic charm of Galle’s fort and coast.”
            </Typography>
            <Stack direction="row" spacing={1.25} sx={{ mt: 2, flexWrap: "wrap" }}>
              <Chip icon={<AccessTimeIcon />} label="Activity Duration: ~15 hours" sx={{ bgcolor: "rgba(255,255,255,0.9)" }} />
              <Button
                variant="contained"
                color="warning"
                size={isXs ? "medium" : "large"}
                startIcon={<MapIcon />}
                href="#plan"
                sx={{ fontWeight: 700, borderRadius: 2, ml: { xs: 0, sm: 1 } }}
              >
                View Plan
              </Button>
              <Button
                variant="contained"
                color="success"
                size={isXs ? "medium" : "large"}
                startIcon={<WhatsAppIcon />}
                href={`https://wa.me/94763011488?text=I%27m%20interested%20in%20the%20Galle%20Day%20Tour`}
                target="_blank"
                rel="noreferrer"
                sx={{ fontWeight: 700, borderRadius: 2, textTransform: "none" }}
              >
                WhatsApp
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* HIGHLIGHTS */}
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
        <Grid container spacing={{ xs: 1.5, md: 2 }}>
          {[
            { icon: <DirectionsCarIcon />, text: "Private AC vehicle & driver-guide" },
            { icon: <PeopleIcon />, text: "English or French-speaking guides" },
            { icon: <ScheduleIcon />, text: "Full-day coastal & heritage loop (~15h)" },
            { icon: <MapIcon />, text: "Dutch Fort, turtles & Madu River safari" },
          ].map((h, i) => (
            <Grid key={i} item xs={12} sm={6} md={3}>
              <Card component={motion.div} {...fadeIn} elevation={1} sx={{ height: "100%", borderRadius: 3, p: { xs: 0.25, md: 0 } }}>
                <CardContent sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box sx={{ fontSize: 28, display: "grid", placeItems: "center" }}>{h.icon}</Box>
                  <Typography variant="subtitle1" sx={{ fontSize: { xs: 14.5, md: 16 } }}>
                    {h.text}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ITINERARY */}
      <Box id="plan" sx={{ bgcolor: "background.paper", py: { xs: 3, md: 6 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight={800} sx={{ mb: { xs: 2, md: 3 } }}>
            Day-by-Day Itinerary
          </Typography>

          <Stack spacing={{ xs: 1.25, md: 2 }}>
            {days.map((d) => (
              <Accordion
                key={d.n}
                defaultExpanded
                disableGutters
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  border: "1px solid",
                  borderColor: "divider",
                  "&::before": { display: "none" },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Stack direction="row" spacing={1.25} alignItems="center" flexWrap="wrap" sx={{ width: "100%" }}>
                    <Chip label={`Day ${d.n}`} color="warning" size="small" sx={{ fontWeight: 700 }} />
                    <Typography variant="subtitle1" fontWeight={800} sx={{ fontSize: { xs: 16.5, md: 18 } }}>
                      {d.title}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ ml: "auto" }}>
                      <Chip icon={<DirectionsCarIcon />} label={d.drive} size="small" sx={{ maxWidth: { xs: 260, sm: "none" } }} />
                      <Chip icon={<AccessTimeIcon />} label="~15 hours" size="small" />
                    </Stack>
                  </Stack>
                </AccordionSummary>

                <AccordionDetails sx={{ pt: 0 }}>
                  <Grid container spacing={{ xs: 1.5, md: 3 }}>
                    <Grid item xs={12} md={6}>
                      <Slider {...daySlider}>
                        {d.images.map((src, i) => (
                          <Box key={i} sx={{ px: { xs: 0.5, md: 0 } }}>
                            <Card sx={{ borderRadius: 3, overflow: "hidden", aspectRatio: { xs: "16/16", md: "9/9" } }}>
                              <CardMedia
                                component="img"
                                image={src}
                                alt={`Day ${d.n} image ${i + 1}`}
                                loading="lazy"
                                decoding="async"
                                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                              />
                            </Card>
                          </Box>
                        ))}
                      </Slider>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Card sx={{ borderRadius: 3, height: "100%" }} elevation={0}>
                        <CardContent sx={{ pb: { xs: 1.5, md: 2 } }}>
                          <Typography
                            variant="subtitle2"
                            fontWeight={800}
                            gutterBottom
                            sx={{ letterSpacing: 0.2, textTransform: "uppercase", color: "text.secondary" }}
                          >
                            Plan
                          </Typography>
                          <Stack spacing={1.1}>
                            {d.bullets.map((b, i) => (
                              <Stack key={i} direction="row" spacing={1.25} alignItems="flex-start">
                                <Box
                                  sx={{
                                    mt: "7px",
                                    width: 8,
                                    height: 8,
                                    borderRadius: "50%",
                                    bgcolor: "warning.main",
                                    flex: "0 0 auto",
                                  }}
                                />
                                <Typography sx={{ fontSize: { xs: 14.5, md: 16 } }}>{b}</Typography>
                              </Stack>
                            ))}
                          </Stack>
                          {/* No overnight stay */}
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25} sx={{ mt: { xs: 2.5, md: 4 } }}>
            <Button
              variant="contained"
              color="warning"
              size="large"
              startIcon={<WhatsAppIcon />}
              href={`https://wa.me/${WA_NUMBER}?text=I%27d%20like%20to%20book%20the%20Galle%20Day%20Tour`}
              target="_blank"
              rel="noreferrer"
              sx={{ fontWeight: 800, borderRadius: 2 }}
            >
              Get a Quote on WhatsApp
            </Button>
            <Button variant="outlined" size="large" startIcon={<MapIcon />} href="#top" sx={{ borderRadius: 2 }}>
              Back to Top
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Sticky bottom mobile CTA */}
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          zIndex: 15,
          display: { xs: "block", md: "none" },
          backdropFilter: "saturate(180%) blur(10px)",
          backgroundColor: "rgba(18,18,18,0.6)",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg" sx={{ py: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              fullWidth
              variant="contained"
              color="success"
              startIcon={<WhatsAppIcon />}
              href={`https://wa.me/${WA_NUMBER}?text=Hi!%20I%27m%20interested%20in%20the%20Galle%20Day%20Tour`}
              target="_blank"
              rel="noreferrer"
              sx={{ fontWeight: 700, borderRadius: 2 }}
            >
              Chat on WhatsApp
            </Button>
            <Button fullWidth variant="outlined" startIcon={<MapIcon />} href="#plan" sx={{ fontWeight: 700, borderRadius: 2 }}>
              View Plan
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Floating back-to-top FAB */}
      {showTop && (
        <Tooltip title="Back to top" arrow>
          <Fab
            color="warning"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            sx={{
              position: "fixed",
              right: 16,
              bottom: { xs: 76, md: 24 },
              zIndex: 20,
              boxShadow: 4,
            }}
            aria-label="Back to top"
          >
            <ArrowUpwardIcon />
          </Fab>
        </Tooltip>
      )}
    </Box>
  );
}
