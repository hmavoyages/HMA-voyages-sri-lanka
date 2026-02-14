// src/pages/ItineraryDetail.jsx
import React from "react";
import { Grid } from '@mui/material';
import {
  Box, Container, Typography, Chip, Stack,
  Accordion, AccordionSummary, AccordionDetails,
  Card, CardContent, CardMedia, Divider, Button,
  Tooltip, useMediaQuery, Fab, CircularProgress
} from "@mui/material";
import { useParams, Link as RouterLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PeopleIcon from "@mui/icons-material/People";
import ScheduleIcon from "@mui/icons-material/Schedule";
import MapIcon from "@mui/icons-material/Map";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import LocalHotelIcon from "@mui/icons-material/LocalHotel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ✅ Map component (from previous step using Google APIs)
import GoogleRouteMap from "../pages/GoogleRouteMap";

const API_BASE = "http://backend.hmavoyages.com";
// Keep plus for display, but strip for wa.me links
const WA_NUMBER = "+94763011488";

const fadeIn = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 },
};

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

// 🔒 Robust placeholder generators (no flaky remote host)
const phSVG = (label) => {
  const text = (label || "HMA Voyages").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='#0f172a'/>
          <stop offset='100%' stop-color='#111827'/>
        </linearGradient>
      </defs>
      <rect width='1200' height='800' fill='url(#g)'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
            font-family='Inter, Segoe UI, Arial' font-size='48' fill='#f5f5f5'>
        ${text}
      </text>
    </svg>`;
  return `data:image/svg+xml;utf8,${svg}`;
};
const ph = (label) => phSVG(label);

// 🔧 Safe image component: auto-fallback to placeholder on error
function SafeImg({ src, alt, fallback, ...props }) {
  const [imgSrc, setImgSrc] = React.useState(src || fallback);
  React.useEffect(() => setImgSrc(src || fallback), [src, fallback]);
  return (
    <Box
      component="img"
      alt={alt}
      src={imgSrc}
      onError={() => setImgSrc(fallback)}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
}

export default function ItineraryDetail() {
  const { tourId } = useParams();
  const [pkg, setPkg] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [showTop, setShowTop] = React.useState(false);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  React.useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 420);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/packages/${encodeURIComponent(tourId)}`);
        const data = await res.json();
        const p = data?.data ?? data;
        setPkg(p ?? null);
      } catch (_e) {
        setPkg(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [tourId]);

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

  // sanitize WA number for wa.me (digits only)
  const waDigits = React.useMemo(() => (WA_NUMBER || "").replace(/\D/g, ""), []);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, display: "grid", placeItems: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!pkg) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5" fontWeight={800}>Package not found</Typography>
        <Button variant="outlined" sx={{ mt: 2 }} component={RouterLink} to="/">Back to Packages</Button>
      </Container>
    );
  }

  const heroImages =
    pkg.heroImages && pkg.heroImages.length
      ? pkg.heroImages
      : [pkg.cover].filter(Boolean);

  const safeHeroImages = (heroImages && heroImages.length ? heroImages : [ph(pkg.packageName || "Itinerary")]);

  const dayCount = Number(pkg.dayCount) || (pkg.days?.length || 1);
  const dayCountLabel = dayCount === 1 ? "Day Tour" : `${dayCount} Days / ${Math.max(dayCount - 1, 1)} Nights`;

  return (
    <Box sx={{ bgcolor: "background.default", color: "text.primary" }}>
      {/* top anchor so #top works */}
      <Box id="top" />

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
          {safeHeroImages.map((src, i) => (
            <Box key={i} sx={{ position: "relative", height: { xs: 360, sm: 420, md: 520 } }}>
              <SafeImg
                src={src}
                fallback={ph(pkg.packageName || "Itinerary")}
                alt={`${pkg.packageName} hero ${i + 1}`}
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
              label={`${dayCountLabel} • Private & Customizable`}
              sx={{
                mb: { xs: 1, md: 2 },
                bgcolor: "rgba(255,255,255,0.9)",
                fontSize: { xs: 12, sm: 13 },
                height: { xs: 28, sm: 32 },
              }}
            />
            <Typography variant={isXs ? "h4" : "h3"} fontWeight={800} color="#fff" sx={{ lineHeight: 1.15 }}>
              {pkg.packageName}
            </Typography>
            {!!pkg.description && (
              <Typography variant={isXs ? "body1" : "h6"} color="#f5f5f5" sx={{ mt: 0.75, pr: { md: 6 } }}>
                {pkg.description}
              </Typography>
            )}
            <Stack direction="row" spacing={1.25} sx={{ mt: 2, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                color="warning"
                size={isXs ? "medium" : "large"}
                startIcon={<MapIcon />}
                href="#route"
                sx={{ fontWeight: 700, borderRadius: 2 }}
              >
                View Route
              </Button>
              <Button
                variant="contained"
                color="success"
                size={isXs ? "medium" : "large"}
                startIcon={<WhatsAppIcon />}
                href={`https://wa.me/${waDigits}?text=I%27m%20interested%20in%20${encodeURIComponent(pkg.packageName)}%20(${pkg.tourId})`}
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
            { icon: <ScheduleIcon />, text: pkg.dayCount === 1 ? "Day tour pace" : "Balanced multi-day pace" },
            { icon: <MapIcon />, text: "Handpicked experiences & scenic routes" },
          ].map((h, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
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

      {/* ROUTE MAP (Google) */}
      <Container maxWidth="lg" sx={{ pb: { xs: 3, md: 6 } }} id="route">
        <Typography variant="h4" fontWeight={800} sx={{ mb: { xs: 1.5, md: 2.5 } }}>
          Route Map
        </Typography>

        <Card elevation={1} sx={{ borderRadius: 3, overflow: "hidden" }}>
          <GoogleRouteMap
            days={pkg.days || []}
            tourId={pkg.tourId}
            updatedAt={pkg.updatedAt}
            height={480}
          />
        </Card>

        <Stack direction="row" spacing={1.25} sx={{ mt: 1.5, flexWrap: "wrap" }}>
          <Chip icon={<MapIcon />} label="Interactive • Drag to explore" size="small" />
          <Chip icon={<AccessTimeIcon />} label={`${dayCount} day itinerary`} size="small" />
        </Stack>
      </Container>

      {/* ITINERARY */}
      <Box id="plan" sx={{ bgcolor: "background.paper", py: { xs: 3, md: 6 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight={800} sx={{ mb: { xs: 2, md: 3 } }}>
            Day-by-Day Itinerary
          </Typography>

          <Stack spacing={{ xs: 1.25, md: 2 }}>
            {(pkg.days ?? []).map((d, idx) => (
              <Accordion
                key={idx}
                defaultExpanded={idx === 0}
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
                    <Chip label={`Day ${d.day ?? d.n ?? idx + 1}`} color="warning" size="small" sx={{ fontWeight: 700 }} />
                    <Typography variant="subtitle1" fontWeight={800} sx={{ fontSize: { xs: 16.5, md: 18 } }}>
                      {d.title}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ ml: "auto" }}>
                      {d.stay && d.stay !== "—" && (
                        <Chip icon={<LocalHotelIcon />} label={`Stay: ${d.stay}`} size="small" sx={{ maxWidth: { xs: 160, sm: "none" } }} />
                      )}
                      {d.route && (
                        <Chip icon={<DirectionsCarIcon />} label={d.route} size="small" sx={{ maxWidth: { xs: 260, sm: "none" } }} />
                      )}
                    </Stack>
                  </Stack>
                </AccordionSummary>

                <AccordionDetails sx={{ pt: 0 }}>
                  <Grid container spacing={{ xs: 1.5, md: 3 }}>
                    <Grid size={{ xs: 12, md: 3 }}>
                      <Slider {...daySlider}>
                        {(d.images && d.images.length ? d.images : [ph(d.title || "Day")]).map((src, i) => (
                          <Box key={i} sx={{ px: { xs: 0.5, md: 0 } }}>
                            <Card sx={{ borderRadius: 3, overflow: "hidden", aspectRatio: { xs: "16/16", md: "9/9" } }}>
                              <CardMedia
                                component={() => (
                                  <SafeImg
                                    src={src}
                                    fallback={ph(d.title || `Day ${d.day ?? idx + 1}`)}
                                    alt={`Day ${(d.day ?? idx + 1)} image ${i + 1}`}
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                  />
                                )}
                              />
                            </Card>
                          </Box>
                        ))}
                      </Slider>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
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
                            {(d.plan ?? d.bullets ?? []).map((b, i) => (
                              <Stack key={i} direction="row" spacing={1.25} alignItems="flex-start">
                                <Box sx={{ mt: "7px", width: 8, height: 8, borderRadius: "50%", bgcolor: "warning.main", flex: "0 0 auto" }} />
                                <Typography sx={{ fontSize: { xs: 14.5, md: 16 } }}>{b}</Typography>
                              </Stack>
                            ))}
                          </Stack>
                          {d.stay && d.stay !== "—" && (
                            <>
                              <Divider sx={{ my: { xs: 1.25, md: 2 } }} />
                              <Stack direction="row" spacing={1.25} alignItems="center">
                                <Typography variant="body2">Overnight in <strong>{d.stay}</strong></Typography>
                              </Stack>
                            </>
                          )}
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
              href={`https://wa.me/${waDigits}?text=I%27d%20like%20to%20book%20${encodeURIComponent(pkg.packageName)}%20(${pkg.tourId})`}
              target="_blank"
              rel="noreferrer"
              sx={{ fontWeight: 800, borderRadius: 2 }}
            >
              Get a Quote on WhatsApp
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<MapIcon />}
              href="#top"
              sx={{ borderRadius: 2 }}
            >
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
              href={`https://wa.me/${waDigits}?text=Hi!%20I%27m%20interested%20in%20${encodeURIComponent(pkg.packageName)}%20(${pkg.tourId})`}
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

      {/* Back-to-top FAB */}
      {showTop && (
        <Tooltip title="Back to top" arrow>
          <Fab
            color="warning"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            sx={{ position: "fixed", right: 16, bottom: { xs: 76, md: 24 }, zIndex: 20, boxShadow: 4 }}
            aria-label="Back to top"
          >
            <ArrowUpwardIcon />
          </Fab>
        </Tooltip>
      )}
    </Box>
  );
}
