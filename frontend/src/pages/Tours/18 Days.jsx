// src/pages/ItinerarySL18.jsx
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
import LocalHotelIcon from "@mui/icons-material/LocalHotel";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ===== HERO images (swap to your direct links when ready) =====
const heroImages = [
  "https://upload.wikimedia.org/wikipedia/commons/e/e6/Sigiriya_%28141688197%29.jpeg",
  "https://upload.wikimedia.org/wikipedia/commons/f/f6/The_Nine_Arches_Bridge.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/8/83/Unawatuna.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/3/3a/Srilanka_galle_fort.jpg",
];

const ph = (n) => `https://via.placeholder.com/1200x800?text=Day+${n}`;

const day = (n, title, stay, bullets, drive = "", images = []) => ({
  n,
  title,
  stay,
  drive,
  bullets,
  images: images.length ? images : [ph(n)],
});

const days = [
  day(
    1,
    "Arrival • Negombo",
    "Negombo",
    [
      "Pick up from international airport and drive to Negombo (~25 min).",
      "Relax and recover from your flight.",
      "Negombo city tour and fish market.",
      "Lagoon & Dutch Canal boat ride.",
    ],
    "Airport → Negombo"
  ),
  day(
    2,
    "Kalpitiya Beach Time",
    "Kalpitiya",
    [
      "After breakfast, drive to Kalpitiya (~3 hours).",
      "Relax at the beach.",
    ],
    "Negombo → Kalpitiya"
  ),
  day(
    3,
    "Wilpattu Safari • Anuradhapura",
    "Anuradhapura",
    [
      "After breakfast, head to Anuradhapura (~2h 30m).",
      "En route: Half-day game drive at Wilpattu National Park (~4h).",
    ],
    "Kalpitiya → Wilpattu → Anuradhapura"
  ),
  day(
    4,
    "Sacred City • Mihintale • Sigiriya",
    "Sigiriya",
    [
      "Breakfast at hotel.",
      "Main sites: Sri Maha Bodhi, Ruwanwelisaya, Isurumuniya, etc.",
      "Climb Mihintale Rock Temple.",
      "Afternoon drive to Sigiriya (~1h 30m).",
    ],
    "Anuradhapura → Sigiriya"
  ),
  day(
    5,
    "Polonnaruwa • Minneriya Safari",
    "Sigiriya",
    [
      "Drive to Polonnaruwa (~1h 15m one way).",
      "Walking tour: Lankathilaka, Thuparamaya, Royal Palace, Rankoth Vehera, etc.",
      "Lunch at a farmer’s house.",
      "Half-day safari at Minneriya National Park.",
    ],
    "Sigiriya ↔ Polonnaruwa / Minneriya"
  ),
  day(
    6,
    "Sigiriya Rock • Village Lunch • Pidurangala Sunset",
    "Sigiriya",
    [
      "Climb the amazing Sigiriya Rock Fortress.",
      "Village tour with traditional Sri Lankan lunch & cooking demo.",
      "Evening: Sunset from Pidurangala Rock.",
      "Optional: Sri Lankan Ayurvedic treatment.",
    ],
    "Around Sigiriya"
  ),
  day(
    7,
    "Dambulla • Matale • Kandy Highlights",
    "Kandy",
    [
      "Proceed to Kandy (~2h 30m).",
      "Visit Dambulla Cave Temple.",
      "Matale Spice & Herbal Gardens.",
      "Matale Hindu Temple.",
      "Gem museum & workshop (Kandy).",
      "Kandy cultural dance show.",
      "Temple of the Tooth Relic.",
    ],
    "Sigiriya → Kandy"
  ),
  day(
    8,
    "Hill Country to Nuwara Eliya",
    "Nuwara Eliya",
    [
      "Drive to Nuwara Eliya (~2h 30m).",
      "Peradeniya Botanical Gardens.",
      "Ramboda Waterfalls.",
      "Tea plantations & factory visit.",
      "Nuwara Eliya city visit.",
    ],
    "Kandy → Nuwara Eliya"
  ),
  day(
    9,
    "Scenic Train to Ella • Little Adam’s Peak",
    "Ella",
    [
      "After breakfast, journey to Ella.",
      "Scenic train ride Nanu Oya → Ella (~2h 30m–3h).",
      "Afternoon climb Little Adam’s Peak.",
    ],
    "Nuwara Eliya → Ella"
  ),
  day(
    10,
    "Ella Leisure • Lipton’s Seat (Tuk-tuk) • Nine Arches",
    "Ella",
    [
      "Leisure in Ella or Tuk-tuk tour to Lipton’s Seat (~5h).",
      "Walk to the famous Nine Arches Bridge.",
      "Walk around Ella village.",
      "Visit Mahamevnawa Buddhist Temple.",
    ],
    "Around Ella"
  ),
  day(
    11,
    "Waterfalls & Cooking • Koslanda",
    "Koslanda",
    [
      "After breakfast, drive to Koslanda (~2h).",
      "Rawana Falls.",
      "Secret waterfall visit.",
      "Walk to Pallewela waterfall.",
      "Evening Sri Lankan cooking lesson & dinner.",
    ],
    "Ella → Koslanda"
  ),
  day(
    12,
    "Upper Diyaluma • Buduruwagala • Tissa/Udawalawe",
    "Tissamaharama / Udawalawe",
    [
      "Swim at the amazing Upper Diyaluma waterfall (~4h).",
      "Lunch at Upper Diyaluma.",
      "Visit Buduruwagala rock monastery.",
      "Overnight at Tissamaharama or Udawalawe.",
    ],
    "Koslanda → Tissa/Udawalawe"
  ),
  day(
    13,
    "Safari • Southern Point • Mirissa",
    "Mirissa",
    [
      "Early morning half-day game drive at Yala National Park or Udawalawe (~4h).",
      "Tangalle Lagoon kayaking.",
      "Walk to the southern point of Sri Lanka.",
      "Coconut Tree Hill visit.",
      "Leisure at the beach.",
    ],
    "Tissa/Udawalawe → Mirissa"
  ),
  day(
    14,
    "Whales • Surf • Snorkel",
    "Mirissa",
    [
      "Morning whales & dolphin watching (seasonal).",
      "Surfing or snorkeling.",
      "Leisure at the beach.",
    ],
    "Around Mirissa"
  ),
  day(
    15,
    "Unawatuna • Turtles • Galle",
    "Galle",
    [
      "After breakfast, drive to Galle (~1h).",
      "Stilt fishermen.",
      "Sea turtle hatchery.",
      "Leisure at the beach.",
    ],
    "Mirissa → Unawatuna → Galle"
  ),
  day(
    16,
    "Galle Fort • Coastal Leisure",
    "Galle",
    [
      "Leisure at the beach or snorkeling tour.",
      "After lunch, walk on Galle Fort and city.",
    ],
    "Around Galle"
  ),
  day(
    17,
    "Madu River • Colombo (optional) • Negombo",
    "Negombo",
    [
      "After breakfast, drive to Negombo (~2h 30m).",
      "River safari at Madu River.",
      "Colombo city tour (optional).",
    ],
    "Galle → Negombo (via Madu River / Colombo)"
  ),
  day(
    18,
    "Departure",
    "—",
    [
      "Drive to the airport (from Negombo ~30 min; from Colombo ~1h).",
      "Drop-off at the airport — End of the tour.",
    ],
    "Hotel → Airport"
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

const WA_NUMBER = "+94763011488"; // update if needed

export default function ItinerarySL18() {
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
                alt="Sri Lanka highlight"
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
              label="18 Days / 17 Nights • Private & Customizable"
              sx={{
                mb: { xs: 1, md: 2 },
                bgcolor: "rgba(255,255,255,0.9)",
                fontSize: { xs: 12, sm: 13 },
                height: { xs: 28, sm: 32 },
              }}
            />
            <Typography variant={isXs ? "h4" : "h3"} fontWeight={800} color="#fff" sx={{ lineHeight: 1.15 }}>
              Sri Lanka Explorer Plus
            </Typography>
            <Typography variant={isXs ? "body1" : "h6"} color="#f5f5f5" sx={{ mt: 0.75, pr: { md: 6 } }}>
              Kalpitiya shores, ancient capitals, wild safaris, tea country, scenic trains, and the southern coast.
            </Typography>
            <Stack direction="row" spacing={1.25} sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="warning"
                size={isXs ? "medium" : "large"}
                startIcon={<MapIcon />}
                href="#plan"
                sx={{ fontWeight: 700, borderRadius: 2 }}
              >
                View Plan
              </Button>
              <Button
                variant="contained"
                color="success"
                size={isXs ? "medium" : "large"}
                startIcon={<WhatsAppIcon />}
                href={`https://wa.me/94763011488?text=I%27m%20interested%20in%20the%2018-day%20Sri%20Lanka%20Tour`}
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
            { icon: <DirectionsCarIcon />, text: "Comfortable AC vehicle & driver-guide" },
            { icon: <PeopleIcon />, text: "English or French-speaking guides" },
            { icon: <ScheduleIcon />, text: "Balanced pace with free time" },
            { icon: <MapIcon />, text: "Handpicked experiences & scenic routes" },
            { icon: <LocalHotelIcon />, text: "Flexible hotel categories" },
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
                defaultExpanded={d.n === 1}
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
                      {d.stay !== "—" && (
                        <Chip icon={<LocalHotelIcon />} label={`Stay: ${d.stay}`} size="small" sx={{ maxWidth: { xs: 160, sm: "none" } }} />
                      )}
                      {d.drive && (
                        <Chip icon={<DirectionsCarIcon />} label={d.drive} size="small" sx={{ maxWidth: { xs: 240, sm: "none" } }} />
                      )}
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
                          {d.stay !== "—" && (
                            <>
                              <Divider sx={{ my: { xs: 1.25, md: 2 } }} />
                              <Stack direction="row" spacing={1.25} alignItems="center">
                                <LocalHotelIcon fontSize="small" />
                                <Typography variant="body2">
                                  Overnight in <strong>{d.stay}</strong>
                                </Typography>
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
              href={`https://wa.me/${WA_NUMBER}?text=I%27d%20like%20to%20book%20the%2018-day%20Sri%20Lanka%20tour`}
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
              href={`https://wa.me/${WA_NUMBER}?text=Hi!%20I%27m%20interested%20in%20the%2018-day%20Sri%20Lanka%20itinerary`}
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
