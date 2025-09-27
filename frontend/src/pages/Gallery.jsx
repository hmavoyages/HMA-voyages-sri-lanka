import React, { useEffect, useMemo, useState } from "react";
import {
  Box, Button, Card, CardActions, CardContent, Chip, Container, Dialog,
  DialogActions, DialogContent, DialogTitle, Grid, IconButton, ImageList,
  ImageListItem, Stack, TextField, Typography
} from "@mui/material";
import PhotoLibraryRoundedIcon from "@mui/icons-material/PhotoLibraryRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";

const API_BASE = "https://tv3vzvbn-5000.asse.devtunnels.ms";

export default function ToursGallery() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");

  // Lightbox
  const [lb, setLb] = useState({ open: false, idx: 0, imgIdx: 0 });

  async function load() {
    setLoading(true);
    try {
      const p = new URLSearchParams();
      if (q.trim()) p.set("q", q.trim());
      if (category !== "All") p.set("category", category);
      const res = await fetch(`${API_BASE}/gallery?${p.toString()}`);
      const data = await res.json();
      setRows(Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);
  useEffect(() => {
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line
  }, [q, category]);

  const categories = useMemo(() => {
    const set = new Set(rows.map((r) => r.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [rows]);

  const openLb = (idx, imgIdx = 0) => setLb({ open: true, idx, imgIdx });
  const closeLb = () => setLb((s) => ({ ...s, open: false }));
  const nextImg = () => {
    const imgs = rows[lb.idx]?.images || [];
    setLb((s) => ({ ...s, imgIdx: imgs.length ? (s.imgIdx + 1) % imgs.length : 0 }));
  };
  const prevImg = () => {
    const imgs = rows[lb.idx]?.images || [];
    setLb((s) => ({ ...s, imgIdx: imgs.length ? (s.imgIdx - 1 + imgs.length) % imgs.length : 0 }));
  };

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <br/>
        <br/>
        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography variant="h3" fontWeight={800}>Happy Moments</Typography>
          <Typography variant="subtitle1" color="text.secondary">Explore photos and details from each tour.</Typography>
        </Stack>

        <Stack direction={{ xs: "column", md: "row" }} gap={2} sx={{ mb: 3 }}>
          <TextField fullWidth placeholder="Search by title, description, or code (e.g., d12)…" value={q} onChange={(e) => setQ(e.target.value)} />
          <Stack direction="row" gap={1} flexWrap="wrap">
            {categories.map((c) => (
              <Chip
                key={c}
                label={c}
                color={category === c ? "primary" : "default"}
                onClick={() => setCategory(c)}
                icon={<CategoryRoundedIcon />}
                variant={category === c ? "filled" : "outlined"}
              />
            ))}
          </Stack>
        </Stack>

        <Grid container gap={3}>
          {rows.map((tour, idx) => {
            const hasImages = Array.isArray(tour.images) && tour.images.length > 0;
            return (
              <Grid key={tour.galleryId} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card sx={{ height: "100%", borderRadius: 3, border: "1px solid", borderColor: "divider", display: "flex", flexDirection: "column" }}>
                  <Box sx={{ p: hasImages ? 1.25 : 3 }}>
                    {hasImages ? (
                      <ImageList variant="quilted" cols={3} rowHeight={140} gap={6} sx={{ borderRadius: 2, overflow: "hidden" }}>
                        {tour.images.slice(0, 6).map((src, i) => (
                          <ImageListItem key={i} cols={1} rows={1} onClick={() => openLb(idx, i)} sx={{ cursor: "zoom-in" }}>
                            <img src={src} alt={`${tour.title}-img-${i}`} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                          </ImageListItem>
                        ))}
                      </ImageList>
                    ) : (
                      <Box sx={{ border: "1px dashed", borderColor: "divider", borderRadius: 2, minHeight: 180, display: "grid", placeItems: "center", bgcolor: "action.hover" }}>
                        <Stack spacing={1} alignItems="center">
                          <PhotoLibraryRoundedIcon />
                          <Typography variant="body2" color="text.secondary">No images yet for this tour.</Typography>
                        </Stack>
                      </Box>
                    )}
                  </Box>

                  <CardContent sx={{ pt: 1, flex: 1 }}>
                    <Stack spacing={1}>
                      <Typography variant="h6" fontWeight={700}>{tour.title}</Typography>
                      <Stack direction="row" gap={1} flexWrap="wrap">
                        {tour.tours && <Chip label={tour.tours} size="small" sx={{ fontWeight: 600 }} />}
                        {tour.category && <Chip label={tour.category} size="small" color="success" variant="outlined" />}
                      </Stack>
                      <Typography variant="body2" color="text.secondary">{tour.description}</Typography>
                    </Stack>
                  </CardContent>

                  <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
                    <Button variant="contained" startIcon={<PhotoLibraryRoundedIcon />} onClick={() => openLb(idx, 0)} disabled={!hasImages}>
                      View Gallery
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}

          {!loading && rows.length === 0 && (
            <Grid size={{ xs: 12 }}>
              <Box sx={{ py: 6, textAlign: "center" }}>
                <Typography variant="body1" color="text.secondary">No tours match your filters.</Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>

      {/* Lightbox */}
      <Dialog open={lb.open} onClose={closeLb} fullWidth maxWidth="md" PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pr: 1 }}>
          <Typography variant="subtitle1" fontWeight={700}>{rows[lb.idx]?.title || "Gallery"}</Typography>
          <IconButton onClick={closeLb}><CloseRoundedIcon /></IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ display: "grid", placeItems: "center", bgcolor: "background.default" }}>
          {(() => {
            const imgs = rows[lb.idx]?.images || [];
            const src = imgs[lb.imgIdx];
            if (!imgs.length) return <Typography variant="body2">No images.</Typography>;
            return (
              <Box sx={{ width: "100%", position: "relative" }}>
                <img src={src} alt={`image-${lb.imgIdx}`} style={{ display: "block", width: "100%", height: "auto", maxHeight: "70vh", objectFit: "contain", borderRadius: 8 }} />
                <Stack direction="row" justifyContent="space-between" sx={{ position: "absolute", inset: 0, px: 1, alignItems: "center" }}>
                  <IconButton onClick={prevImg} sx={{ bgcolor: "rgba(0,0,0,.4)", color: "#fff", "&:hover": { bgcolor: "rgba(0,0,0,.6)" } }}>
                    <ChevronLeftRoundedIcon />
                  </IconButton>
                  <IconButton onClick={nextImg} sx={{ bgcolor: "rgba(0,0,0,.4)", color: "#fff", "&:hover": { bgcolor: "rgba(0,0,0,.6)" } }}>
                    <ChevronRightRoundedIcon />
                  </IconButton>
                </Stack>
              </Box>
            );
          })()}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "flex-end" }}>
          <Stack direction="row" gap={1}>
            <Button onClick={prevImg} startIcon={<ChevronLeftRoundedIcon />}>Prev</Button>
            <Button onClick={nextImg} endIcon={<ChevronRightRoundedIcon />}>Next</Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
