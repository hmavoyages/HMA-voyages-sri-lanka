// src/pages/ItinerarySL12.jsx
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
  IconButton,
  Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ScheduleIcon from "@mui/icons-material/Schedule";
import MapIcon from "@mui/icons-material/Map";
import LocalHotelIcon from "@mui/icons-material/LocalHotel";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ===== Dummy high-quality images (Unsplash) — replace with your own if you like =====
const heroImages = [
  "https://images.unsplash.com/photo-1530549387789-4c1017266637?q=80&w=1600&auto=format&fit=crop", // Sigiriya
  "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1600&auto=format&fit=crop", // Train/Ella
  "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=1600&auto=format&fit=crop", // Tea
  "https://images.unsplash.com/photo-1573376670482-47618e5e773e?q=80&w=1600&auto=format&fit=crop", // Beach south
  "https://images.unsplash.com/photo-1613027662310-33f06fd43572?q=80&w=1600&auto=format&fit=crop", // Galle Fort
];

const day = (n, title, stay, bullets, drive = "", images = []) => ({
  n,
  title,
  stay,
  drive,
  bullets,
  images,
});

const days = [
  day(
    1,
    "Arrival • Negombo",
    "Negombo",
    [
      "Visit Negombo Fish Market",
      "Explore Negombo Lagoon by boat",
    ],
    "Airport → Negombo",
    [
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620800824317-8c01b88f2b2a?q=80&w=1600&auto=format&fit=crop",
    ]
  ),
  day(
    2,
    "Dambulla & Sigiriya",
    "Sigiriya",
    [
      "Drive to Sigiriya (~3h30m)",
      "Visit Dambulla Cave Temple",
      "Village tour with traditional lunch",
      "Sunset at Lion Rock or Pidurangala",
    ],
    "Negombo → Sigiriya",
    [
      "https://images.unsplash.com/photo-1602747741691-7e7d9b7b51a0?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590935217281-8b8b4d4119e2?q=80&w=1600&auto=format&fit=crop",
    ]
  ),
  day(
    3,
    "Polonnaruwa • Safari • Ayurveda",
    "Sigiriya",
    [
      "Explore Ancient City of Polonnaruwa (~1h15m drive)",
      "Lunch at a farmer’s house",
      "Safari: Kaudulla / Minneriya / Eco Park (seasonal)",
      "Optional Sri Lankan Ayurvedic treatment",
    ],
    "Sigiriya ↔ Polonnaruwa / Park",
    [
      "https://images.unsplash.com/photo-1588862000464-6263cf5d7ccf?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544989164-31dc3c645987?q=80&w=1600&auto=format&fit=crop",
    ]
  ),
  day(
    4,
    "Local Markets • Matale • Kandy",
    "Kandy",
    [
      "Dambulla local market & woodcarving stop",
      "Matale: central point of Sri Lanka & Herbal Garden",
      "Matale Hindu Temple",
      "Kandy cultural dance (4.30 PM)",
      "Temple of the Tooth ceremony",
    ],
    "Sigiriya → Kandy",
    [
      "https://images.unsplash.com/photo-1616751657233-82e0e42f0a03?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598859441524-8a5c7d7d6d41?q=80&w=1600&auto=format&fit=crop",
    ]
  ),
  day(
    5,
    "Gems • Ramboda • Tea Country • Nuwara Eliya",
    "Nuwara Eliya",
    [
      "Gem museum & workshop",
      "Ramboda Falls viewpoint",
      "Tea plantation & factory tour",
      "Nuwara Eliya city stroll",
    ],
    "Kandy → Nuwara Eliya",
    [
      "https://images.unsplash.com/photo-1587315077550-1e5efee6fc50?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574068468668-a05a11f871da?q=80&w=1600&auto=format&fit=crop",
    ]
  ),
  day(
    6,
    "Scenic Train • Ella",
    "Ella",
    [
      "Train ride Nanu Oya → Ella (08:10 AM) *times vary*",
      "Nine Arches Bridge",
      "Walk to Little Adam’s Peak",
      "Visit a local Buddhist temple",
    ],
    "Nuwara Eliya → Ella",
    [
      "https://images.unsplash.com/photo-1585129360734-1c6a0a6a8eba?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607184372029-46c6ebf34fdd?q=80&w=1600&auto=format&fit=crop",
    ]
  ),
  day(
    7,
    "Waterfalls & Village Life (Koslanda)",
    "Koslanda",
    [
      "Ravana Falls",
      "Secret waterfall & Pallewela Ella Falls",
      "Visit Koslanda village",
      "Evening cooking lesson & dinner",
    ],
    "Ella → Koslanda",
    [
      "https://images.unsplash.com/photo-1614325606901-56f8f1a80bd1?q=80&w=1600&auto=format&fit=crop",
    ]
  ),
  day(
    8,
    "Upper Diyaluma • Buduruwagala",
    "Udawalawe / Tissamaharama",
    [
      "Swim at Upper Diyaluma Falls",
      "Picnic lunch in nature",
      "Buduruwagala rock monastery",
    ],
    "Koslanda → Udawalawe/Tissa",
    [
      "https://images.unsplash.com/photo-1616940868204-9d9bd353a0ab?q=80&w=1600&auto=format&fit=crop",
    ]
  ),
  day(
    9,
    "Safari • Down South",
    "Mirissa",
    [
      "Early Safari: Yala or Udawalawe (≈5h total)",
      "Head to the southern beaches",
      "Optional kayak at Tangalle Lagoon",
      "Beach hopping & Coconut Tree Hill",
    ],
    "Udawalawe/Tissa → Mirissa",
    [
      "https://images.unsplash.com/photo-1560879760-3ac0b88c1a6a?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590926938357-136f2fc51e2f?q=80&w=1600&auto=format&fit=crop",
    ]
  ),
  day(
    10,
    "Whales • Surf • Snorkel",
    "Mirissa",
    [
      "Whale & dolphin watching (seasonal)",
      "Surfing / snorkeling",
      "Relax at the beach cafés",
    ],
    "Around Mirissa",
    [
      "https://images.unsplash.com/photo-1510151075-7e88a0b67a21?q=80&w=1600&auto=format&fit=crop",
    ]
  ),
  day(
    11,
    "Galle • Madu River • Turtles",
    "Ahungalla / Negombo",
    [
      "Galle Fort walk",
      "Silk workshop",
      "Madu River cruise & Cinnamon Island",
      "Turtle conservation visit",
    ],
    "Mirissa → Ahungalla/Negombo",
    [
      "https://images.unsplash.com/photo-1613027662310-33f06fd43572?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544989164-31dc3c645987?q=80&w=1600&auto=format&fit=crop",
    ]
  ),
  day(
    12,
    "Departure",
    "—",
    ["Airport drop-off"],
    "Hotel → Airport",
    [
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1600&auto=format&fit=crop",
    ]
  ),
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  arrows: true,
};

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6 },
};

