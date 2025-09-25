import React, { useEffect, useState } from "react";
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
  Link,
  Button,         // ← add
} from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import AddTestimonialDialog from "./AddTestimonialDialog"; // ← add (adjust path)


const Testimonials = () => {
  const theme = useTheme();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [openAdd, setOpenAdd] = useState(false); // ← add

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("https://tv3vzvbn-5000.asse.devtunnels.ms/testimonials");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const items = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
        setTestimonials(items);
      } catch (e) {
        console.error("Error fetching testimonials:", e);
        setErr("Failed to load testimonials.");
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const handleCreated = (created) => {
    // created likely = { testimonialId, ... }
    setTestimonials((prev) => [created, ...prev]);
  };

  if (loading) return <Box sx={{ py: 6, textAlign: "center" }}>Loading testimonials…</Box>;
  if (err) return <Box sx={{ py: 6, textAlign: "center", color: "error.main" }}>{err}</Box>;
  if (testimonials.length === 0)
    return (
      <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg" sx={{ textAlign: "center" }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            No testimonials yet.
          </Typography>
          <Button variant="contained" onClick={() => setOpenAdd(true)}>
            Add Testimonial
          </Button>
          <AddTestimonialDialog
            open={openAdd}
            onClose={() => setOpenAdd(false)}
            onCreated={handleCreated}
          />
        </Container>
      </Box>
    );

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: "background.paper" }}>
      <Container maxWidth="lg">
        {/* Header row with action button */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
          spacing={2}
          sx={{ mb: { xs: 6, md: 8 } }}
        >
          <Stack spacing={1}>
            <Typography variant="h3" fontWeight={700} color="text.primary">
              What Our Travelers Say
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mx: "auto" }}>
              Don&apos;t just take our word for it—hear from the adventurers who have
              experienced the magic of Sri Lanka with us.
            </Typography>
          </Stack>
        </Stack>

        <Button variant="contained" onClick={() => setOpenAdd(true)}
          sx={{ mb: 4, backgroundColor: '#ff4800ff', '&:hover': { backgroundColor: '#244427' } }}>
          Write a Reviewe
        </Button>

        <br></br>
        <br></br>

        {/* Cards Grid */}
        <Grid container spacing={3}>
          {testimonials.map((t, idx) => {
            const key = t.testimonialId || `${t.name || "guest"}-${idx}`;
            const ratingVal = Number(t.rating) || 0;
            return (
              <Grid key={key} item xs={12} sm={6} md={4}>
                <Card
                  elevation={4}
                  sx={{
                    position: "relative",
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
                      top: 12,
                      left: 12,
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

                  {/* Optional image mosaic */}
                  {Array.isArray(t.images) && t.images.length > 0 && (
                    <Box sx={{ mb: 2, mt: 3 }}>
                      <ImageList
                        variant="quilted"
                        cols={3}
                        rowHeight={200}
                        gap={6}
                        sx={{ borderRadius: 2, overflow: "hidden" }}
                      >
                        {t.images.slice(0, 3).map((src, i) => (
                          <ImageListItem key={i} cols={1} rows={1}>
                            <img
                              src={typeof src === "string" ? src : src?.src || ""}
                              alt={`testimonial-${key}-${i}`}
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
                      mt: t.images?.length ? 0 : 3,
                    }}
                  >
                    {t.text}
                  </Typography>

                  {/* Reviewer */}
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar alt={t.name} src={t.photo || ""} sx={{ width: 56, height: 56 }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" fontWeight={600} color="text.primary">
                        {t.name || "Happy Traveler"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        From: {t.location || ""}
                      {t.location && (
                        <img
                          src={`https://flagcdn.com/24x18/${t.location.toLowerCase()}.png`}
                          alt={t.location}
                          style={{ verticalAlign: "middle", marginRight: 6, borderRadius: 2, boxShadow: "0 1px 4px rgba(0,0,0,0.10)" }}
                          width={24}
                          height={18}
                        />
                      )}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                        <MuiRating value={ratingVal} precision={0.5} readOnly size="small" />
                        <Typography variant="caption" color="text.secondary">
                          {ratingVal ? `${ratingVal.toFixed(1)} / 5` : "Unrated"}
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>

                  {/* Trip tag */}
                  <CardContent sx={{ px: 0, pt: 2.5, mt: "auto" }}>
                    <Typography>
                      Trip to   :
                    {t.trip && (
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
                    )} </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* Dialog */}
      <AddTestimonialDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onCreated={handleCreated}
      />
    </Box>
  );
};

export default Testimonials;
