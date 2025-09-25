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

// ===== Dummy high-quality images (Unsplash) — replace with your own if you like =====
const heroImages = [
  "data:image/jpeg;base64,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", // Sigiriya
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/The_Nine_Arches_Bridge.jpg/330px-The_Nine_Arches_Bridge.jpg", // Train/Ella
  "https://upload.wikimedia.org/wikipedia/commons/c/c5/Cueilleuses_de_th%C3%A9_Nuwara_Eliya.JPG", // Tea
  "https://upload.wikimedia.org/wikipedia/commons/8/83/Unawatuna.jpg", // Beach south
  "https://upload.wikimedia.org/wikipedia/commons/3/3a/Srilanka_galle_fort.jpg", // Galle Fort
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
    ["Visit Negombo Fish Market", "Explore Negombo Lagoon"],
    "Airport → Negombo",
    [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/38/24/aa/caption.jpg?w=800&h=400&s=1",
      "https://www.travelmapsrilanka.com/destinations/destinationimages/negombo-lagoon-in-sri-lanka.webp",
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
      "https://www.srilankatravellers.com/assets/images/srilanka-splendor/img-04.webp",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Sigiriya_%28141688197%29.jpeg/1200px-Sigiriya_%28141688197%29.jpeg",
      "https://www.gokitetours.com/wp-content/uploads/2024/02/5-Traditional-Sri-Lankan-Dishes-to-Try.webp",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYvdHqtitd3ruxPWuSqSY83iWOfPVLY2d4rA&s",
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
      "https://www.yogawinetravel.com/wp-content/uploads/2017/12/Vatadage-Sacred-Quadrangle-Polonnaruwa-Sri-Lanka.jpg",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/5e/07/6a/caption.jpg?w=800&h=800&s=1",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS2aoGFfAM-q7K0JzoyiBsoRX4VQATYBj4BQ&s",
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
    "Matale → Kandy",
    [
      "https://media.istockphoto.com/id/994169050/photo/dambulla-dedicated-economic-center.jpg?s=612x612&w=0&k=20&c=m8Cd8jzFffIfLkN6f1pqwWqy69TTOb9xjDuBnBsOdU4=",
      "https://media.gettyimages.com/id/1234707750/photo/muthumariamman-temple-or-arulmigu-sri-muthumari-amman-kovil-is-a-hindu-temple-in-matale-sri.jpg?s=1024x1024&w=gi&k=20&c=4KXvYlry_ujVZ5PZ28RrZmuDDMjNJRVzzy8qxWxQv80=",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ78QDAJb7bIlPa87X8v5aBxeq7iMPxq7CV2w&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8j7CXvGLXj7GxXnsfJujm9Y1tmmC6eJiqTQ&s",
    ]
  ),
  day(
    5,
    "Gems • Ramboda • Nuwara Eliya",
"Nuwara Eliya",
[
  "Gem museum & workshop",
  "Ramboda Falls viewpoint",
  "Tea plantation & factory tour",
  "Nuwara Eliya city stroll",
],
"Kandy → Nuwara Eliya",
[
  "https://raw.githubusercontent.com/hmavoyages/HMA-voyages-sri-lanka/refs/heads/main/Images/Screenshot%202025-09-25%20054752.png",
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
      "https://raw.githubusercontent.com/hmavoyages/HMA-voyages-sri-lanka/refs/heads/main/Images/Gemini_Generated_Image_q5qg6gq5qg6gq5qg.png",
    ]
  ),
  day(
    7,
    "Waterfalls & Village Life",
    "Koslanda",
    ["Ravana Falls", "Secret waterfall & Pallewela Ella Falls", "Visit Koslanda village", "Evening cooking lesson & dinner"],
    "Ella → Koslanda",
    ["https://raw.githubusercontent.com/hmavoyages/HMA-voyages-sri-lanka/refs/heads/main/Images/Gemini_Generated_Image_xjymgexjymgexjym.png"]
  ),
  day(
    8,
    "Upper Diyaluma • Buduruwagala",
    "Udawalawe / Tissamaharama",
    ["Swim at Upper Diyaluma Falls", "Picnic lunch in nature", "Buduruwagala rock monastery"],
    "Koslanda → Udawalawe/Tissa",
    ["https://images.unsplash.com/photo-1616940868204-9d9bd353a0ab?q=80&w=1600&auto=format&fit=crop"]
  ),
  day(
    9,
    "Safari • Down South",
    "Mirissa",
    ["Early Safari: Yala or Udawalawe (≈5h total)", "Head to the southern beaches", "Optional kayak at Tangalle Lagoon", "Beach hopping & Coconut Tree Hill"],
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
    ["Whale & dolphin watching (seasonal)", "Surfing / snorkeling", "Relax at the beach cafés"],
    "Around Mirissa",
    ["https://images.unsplash.com/photo-1510151075-7e88a0b67a21?q=80&w=1600&auto=format&fit=crop"]
  ),
  day(
    11,
    "Galle • Madu River • Turtles",
    "Ahungalla / Negombo",
    ["Galle Fort walk", "Silk workshop", "Madu River cruise & Cinnamon Island", "Turtle conservation visit"],
    "Mirissa → Ahungalla/Negombo",
    [
      "https://images.unsplash.com/photo-1613027662310-33f06fd43572?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544989164-31dc3c645987?q=80&w=1600&auto=format&fit=crop",
    ]
  ),
  day(12, "Departure", "—", ["Airport drop-off"], "Hotel → Airport", [
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1600&auto=format&fit=crop",
  ]),
];