export default function ItinerarySL12() {
  const [showTop, setShowTop] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 480);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Box sx={{ bgcolor: "background.default", color: "text.primary" }}>
      {/* HERO */}
      <Box sx={{ position: "relative", height: { xs: 420, md: 520 }, overflow: "hidden" }}>
        <Slider {...sliderSettings}>
          {heroImages.map((src, i) => (
            <Box key={i} sx={{ position: "relative", height: { xs: 420, md: 520 } }}>
              <Box
                component="img"
                src={src}
                alt="Sri Lanka highlight"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.72)",
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
            alignItems: "center",
            zIndex: 2,
          }}
        >
          <Box
            component={motion.div}
            {...fadeIn}
            sx={{
              p: { xs: 2, md: 4 },
              maxWidth: 760,
              backdropFilter: "blur(4px)",
            }}
          >
            <Chip
              icon={<FlightTakeoffIcon />}
              label="12 Days / 11 Nights • Private & Customizable"
              sx={{ mb: 2, bgcolor: "rgba(255,255,255,0.9)" }}
            />
            <Typography variant="h3" fontWeight={800} color="#fff" sx={{ lineHeight: 1.1 }}>
              Sri Lanka Signature Journey
            </Typography>
            <Typography variant="h6" color="#f5f5f5" sx={{ mt: 1 }}>
              Ancient capitals, misty tea hills, scenic trains, wildlife safaris, and golden beaches.
            </Typography>
            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="warning"
                size="large"
                startIcon={<MapIcon />}
                href="#plan"
              >
                View Day-by-Day Plan
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                startIcon={<WhatsAppIcon />}
                href="https://wa.me/9477XXXXXXX?text=I%27m%20interested%20in%20the%2012-day%20Sri%20Lanka%20itinerary"
                target="_blank"
                rel="noreferrer"
              >
                Chat on WhatsApp
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* HIGHLIGHTS */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Grid container spacing={2}>
          {[
            { icon: <DirectionsCarIcon />, text: "Comfortable AC vehicle & driver-guide" },
            { icon: <ScheduleIcon />, text: "Balanced pace with free time" },
            { icon: <MapIcon />, text: "Handpicked experiences & scenic routes" },
            { icon: <LocalHotelIcon />, text: "Flexible hotel categories" },
          ].map((h, i) => (
            <Grid key={i} item xs={12} sm={6} md={3}>
              <Card
                component={motion.div}
                {...fadeIn}
                sx={{ height: "100%", borderRadius: 3 }}
              >
                <CardContent>
                  <Box sx={{ fontSize: 32, mb: 1 }}>{h.icon}</Box>
                  <Typography variant="subtitle1">{h.text}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ITINERARY */}
      <Box id="plan" sx={{ bgcolor: "background.paper", py: { xs: 4, md: 6 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight={800} sx={{ mb: 3 }}>
            Day-by-Day Itinerary
          </Typography>

          <Stack spacing={2}>
            {days.map((d) => (
              <Accordion key={d.n} defaultExpanded={d.n === 1} sx={{ borderRadius: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    flexWrap="wrap"
                    sx={{ width: "100%" }}
                  >
                    <Chip label={`Day ${d.n}`} color="warning" />
                    <Typography variant="h6" fontWeight={700}>
                      {d.title}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{ ml: "auto" }}
                    >
                      {d.stay !== "—" && (
                        <Chip icon={<LocalHotelIcon />} label={`Stay: ${d.stay}`} />
                      )}
                      {d.drive && <Chip icon={<DirectionsCarIcon />} label={d.drive} />}
                    </Stack>
                  </Stack>
                </AccordionSummary>

                <AccordionDetails>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Slider {...sliderSettings}>
                        {d.images.map((src, i) => (
                          <Box key={i}>
                            <Card sx={{ borderRadius: 3, overflow: "hidden" }}>
                              <CardMedia
                                component="img"
                                image={src}
                                alt={`Day ${d.n} image ${i + 1}`}
                                sx={{ height: { xs: 260, md: 360 }, objectFit: "cover" }}
                              />
                            </Card>
                          </Box>
                        ))}
                      </Slider>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Card sx={{ borderRadius: 3, height: "100%" }}>
                        <CardContent>
                          <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                            Plan
                          </Typography>
                          <Stack spacing={1.2}>
                            {d.bullets.map((b, i) => (
                              <Stack key={i} direction="row" spacing={1.5}>
                                <Box sx={{ mt: "6px", width: 8, height: 8, borderRadius: "50%", bgcolor: "warning.main" }} />
                                <Typography>{b}</Typography>
                              </Stack>
                            ))}
                          </Stack>
                          {d.stay !== "—" && (
                            <>
                              <Divider sx={{ my: 2 }} />
                              <Stack direction="row" spacing={1.5} alignItems="center">
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

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="warning"
              size="large"
              startIcon={<WhatsAppIcon />}
              href="https://wa.me/9477XXXXXXX?text=I%27d%20like%20to%20book%20the%2012-day%20Sri%20Lanka%20tour"
              target="_blank"
              rel="noreferrer"
            >
              Get a Quote on WhatsApp
            </Button>
            <Button variant="outlined" size="large" startIcon={<MapIcon />} href="#top">
              Back to Top
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Floating to-top + WhatsApp */}
      {showTop && (
        <Stack spacing={1} sx={{ position: "fixed", right: 16, bottom: 16, zIndex: 20 }}>
          <Tooltip title="Back to top" arrow>
            <IconButton
              color="warning"
              size="large"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              sx={{ bgcolor: "background.paper", boxShadow: 3 }}
            >
              <ArrowUpwardIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Chat on WhatsApp" arrow>
            <IconButton
              color="success"
              size="large"
              href="https://wa.me/9477XXXXXXX"
              target="_blank"
              rel="noreferrer"
              sx={{ bgcolor: "background.paper", boxShadow: 3 }}
            >
              <WhatsAppIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      )}
    </Box>
  );
}
