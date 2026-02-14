import React, { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  LinearProgress,
  MenuItem,
  Pagination,
  Paper,
  Rating,
  Select,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

const API_BASE = "https://backend.hmavoyages.com"; // same base you used

const pageSizeOptions = [6, 12, 20];

export default function ReviewsAdmin() {
  // list state
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");
  // server pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [total, setTotal] = useState(0);

  // filters
  const [q, setQ] = useState("");
  const [featured, setFeatured] = useState("all"); // all | true | false
  const [minRating, setMinRating] = useState("");
  const [maxRating, setMaxRating] = useState("");
  const [sort, setSort] = useState("-createdAt"); // controller supports this

  // edit dialog
  const [editOpen, setEditOpen] = useState(false);
  const [active, setActive] = useState(null);

  // delete dialog
  const [delOpen, setDelOpen] = useState(false);

  const pages = useMemo(() => (total && limit ? Math.ceil(total / limit) : 1), [total, limit]);

  async function load() {
    setLoading(true);
    setErr("");
    try {
      const p = new URLSearchParams();
      p.set("page", String(page));
      p.set("limit", String(limit));
      if (q.trim()) p.set("q", q.trim());
      if (featured !== "all") p.set("featured", String(featured === "true"));
      if (minRating) p.set("minRating", String(minRating));
      if (maxRating) p.set("maxRating", String(maxRating));
      if (sort) p.set("sort", sort);

      const res = await fetch(`${API_BASE}/testimonials?${p.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      const items = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
      setRows(items);
      setTotal(Number(data?.pagination?.total || items.length || 0));
    } catch (e) {
      console.error(e);
      setErr("Failed to fetch testimonials.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, featured, minRating, maxRating, sort]);

  // search debounce
  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      load();
    }, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const resetFilters = () => {
    setQ("");
    setFeatured("all");
    setMinRating("");
    setMaxRating("");
    setSort("-createdAt");
    setPage(1);
  };

  const onEdit = (row) => {
    setActive({
      testimonialId: row.testimonialId,
      text: row.text || "",
      name: row.name || "",
      location: row.location || "",
      trip: row.trip || "",
      rating: Number(row.rating) || 5,
      isFeatured: Boolean(row.isFeatured),
      photo: row.photo || "",
      images: Array.isArray(row.images) ? row.images : [],
    });
    setEditOpen(true);
  };

  const onDelete = (row) => {
    setActive({ testimonialId: row.testimonialId, name: row.name });
    setDelOpen(true);
  };

  const saveEdit = async () => {
    if (!active?.testimonialId) return;
    try {
      setLoading(true);
      const payload = {
        text: active.text,
        name: active.name,
        location: active.location,
        trip: active.trip,
        rating: active.rating,
        isFeatured: active.isFeatured,
        // keep images/photo editing out for simplicity; but wired:
        photo: active.photo,
        images: active.images,
      };
      const res = await fetch(`${API_BASE}/testimonials/${active.testimonialId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.message || `HTTP ${res.status}`);
      }
      setEditOpen(false);
      setOk("Testimonial updated.");
      await load();
    } catch (e) {
      console.error(e);
      setErr(e.message || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!active?.testimonialId) return;
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/testimonials/${active.testimonialId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.message || `HTTP ${res.status}`);
      }
      setDelOpen(false);
      setOk("Testimonial deleted.");
      // if last item on page deleted, bounce back a page if needed
      if (rows.length === 1 && page > 1) setPage((p) => p - 1);
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
        <br /><Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
          gap={2}
          sx={{ mb: 3 }}
        >
          <Typography variant="h4" fontWeight={800}>
            Manage Reviews
          </Typography>
          <Stack direction="row" gap={1} alignItems="center">
            <Button startIcon={<RefreshRoundedIcon />} onClick={load} variant="outlined">
              Refresh
            </Button>
            <Button startIcon={<AddCircleOutlineRoundedIcon />} variant="contained" onClick={() => setOk("Use the public form to add new reviews.")}>
              Add New
            </Button>
          </Stack>
        </Stack>

        {/* Filters */}
        <Card variant="outlined" sx={{ mb: 2 }}>
          {loading && <LinearProgress />}
          <CardContent>
            <Stack direction={{ xs: "column", md: "row" }} gap={2}>
              <TextField
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search text / name / trip"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRoundedIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <FormControl sx={{ minWidth: 160 }}>
                <InputLabel id="featured-label">Featured</InputLabel>
                <Select
                  labelId="featured-label"
                  label="Featured"
                  value={featured}
                  onChange={(e) => { setFeatured(e.target.value); setPage(1); }}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="true">Featured</MenuItem>
                  <MenuItem value="false">Not featured</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Min rating"
                type="number"
                inputProps={{ step: 0.5, min: 1, max: 5 }}
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
                sx={{ minWidth: 120 }}
              />
              <TextField
                label="Max rating"
                type="number"
                inputProps={{ step: 0.5, min: 1, max: 5 }}
                value={maxRating}
                onChange={(e) => setMaxRating(e.target.value)}
                sx={{ minWidth: 120 }}
              />

              <FormControl sx={{ minWidth: 180 }}>
                <InputLabel id="sort-label">Sort by</InputLabel>
                <Select
                  labelId="sort-label"
                  label="Sort by"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <MenuItem value="-createdAt">Newest</MenuItem>
                  <MenuItem value="createdAt">Oldest</MenuItem>
                  <MenuItem value="-rating">Rating high → low</MenuItem>
                  <MenuItem value="rating">Rating low → high</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 140 }}>
                <InputLabel id="limit-label">Per page</InputLabel>
                <Select
                  labelId="limit-label"
                  label="Per page"
                  value={limit}
                  onChange={(e) => { setLimit(e.target.value); setPage(1); }}
                >
                  {pageSizeOptions.map((n) => (
                    <MenuItem key={n} value={n}>{n}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button onClick={resetFilters}>Reset</Button>
            </Stack>
          </CardContent>
        </Card>

        {/* Table */}
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Traveler</TableCell>
                <TableCell>Trip</TableCell>
                <TableCell>Review</TableCell>
                <TableCell align="center">Rating</TableCell>
                <TableCell align="center">Featured</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.testimonialId}>
                  <TableCell>
                    <Stack direction="row" gap={1.25} alignItems="center">
                      <Avatar src={r.photo || ""} alt={r.name} />
                      <Box>
                        <Typography variant="subtitle2">{r.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{r.location}</Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {r.trip ? (
                      <Chip label={r.trip} size="small" sx={{ fontWeight: 600 }} />
                    ) : (
                      <Typography variant="caption" color="text.secondary">—</Typography>
                    )}
                  </TableCell>
                  <TableCell sx={{ maxWidth: 420 }}>
                    <Tooltip title={r.text || ""} placement="top-start" arrow>
                      <Typography variant="body2" noWrap>
                        {r.text}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    <Stack alignItems="center">
                      <Rating value={Number(r.rating) || 0} precision={0.5} readOnly size="small" />
                      <Typography variant="caption" color="text.secondary">
                        {(Number(r.rating) || 0).toFixed(1)}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    {r.isFeatured ? (
                      <Chip label="Featured" size="small" color="success" variant="outlined" />
                    ) : (
                      <Chip label="—" size="small" variant="outlined" />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" justifyContent="flex-end" gap={1}>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<EditRoundedIcon />}
                        onClick={() => onEdit(r)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        variant="outlined"
                        startIcon={<DeleteOutlineRoundedIcon />}
                        onClick={() => onDelete(r)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}

              {rows.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Box sx={{ py: 4, textAlign: "center" }}>
                      <Typography variant="body2" color="text.secondary">
                        No results found.
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {loading && <LinearProgress />}
        </TableContainer>

        {/* Pagination */}
        <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
          <Pagination
            count={pages}
            color="primary"
            page={page}
            onChange={(_, v) => setPage(v)}
            siblingCount={0}
          />
        </Stack>
      </Container>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Testimonial</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={1.5} sx={{ mt: 1 }}>
            <TextField
              label="Name"
              value={active?.name || ""}
              onChange={(e) => setActive((a) => ({ ...a, name: e.target.value }))}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonRoundedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Location"
              value={active?.location || ""}
              onChange={(e) => setActive((a) => ({ ...a, location: e.target.value }))}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PublicRoundedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Trip"
              value={active?.trip || ""}
              onChange={(e) => setActive((a) => ({ ...a, trip: e.target.value }))}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MapRoundedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Review (max 600)"
              value={active?.text || ""}
              onChange={(e) =>
                setActive((a) => ({ ...a, text: e.target.value.slice(0, 600) }))
              }
              fullWidth
              multiline
              minRows={3}
              inputProps={{ maxLength: 600 }}
              helperText={`${(active?.text || "").length}/600`}
            />

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 0.5, display: "flex", alignItems: "center", gap: 0.5 }}>
                <StarRoundedIcon fontSize="small" />
                Rating
              </Typography>
              <Rating
                value={Number(active?.rating) || 0}
                precision={0.5}
                onChange={(_, val) => setActive((a) => ({ ...a, rating: val ?? a.rating }))}
              />
            </Box>

            <FormControlLabel
              control={
                <Switch
                  checked={Boolean(active?.isFeatured)}
                  onChange={(e) => setActive((a) => ({ ...a, isFeatured: e.target.checked }))}
                />
              }
              label="Featured"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={saveEdit}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={delOpen} onClose={() => setDelOpen(false)}>
        <DialogTitle>Delete Testimonial</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2">
            Are you sure you want to delete{" "}
            <strong>{active?.name || active?.testimonialId}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDelOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Alerts */}
      <Snackbar open={!!err} autoHideDuration={4000} onClose={() => setErr("")}>
        <Alert severity="error" onClose={() => setErr("")} variant="filled">
          {err}
        </Alert>
      </Snackbar>
      <Snackbar open={!!ok} autoHideDuration={2500} onClose={() => setOk("")}>
        <Alert severity="success" onClose={() => setOk("")} variant="filled">
          {ok}
        </Alert>
      </Snackbar>
    </Box>
  );
}
