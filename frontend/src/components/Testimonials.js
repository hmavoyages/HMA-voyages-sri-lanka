import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Rating as MuiRating,
  Stack,
  Typography,
  useTheme,
  ImageList,
  ImageListItem,
} from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

// If you want to show images inside the first card like your data suggests,
// you can import them here and keep them in the testimonial item.
import tour2Image1 from "../assets/images/2/1.jpeg";
import tour2Image2 from "../assets/images/2/2.jpeg";
import tour2Image3 from "../assets/images/2/3.jpeg";

const Testimonials = () => {
  const theme = useTheme();

  const testimonials = [
    {
      text:
        "Our 2-week journey through Sri Lanka exceeded all expectations. From the ancient temples of Kandy to the wildlife safaris in Yala, every moment was perfectly organized. Kumara, our guide, was incredibly knowledgeable and made us feel like family.",
      name: "Sophie & Antoine Martin",
      location: "Melbourne, Australia",
      trip: "Complete Sri Lanka Tour",
      rating: 5,
      images: [tour2Image1, tour2Image2, tour2Image3],
      photo:
        "https://images.unsplash.com/photo-1494790108755-2616b612b77c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      text:
        "The train ride through the tea plantations was absolutely magical! MaiGlobe arranged everything perfectly, from boutique accommodations to authentic local experiences. We can't wait to return to this beautiful island.",
      name: "James Wilson",
      location: "London, UK",
      trip: "Highland Tea Country",
      rating: 5,
      photo:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      text:
        "As wildlife photographers, we were amazed by the safari experiences. Seeing leopards in Yala and elephants at Minneriya was incredible. The team's attention to detail and local connections made all the difference.",
      name: "Elena Rodriguez",
      location: "Barcelona, Spain",
      trip: "Wildlife Adventure",
      rating: 5,
      photo:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      text:
        "From the moment we contacted MaiGlobe until our return home, everything was flawless. The cultural insights, beautiful accommodations, and genuine warmth of the Sri Lankan people made this our best vacation ever.",
      name: "Michael & Sarah Chen",
      location: "Toronto, Canada",
      trip: "Cultural Triangle Explorer",
      rating: 5,
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      text:
        "The luxury boutique hotels were stunning, and the personalized service throughout our honeymoon was exceptional. Climbing Sigiriya at sunrise and relaxing on pristine beaches - it was pure magic!",
      name: "Isabella & Marco Rossi",
      location: "Milan, Italy",
      trip: "Luxury Boutique Escape",
      rating: 5,
      photo:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      text:
        "Hiking Adam's Peak and exploring the national parks was the adventure of a lifetime. The local guides were fantastic, and every day brought new discoveries. Highly recommend for active travelers!",
      name: "David Thompson",
      location: "Sydney, Australia",
      trip: "Adventure Trekking Tour",
      rating: 5,
      photo:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: "background.paper" }}>
      <Container maxWidth="lg">
        {/* Section Title */}
        <Stack spacing={2} sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
          <Typography variant="h3" fontWeight={700} color="text.primary">
            What Our Travelers Say
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ maxWidth: 700, mx: "auto" }}
          >
            Don&apos;t just take our word for it—hear from the adventurers who have
            experienced the magic of Sri Lanka with us.
          </Typography>
        </Stack>

        {/* Cards Grid */}
        <Grid container spacing={3}>
          {testimonials.map((t, idx) => (
            <Grid key={idx} item xs={12} sm={6} md={4}>
              <Card
                elevation={4}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  p: 3,
                  borderRadius: 3,
                  bgcolor: theme.palette.mode === "dark" ? "grey.900" : "#f8f9fa",
                  boxShadow: "0 5px 20px rgba(0,0,0,0.10)",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
                  },
                }}
              >
                {/* Quote badge */}
                <Box
                  sx={{
                    position: "absolute",
                    mt: "-20px",
                    ml: "12px",
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    bgcolor: "#ff6b35",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    boxShadow: "0 6px 12px rgba(255,107,53,0.35)",
                  }}
                >
                  <FormatQuoteIcon fontSize="small" />
                </Box>
                  <br></br>

                {/* Optional image mosaic for items with images */}
                {Array.isArray(t.images) && t.images.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <ImageList variant="quilted" cols={3} rowHeight={200} gap={6} sx={{ borderRadius: 2, overflow: "hidden" }}>
                      {t.images.slice(0, 3).map((src, i) => (
                        <ImageListItem key={i} cols={1} rows={1}>
                          <img
                            src={typeof src === "string" ? src : src?.src || ""}
                            alt={`testimonial-${idx}-${i}`}
                            loading="lazy"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Box>
                )}

                {/* Text */}
                <Typography
                  variant="body1"
                  sx={{
                    fontStyle: "italic",
                    lineHeight: 1.7,
                    color: "text.secondary",
                    mb: 2.5,
                    mt: 1.5,
                  }}
                >
                  {t.text}
                </Typography>

                {/* Reviewer */}
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar alt={t.name} src={t.photo} sx={{ width: 56, height: 56 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight={600} color="text.primary">
                      {t.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t.location}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                      <MuiRating value={Number(t.rating)} precision={0.5} readOnly size="small" />
                      <Typography variant="caption" color="text.secondary">
                        {Number(t.rating).toFixed(1)} / 5
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>

                {/* Trip tag */}
                <CardContent sx={{ px: 0, pt: 2.5, mt: "auto" }}>
                  <Chip
                    label={t.trip}
                    size="small"
                    sx={{
                      bgcolor: "#2c5530",
                      color: "#fff",
                      fontWeight: 600,
                      letterSpacing: 0.2,
                      "& .MuiChip-label": { px: 1 },
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Testimonials;
