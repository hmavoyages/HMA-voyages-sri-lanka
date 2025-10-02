import React, { useEffect, useState } from "react";
import {
  Alert, Box, Button, Card, CardContent, Container, Dialog, DialogActions, DialogContent,
  DialogTitle, Grid, IconButton, LinearProgress, MenuItem, Paper, Snackbar, Stack, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography
} from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const API_BASE = "https://hmavoyages.com";

export default function TourPackagesAdmin() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  const [q, setQ] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  const [active, setActive] = useState(null);

  async function load() {
    setLoading(true);
    setErr("");
    try {
      const p = new URLSearchParams();
      if (q.trim()) p.set("q", q.trim());
      const res = await fetch(`${API_BASE}/packages?${p.toString()}`);
      const data = await res.json();
      setRows(Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setErr("Failed to load tour packages.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);
  useEffect(() => {
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line
  }, [q]);

  const startCreate = () => {
    setActive({
      tourId: null,
      cover: "",
      packageName: "",
      description: "",
      dayCount: 1,
      days: [
        { day: 1, title: "", stay: "", plan: [], route: "" },
      ],
    });
    setEditOpen(true);
  };

  const startEdit = (row) => {
    setActive({
      tourId: row.tourId,
      cover: row.cover || "",
      packageName: row.packageName || "",
      description: row.description || "",
      dayCount: Number(row.dayCount) || 1,
      days: Array.isArray(row.days) ? row.days : [],
    });
    setEditOpen(true);
  };

  const startDelete = (row) => {
    setActive({ tourId: row.tourId, packageName: row.packageName });
    setDelOpen(true);
  };

  const save = async () => {
    try {
      setLoading(true);
      const payload = {
        packageName: active.packageName,
        cover: active.cover,
        description: active.description,
        dayCount: Number(active.dayCount) || 1,
        days: (active.days || []).map((d, i) => ({
          day: Number(d.day) || i + 1,
          title: d.title || "",
          stay: d.stay || "",
          plan: Array.isArray(d.plan) ? d.plan : [],
          route: d.route || "",
        })),
      };

      let res;
      if (active.tourId) {
        res = await fetch(`${API_BASE}/packages/${active.tourId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_BASE}/packages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body?.message || `HTTP ${res.status}`);

      setOk(active.tourId ? "Updated successfully" : "Created successfully");
      setEditOpen(false);
      await load();
    } catch (e) {
      console.error(e);
      setErr(e.message || "Save failed.");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/packages/${active.tourId}`, { method: "DELETE" });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body?.message || `HTTP ${res.status}`);

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

  // --- Day/Plan editors ---
  const addDay = () => {
    setActive((a) => ({
      ...a,
      dayCount: (Number(a.dayCount) || 0) + 1,
      days: [...(a.days || []), { day: (a.days?.length || 0) + 1, title: "", stay: "", plan: [], route: "" }],
    }));
  };

  const removeDay = (idx) => {
    setActive((a) => {
      const copy = [...a.days];
      copy.splice(idx, 1);
      // re-number days
      const renum = copy.map((d, i) => ({ ...d, day: i + 1 }));
      return { ...a, days: renum, dayCount: renum.length };
    });
  };

  const setDayField = (idx, key, val) => {
    setActive((a) => {
      const copy = [...a.days];
      copy[idx] = { ...copy[idx], [key]: val };
      return { ...a, days: copy };
    });
  };

  const addPlanItem = (idx) => {
    setActive((a) => {
      const copy = [...a.days];
      const plan = Array.isArray(copy[idx].plan) ? copy[idx].plan : [];
      plan.push("");
      copy[idx] = { ...copy[idx], plan };
      return { ...a, days: copy };
    });
  };

  const setPlanItem = (idx, pIdx, val) => {
    setActive((a) => {
      const copy = [...a.days];
      const plan = [...(copy[idx].plan || [])];
      plan[pIdx] = val;
      copy[idx] = { ...copy[idx], plan };
      return { ...a, days: copy };
    });
  };

  const removePlanItem = (idx, pIdx) => {
    setActive((a) => {
      const copy = [...a.days];
      const plan = [...(copy[idx].plan || [])];
      plan.splice(pIdx, 1);
      copy[idx] = { ...copy[idx], plan };
      return { ...a, days: copy };
    });
  };

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
      <br />
      <br />
      <Container maxWidth="lg">
        <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "flex-start", sm: "center" }} justifyContent="space-between" gap={2} sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight={800}>Manage Tour Packages</Typography>
          <Stack direction="row" gap={1}>
            <Button startIcon={<RefreshRoundedIcon />} onClick={load} variant="outlined">Refresh</Button>
            <Button startIcon={<AddCircleOutlineRoundedIcon />} onClick={startCreate} variant="contained">New Package</Button>
          </Stack>
        </Stack>

        {/* Search */}
        <Card variant="outlined" sx={{ mb: 2 }}>
          {loading && <LinearProgress />}
          <CardContent>
            <TextField fullWidth placeholder="Search name/description/day title…" value={q} onChange={(e) => setQ(e.target.value)} />
          </CardContent>
        </Card>

        {/* Table */}
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Cover</TableCell>
                <TableCell>Package Name</TableCell>

                <TableCell>Days</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.tourId}>
                  <TableCell><Typography variant="body2">{r.tourId}</Typography></TableCell>
                  <TableCell><Box
                    component="img"
                    src={
                      r.cover ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfmOngfjEFXuomRBrD-WyA5OKTar7MXAuyEw&s"
                    }
                    alt={r.title}
                    loading="lazy"
                    decoding="async"
                    sx={{
                      width: "100%",
                      display: "block",
                      objectFit: "cover",
                      objectPosition: "center",
                      aspectRatio: { xs: "16 / 9", sm: "16 / 9", md: "4 / 2" },
                    }}
                  /></TableCell>
                  <TableCell sx={{ maxWidth: 280 }}>
                    <Typography variant="body2" noWrap title={r.packageName}>{r.packageName}</Typography>
                  </TableCell>
                  <TableCell>{r.dayCount}</TableCell>
                  <TableCell sx={{ maxWidth: 380 }}>
                    <Typography variant="body2" noWrap title={r.description}>{r.description}</Typography>
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
                <TableRow>
                  <TableCell colSpan={5}>
                    <Box sx={{ py: 4, textAlign: "center" }}>
                      <Typography>No items</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {loading && <LinearProgress />}
        </TableContainer>
      </Container>

      {/* Create/Edit dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{active?.tourId ? "Edit Package" : "New Package"}</DialogTitle>
        <DialogContent dividers>
          {active && (
            <Stack spacing={2}>
              <TextField
                label="Package Name"
                value={active.packageName}
                onChange={(e) => setActive((a) => ({ ...a, packageName: e.target.value }))}
                fullWidth
                required
              /><TextField
                label="Package Name"
                value={active.cover}
                onChange={(e) => setActive((a) => ({ ...a, cover: e.target.value }))}
                fullWidth
                required
              />
              <Box
                component="img"
                src={
                  active.cover ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfmOngfjEFXuomRBrD-WyA5OKTar7MXAuyEw&s"
                }
                alt={active.title}
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

              <TextField
                label="Description"
                value={active.description}
                onChange={(e) => setActive((a) => ({ ...a, description: e.target.value }))}
                fullWidth multiline minRows={3}
                required
              />
              <TextField
                label="Day Count"
                type="number"
                value={active.dayCount}
                onChange={(e) => setActive((a) => ({ ...a, dayCount: Number(e.target.value) }))}
                sx={{ maxWidth: 200 }}
                inputProps={{ min: 1 }}
                required
              />

              {/* Days editor */}
              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle1" fontWeight={700}>Itinerary (Days)</Typography>
                  <Button startIcon={<AddRoundedIcon />} onClick={addDay}>Add Day</Button>
                </Stack>

                {(active.days || []).map((d, idx) => (
                  <Paper key={idx} variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Stack direction={{ xs: "column", md: "row" }} gap={2}>
                      <TextField
                        label="Day #"
                        type="number"
                        value={d.day}
                        onChange={(e) => setDayField(idx, "day", Number(e.target.value))}
                        sx={{ maxWidth: 160 }}
                        inputProps={{ min: 1 }}
                      />
                      <TextField
                        label="Title"
                        value={d.title}
                        onChange={(e) => setDayField(idx, "title", e.target.value)}
                        fullWidth
                      />
                      <TextField
                        label="Stay"
                        value={d.stay}
                        onChange={(e) => setDayField(idx, "stay", e.target.value)}
                        sx={{ minWidth: 220 }}
                      />
                      <TextField
                        label="Route"
                        value={d.route}
                        onChange={(e) => setDayField(idx, "route", e.target.value)}
                        fullWidth
                      />
                      <IconButton onClick={() => removeDay(idx)} title="Remove day" sx={{ alignSelf: "flex-start" }}>
                        <CloseRoundedIcon />
                      </IconButton>
                    </Stack>

                    {/* Plan items */}
                    <Box sx={{ mt: 1.5 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle2">Plan items</Typography>
                        <Button size="small" onClick={() => addPlanItem(idx)} startIcon={<AddRoundedIcon />}>
                          Add item
                        </Button>
                      </Stack>

                      <Grid container gap={1} sx={{ mt: 1 }}>
                        {(d.plan || []).map((p, pIdx) => (
                          <Grid key={pIdx} size={{ xs: 12 }}>
                            <Stack direction="row" gap={1}>
                              <TextField
                                fullWidth
                                placeholder={`Plan #${pIdx + 1}`}
                                value={p}
                                onChange={(e) => setPlanItem(idx, pIdx, e.target.value)}
                              />
                              <IconButton onClick={() => removePlanItem(idx, pIdx)} title="Remove item">
                                <CloseRoundedIcon />
                              </IconButton>
                            </Stack>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Paper>
                ))}
              </Stack>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={save}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete dialog */}
      <Dialog open={delOpen} onClose={() => setDelOpen(false)}>
        <DialogTitle>Delete Tour Package</DialogTitle>
        <DialogContent dividers>
          <Typography>Delete <strong>{active?.packageName}</strong>?</Typography>
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