// Base slider settings; we tweak per breakpoint in component
const baseSliderSettings = {
  dots: true,
  infinite: true,
  speed: 450,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  adaptiveHeight: true,
  // Improve tap targets on mobile dots
  appendDots: (dots) => (
    <ul style={{ margin: 0, padding: "8px 0" }}>
      {dots}
    </ul>
  ),
};

const fadeIn = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 },
};

const WA_NUMBER = "+94763011488"; // <- replace once you’re ready

export default function ItinerarySL12() {
  const [showTop, setShowTop] = React.useState(false);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));

  React.useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 420);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Slider settings adapt to screen size
  const heroSlider = {
    ...baseSliderSettings,
    arrows: !isXs, // hide arrows on phones (swipe)
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };

  const daySlider = {
    ...baseSliderSettings,
    arrows: !isXs,
    autoplay: isXs, // only auto on phones so users see images without extra taps
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
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              {/* Gradient overlay for readability */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.65) 100%)",
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
              label="12 Days / 11 Nights • Private & Customizable"
              sx={{
                mb: { xs: 1, md: 2 },
                bgcolor: "rgba(255,255,255,0.9)",
                fontSize: { xs: 12, sm: 13 },
                height: { xs: 28, sm: 32 },
              }}
            />
            <Typography
              variant={isXs ? "h4" : "h3"}
              fontWeight={800}
              color="#fff"
              sx={{ lineHeight: 1.15 }}
            >
              Sri Lanka Signature Journey
            </Typography>
            <Typography
              variant={isXs ? "body1" : "h6"}
              color="#f5f5f5"
              sx={{ mt: 0.75, pr: { md: 6 } }}
            >
              Ancient capitals, misty tea hills, scenic trains, wildlife safaris, and golden beaches.
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
                href={`https://wa.me/94763011488?text=I%27m%20interested%20in%20the%2012-day%20Sri%20Lanka%20Travel%20Plan`}
                target="_blank"
                rel="noreferrer"
                sx={{
                  fontWeight: 700,
                  borderRadius: 2,
                  textTransform: "none", // keeps "WhatsApp" casing nice
                }}
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
            { icon: <PeopleIcon />, text: "Perfect English or French-speaking guides" },
            { icon: <ScheduleIcon />, text: "Balanced pace with free time" },
            { icon: <MapIcon />, text: "Handpicked experiences & scenic routes" },
            { icon: <LocalHotelIcon />, text: "Flexible hotel categories" },
          ].map((h, i) => (
            <Grid key={i} item xs={12} sm={6} md={3}>
              <Card
                component={motion.div}
                {...fadeIn}
                elevation={1}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  p: { xs: 0.25, md: 0 },
                }}
              >
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
                  <Stack
                    direction="row"
                    spacing={1.25}
                    alignItems="center"
                    flexWrap="wrap"
                    sx={{ width: "100%" }}
                  >
                    <Chip
                      label={`Day ${d.n}`}
                      color="warning"
                      size="small"
                      sx={{ fontWeight: 700 }}
                    />
                    <Typography
                      variant="subtitle1"
                      fontWeight={800}
                      sx={{ fontSize: { xs: 16.5, md: 18 } }}
                    >
                      {d.title}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{ ml: "auto" }}
                    >
                      {d.stay !== "—" && (
                        <Chip
                          icon={<LocalHotelIcon />}
                          label={`Stay: ${d.stay}`}
                          size="small"
                          sx={{ maxWidth: { xs: 150, sm: "none" } }}
                        />
                      )}
                      {d.drive && (
                        <Chip
                          icon={<DirectionsCarIcon />}
                          label={d.drive}
                          size="small"
                          sx={{ maxWidth: { xs: 180, sm: "none" } }}
                        />
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
                            <Card
                              sx={{
                                borderRadius: 3,
                                overflow: "hidden",
                                aspectRatio: { xs: "16 / 16", md: "9 / 9" },
                              }}
                            >
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

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.25}
            sx={{ mt: { xs: 2.5, md: 4 } }}
          >
            <Button
              variant="contained"
              color="warning"
              size="large"
              startIcon={<WhatsAppIcon />}
              href={`https://wa.me/${WA_NUMBER}?text=I%27d%20like%20to%20book%20the%2012-day%20Sri%20Lanka%20tour`}
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
              href={`https://wa.me/${WA_NUMBER}?text=Hi!%20I%27m%20interested%20in%20the%2012-day%20Sri%20Lanka%20itinerary`}
              target="_blank"
              rel="noreferrer"
              sx={{ fontWeight: 700, borderRadius: 2 }}
            >
              Chat on WhatsApp
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<MapIcon />}
              href="#plan"
              sx={{ fontWeight: 700, borderRadius: 2 }}
            >
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
              bottom: { xs: 76, md: 24 }, // leave room for sticky bar on mobile
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
