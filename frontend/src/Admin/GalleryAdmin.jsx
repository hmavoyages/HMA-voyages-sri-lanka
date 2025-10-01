import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert, Avatar, Box, Button, Card, CardContent, Chip, Container, Dialog, DialogActions,
  DialogContent, DialogTitle, Divider, Grid, IconButton, ImageList, ImageListItem, LinearProgress,
  MenuItem, Paper, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TextField, Tooltip, Typography
} from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded";
import PhotoLibraryRoundedIcon from "@mui/icons-material/PhotoLibraryRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CircularProgress from "@mui/material/CircularProgress";

const API_BASE = "https://hma-voyages-backend.onrender.com"; // same base you used

export default function GalleryAdmin() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");

  // dialogs
  const [editOpen, setEditOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  const [active, setActive] = useState(null);

  // image uploads
  const [galleryFiles, setGalleryFiles] = useState([]);
  const galleryInputRef = useRef(null);

  // NEW: upload status
  const [uploading, setUploading] = useState(false);
  const [uploadPct, setUploadPct] = useState(0);
  const [uploadError, setUploadError] = useState("");

  async function load() {
    setLoading(true);
    setErr("");
    try {
      const p = new URLSearchParams();
      if (q.trim()) p.set("q", q.trim());
      if (category !== "All") p.set("category", category);
      const res = await fetch(`${API_BASE}/gallery?${p.toString()}`);
      const data = await res.json();
      setRows(Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setErr("Failed to load gallery.");
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

  const startCreate = () => {
    setActive({
      galleryId: null,
      title: "",
      tours: "",
      category: "",
      description: "",
      images: [],
      isFeatured: false,
    });
    setGalleryFiles([]);
    setUploadError("");
    setUploadPct(0);
    setUploading(false);
    setEditOpen(true);
  };

  const startEdit = (row) => {
    setActive({ ...row, images: Array.isArray(row.images) ? row.images : [] });
    setGalleryFiles([]);
    setUploadError("");
    setUploadPct(0);
    setUploading(false);
    setEditOpen(true);
  };

  const startDelete = (row) => {
    setActive({ galleryId: row.galleryId, title: row.title });
    setDelOpen(true);
  };

  const onGalleryChange = (e) => {
    const files = Array.from(e.target.files || []);
    setGalleryFiles((prev) => [...prev, ...files]);
    if (galleryInputRef.current) galleryInputRef.current.value = "";
  };

  // NEW: Upload with progress (single request for all files to match your /upload endpoint)
  const uploadImagesWithProgress = async () => {
    if (!galleryFiles.length) return [];
    setUploading(true);
    setUploadPct(0);
    setUploadError("");

    const fd = new FormData();
    galleryFiles.forEach((f) => fd.append("images", f));

    const urls = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${API_BASE}/upload`, true);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const pct = Math.round((e.loaded / e.total) * 100);
          setUploadPct(pct);
        }
      };

      xhr.onload = () => {
        try {
          if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText || "{}");
            resolve(data?.imageUrls || []);
          } else {
            const msg = `Upload failed (HTTP ${xhr.status})`;
            setUploadError(msg);
            reject(new Error(msg));
          }
        } catch (parseErr) {
          const msg = "Upload failed: invalid server response.";
          setUploadError(msg);
          reject(new Error(msg));
        }
      };

      xhr.onerror = () => {
        const msg = "Network error during upload.";
        setUploadError(msg);
        reject(new Error(msg));
      };

      xhr.send(fd);
    });

    setUploading(false);
    setUploadPct(100);
    return urls;
  };

  const save = async () => {
    try {
      setLoading(true);
      let images = active.images || [];

      // upload new files (append to images) — shows progress
      const uploaded = await uploadImagesWithProgress();
      images = [...images, ...uploaded];

      const payload = {
        title: active.title,
        tours: active.tours,
        category: active.category,
        description: active.description,
        images,
        isFeatured: Boolean(active.isFeatured),
      };

      let res;
      if (active.galleryId) {
        res = await fetch(`${API_BASE}/gallery/${active.galleryId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_BASE}/gallery`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.message || `HTTP ${res.status}`);
      }

      setOk(active.galleryId ? "Updated successfully" : "Created successfully");
      setEditOpen(false);
      setGalleryFiles([]);
      setUploadError("");
      setUploadPct(0);
      await load();
    } catch (e) {
      console.error(e);
      setErr(e.message || "Save failed.");
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const confirmDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/gallery/${active.galleryId}`, { method: "DELETE" });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.message || `HTTP ${res.status}`);
      }
      setOk("Deleted successfully");
      setDelOpen(false);
      await load();
    } catch (e) {
      console.error(e);
      setErr(e.message || "Delete failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <br />
        <br />
        <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "flex-start", sm: "center" }} justifyContent="space-between" gap={2} sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight={800}>Manage Tour Galleries</Typography>
          <Stack direction="row" gap={1}>
            <Button startIcon={<RefreshRoundedIcon />} onClick={load} variant="outlined">Refresh</Button>
            <Button startIcon={<AddCircleOutlineRoundedIcon />} onClick={startCreate} variant="contained">New Gallery</Button>
          </Stack>
        </Stack>

        {/* Filters */}
        <Card variant="outlined" sx={{ mb: 2 }}>
          {loading && <LinearProgress />}
          <CardContent>
            <Stack direction={{ xs: "column", md: "row" }} gap={2}>
              <TextField fullWidth placeholder="Search title / description / code / category" value={q} onChange={(e) => setQ(e.target.value)} />
              <TextField
                select
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                sx={{ minWidth: 220 }}
              >
                {["All", ...categories.slice(1)].map((c) => (
                  <MenuItem key={c} value={c}>{c}</MenuItem>
                ))}
              </TextField>
            </Stack>
          </CardContent>
        </Card>

        {/* Table */}
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Code</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Images</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.galleryId}>
                  <TableCell sx={{ maxWidth: 280 }}>
                    <Tooltip title={r.description || ""} arrow placement="top-start">
                      <Typography variant="body2" noWrap>{r.title}</Typography>
                    </Tooltip>
                    <Typography variant="caption" color="text.secondary">{r.galleryId}</Typography>
                  </TableCell>
                  <TableCell>{r.tours || "—"}</TableCell>
                  <TableCell>
                    {r.category ? <Chip label={r.category} size="small" icon={<CategoryRoundedIcon />} /> : "—"}
                  </TableCell>
                  <TableCell>
                    <Chip label={`${Array.isArray(r.images) ? r.images.length : 0}`} size="small" />
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" gap={1} justifyContent="flex-end">
                      <Button size="small" variant="outlined" startIcon={<EditRoundedIcon />} onClick={() => startEdit(r)}>Edit</Button>
                      <Button size="small" color="error" variant="outlined" startIcon={<DeleteOutlineRoundedIcon />} onClick={() => startDelete(r)}>Delete</Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && !loading && (
                <TableRow><TableCell colSpan={5}><Box sx={{ py: 4, textAlign: "center" }}><Typography>No items</Typography></Box></TableCell></TableRow>
              )}
            </TableBody>
          </Table>
          {loading && <LinearProgress />}
        </TableContainer>
      </Container>

      {/* Create/Edit dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{active?.galleryId ? "Edit Gallery" : "New Gallery"}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <TextField label="Title" value={active?.title || ""} onChange={(e) => setActive((a) => ({ ...a, title: e.target.value }))} fullWidth required />
            <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
              <TextField label="Code (e.g., d12)" value={active?.tours || ""} onChange={(e) => setActive((a) => ({ ...a, tours: e.target.value }))} fullWidth />
              <TextField label="Category" value={active?.category || ""} onChange={(e) => setActive((a) => ({ ...a, category: e.target.value }))} fullWidth />
            </Stack>
            <TextField
              label="Description"
              value={active?.description || ""}
              onChange={(e) => setActive((a) => ({ ...a, description: e.target.value }))}
              fullWidth multiline minRows={3}
            />

            {/* Existing images */}
            <Box>
              <Typography variant="subtitle2" component="div" sx={{ mb: 1 }}>Images</Typography>
              {Array.isArray(active?.images) && active.images.length > 0 ? (
                <ImageList cols={6} rowHeight={100} gap={6}>
                  {active.images.map((src, i) => (
                    <ImageListItem key={`${src}-${i}`}>
                      <img src={src} alt={`img-${i}`} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <IconButton
                        size="small"
                        onClick={() =>
                          setActive((a) => ({ ...a, images: a.images.filter((_, idx) => idx !== i) }))
                        }
                        sx={{
                          position: "absolute", top: 2, right: 2, bgcolor: "rgba(0,0,0,.5)", color: "#fff",
                          "&:hover": { bgcolor: "rgba(0,0,0,.7)" }
                        }}
                        title="Remove"
                      >
                        <CloseRoundedIcon fontSize="small" />
                      </IconButton>
                    </ImageListItem>
                  ))}
                </ImageList>
              ) : (
                <Typography variant="body2" color="text.secondary">No images yet.</Typography>
              )}
            </Box>

            {/* Upload new images */}
            <Stack direction="row" alignItems="center" gap={1} flexWrap="wrap">
              <Button component="label" variant="outlined" startIcon={<PhotoCameraRoundedIcon />}>
                Add Images
                <input ref={galleryInputRef} type="file" accept="image/*" hidden multiple onChange={onGalleryChange} />
              </Button>
              {galleryFiles.length > 0 && (
                <Typography variant="caption" color="text.secondary">
                  {galleryFiles.length} file(s) ready to upload
                </Typography>
              )}
            </Stack>

            {/* NEW: Upload progress UI */}
            {uploading && (
              <Box sx={{ mt: 1 }}>
                <Stack direction="row" alignItems="center" gap={2}>
                  <Box sx={{ flex: 1 }}>
                    <LinearProgress variant="determinate" value={uploadPct} />
                  </Box>
                  <Typography variant="caption" sx={{ minWidth: 40, textAlign: "right" }}>
                    {uploadPct}%
                  </Typography>
                </Stack>
                {galleryFiles.length > 0 && (
                  <Stack sx={{ mt: 1 }} spacing={0.5}>
                    {galleryFiles.map((f, i) => (
                      <Typography key={i} variant="caption" color="text.secondary">
                        {f.name} ({Math.round(f.size / 1024)} KB)
                      </Typography>
                    ))}
                  </Stack>
                )}
              </Box>
            )}
            {!!uploadError && (
              <Alert severity="error" onClose={() => setUploadError("")}>{uploadError}</Alert>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)} disabled={uploading || loading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={save}
            disabled={uploading || loading}
            startIcon={uploading || loading ? <CircularProgress size={18} color="inherit" /> : null}
          >
            {uploading ? "Uploading…" : loading ? "Saving…" : "Save"}
          </Button>
        </DialogActions>

      </Dialog>

      {/* Delete dialog */}
      <Dialog open={delOpen} onClose={() => setDelOpen(false)}>
        <DialogTitle>Delete Gallery</DialogTitle>
        <DialogContent dividers>
          <Typography>Delete <strong>{active?.title}</strong>?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDelOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={confirmDelete}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Alerts */}
      <Snackbar open={!!err} autoHideDuration={4000} onClose={() => setErr("")}>
        <Alert severity="error" variant="filled" onClose={() => setErr("")}>{err}</Alert>
      </Snackbar>
      <Snackbar open={!!ok} autoHideDuration={2500} onClose={() => setOk("")}>
        <Alert severity="success" variant="filled" onClose={() => setOk("")}>{ok}</Alert>
      </Snackbar>
    </Box>
  );
}
