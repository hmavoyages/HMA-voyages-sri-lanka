import { useEffect, useState } from "react";
import {
  Box, Chip, Container, Grid,
  Stack, TextField, Typography, Button, Card, CardContent, useMediaQuery,
  CardActionArea, Divider
} from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import MapIcon from "@mui/icons-material/Map";

const fadeIn = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45 },
};

const API_BASE = "https://tv3vzvbn-5000.asse.devtunnels.ms";

export default function TourPackages() {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");
  const [minDays, setMinDays] = useState("");
  const [maxDays, setMaxDays] = useState("");
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  async function load() {
    setLoading(true);
    try {
      const p = new URLSearchParams();
      if (q.trim()) p.set("q", q.trim());
      if (minDays) p.set("minDays", String(minDays));
      if (maxDays) p.set("maxDays", String(maxDays));
      const res = await fetch(`${API_BASE}/packages?${p.toString()}`);
      const data = await res.json();
      setRows(Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);
  useEffect(() => {
    const t = setTimeout(load, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line
  }, [q, minDays, maxDays]);

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
      <br />
      <br />
      <Container maxWidth="lg">
        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography variant="h3" fontWeight={800}>Tour Packages</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Browse our itineraries and daily plans.
          </Typography>
        </Stack>

        <Stack direction={{ xs: "column", md: "row" }} gap={2} sx={{ mb: 3 }}>
          <TextField fullWidth placeholder="Search by Your Destination" value={q} onChange={(e) => setQ(e.target.value)} />
          <Button onClick={() => { setQ(""); setMinDays(""); setMaxDays(""); }}>Reset</Button>
        </Stack>

        <Grid container spacing={3}>
          {rows.map((p, i) => {
            const planType = (p.dayCount != 1) ? "Multi-Day" : "Day Tour";
            return (
              <Grid key={i} size={{ xs: 12, sm: 4, md: 4 }}>
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
                          {p.packageName}
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          sx={{ color: "text.secondary" }}
                        >
                          <FlightTakeoffIcon fontSize="small" />
                          <Typography variant="body2">{p.dayCount} Days </Typography>
                        </Stack>

                        <Typography variant="body2">{p.description}</Typography>
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
                      href={`/${p.tourId}`}
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
