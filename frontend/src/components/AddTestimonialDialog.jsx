import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  InputAdornment,
  LinearProgress,
  Rating,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
  Paper,
} from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useTheme } from "@mui/material/styles";
import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";

const API_BASE = "https://tv3vzvbn-5000.asse.devtunnels.ms";

// Decode Google ID token safely (JS version – no types)
function decodeIdToken(credential) {
  try {
    const payload = jwtDecode(credential);
    return {
      name: payload?.name || "",
      email: payload?.email || "",
      picture: payload?.picture || "",
    };
  } catch {
    return {};
  }
}

const MAX_TEXT = 600;
const MAX_IMAGES = 8;
const MAX_IMAGE_MB = 8;

const AddTestimonialDialog = ({ open, onClose, onCreated }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [form, setForm] = useState({
    text: "",
    name: "",
    location: "",
    trip: "",
    rating: 5,
    photo: "", // server URL
    images: [], // server URLs
    isFeatured: false,
  });

  // Google user info (read-only once logged in)
  const [googleUser, setGoogleUser] = useState(null);

  // File inputs
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const galleryInputRef = useRef(null);

  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  // Countries list (unchanged)
  const countries = useMemo(
    () => [
      "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia",
      "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus",
      "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil",
      "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada",
      "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)",
      "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Democratic Republic of the Congo",
      "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador",
      "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France",
      "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea",
      "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran",
      "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan",
      "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia",
      "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives",
      "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova",
      "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru",
      "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia",
      "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru",
      "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
      "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
      "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
      "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka",
      "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand",
      "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
      "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
      "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe",
    ],
    []
  );

  const handleGoogleSuccess = (cred) => {
    const user = decodeIdToken(cred?.credential);
    if (user?.name) {
      setGoogleUser(user);
      setForm((f) => ({
        ...f,
        name: user.name || f.name,
        photo: user.picture || f.photo, // used if no avatar uploaded
      }));
      if (!avatarFile && user?.picture) setAvatarPreview(user.picture);
    }
  };

  const handleGoogleError = () => {
    setErr("Google sign-in failed. Please try again.");
  };

  // File handlers + previews
  const onAvatarChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      setErr(`Profile photo is too large. Max ${MAX_IMAGE_MB}MB.`);
      return;
    }
    setAvatarFile(file);
  };

  const onGalleryChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const validated = [];
    for (const f of files) {
      if (f.size > MAX_IMAGE_MB * 1024 * 1024) {
        setErr(`"${f.name}" is too large. Max ${MAX_IMAGE_MB}MB.`);
        continue;
      }
      validated.push(f);
    }

    setGalleryFiles((prev) => {
      const next = [...prev, ...validated].slice(0, MAX_IMAGES);
      if (next.length < prev.length + validated.length) {
        setErr(`You can add up to ${MAX_IMAGES} images.`);
      }
      return next;
    });

    if (galleryInputRef.current) galleryInputRef.current.value = "";
  };

  const removeGalleryFile = (idx) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  // Build previews + revoke on cleanup
  useEffect(() => {
    if (avatarFile) {
      const url = URL.createObjectURL(avatarFile);
      setAvatarPreview(url);
      return () => URL.revokeObjectURL(url);
    } else if (!googleUser?.picture) {
      setAvatarPreview("");
    }
  }, [avatarFile, googleUser?.picture]);

  useEffect(() => {
    const urls = galleryFiles.map((f) => URL.createObjectURL(f));
    setGalleryPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [galleryFiles]);

  // Upload files: avatar (optional) + gallery (optional)
  async function uploadFiles() {
    const result = { avatarUrl: form.photo || "", imageUrls: [] };
    const fd = new FormData();
    if (avatarFile) fd.append("avatar", avatarFile);
    galleryFiles.forEach((f) => fd.append("images", f));

    if (fd.has("avatar") || galleryFiles.length) {
      const res = await fetch(`${API_BASE}/upload`, { method: "POST", body: fd });
      if (!res.ok) throw new Error(`Upload failed (HTTP ${res.status})`);
      const data = await res.json();
      result.avatarUrl = data?.avatarUrl || result.avatarUrl;
      result.imageUrls = data?.imageUrls || [];
    }
    return result;
  }

  const submit = async () => {
    setErr("");

    // basic validation
    if (!form.text.trim() || !form.name.trim() || !form.trip.trim()) {
      setErr("Please fill the required fields: Review, Name, and Trip.");
      return;
    }

    setSubmitting(true);
    try {
      const { avatarUrl, imageUrls } = await uploadFiles();

      const payload = {
        ...form,
        photo: avatarUrl,
        images: imageUrls,
        email: googleUser?.email || undefined,
        authProvider: googleUser ? "google" : undefined,
      };

      const res = await fetch(`${API_BASE}/testimonials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const created = data?.testimonial || data;

      onCreated?.(created);
      onClose();

      // reset
      setForm({
        text: "",
        name: "",
        location: "",
        trip: "",
        rating: 5,
        photo: "",
        images: [],
        isFeatured: false,
      });
      setAvatarFile(null);
      setGalleryFiles([]);
      setGoogleUser(null);
      setAvatarPreview("");
      setGalleryPreviews([]);
    } catch (e) {
      console.error(e);
      setErr("Failed to create testimonial.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 2,
          bgcolor: "background.paper",
          py: 1.5,
          px: 2,
          display: "flex",
          alignItems: "center",
          gap: 1,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <StarRoundedIcon fontSize="small" />
        Share Your Thoughts With Us!
      </DialogTitle>

      {submitting && <LinearProgress />}

      <DialogContent dividers sx={{ p: { xs: 1.5, sm: 2 } }}>
        <Stack spacing={2}>
          {err && (
            <Paper
              variant="outlined"
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1,
                p: 1,
                borderColor: "error.light",
                bgcolor: (t) =>
                  t.palette.mode === "dark" ? "rgba(244,67,54,0.12)" : "rgba(244,67,54,0.06)",
              }}
            >
              <ErrorOutlineRoundedIcon color="error" sx={{ mt: "2px" }} />
              <Typography variant="body2" color="error">
                {err}
              </Typography>
            </Paper>
          )}

          {/* Profile */}
          <Paper variant="outlined" sx={{ p: 1.25, borderRadius: 2 }}>
            <Stack flex={1} minWidth={0}>
              <Typography variant="subtitle2" noWrap>
                {googleUser ? `Signed in as ${googleUser.name}` : "Sign in to auto-fill your details"}
              </Typography>
              {googleUser?.email && (
                <Typography variant="caption" color="text.secondary" noWrap>
                  {googleUser.email}
                </Typography>
              )}
            </Stack>
            <Stack direction="row" spacing={1.25} alignItems="center">
              <Avatar
                src={avatarPreview || googleUser?.picture || undefined}
                alt={googleUser?.name || form.name || "Profile"}
                sx={{ width: 48, height: 48 }}
              />
              {!googleUser ? (
                <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
              ) : (
                <Chip label="Google linked" color="success" size="small" variant="outlined" />
              )}
            </Stack>
          </Paper>

          {/* Review */}
          {googleUser && (
            <Paper variant="outlined" sx={{ p: 1.25, borderRadius: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Your Review
              </Typography>
              <TextField
                label="Write here"
                value={form.text}
                onChange={(e) => {
                  const v = e.target.value.slice(0, MAX_TEXT);
                  setForm((f) => ({ ...f, text: v }));
                }}
                multiline
                minRows={isMobile ? 4 : 3}
                required
                fullWidth
                inputProps={{ maxLength: MAX_TEXT }}
                helperText={`${form.text.length}/${MAX_TEXT}`}
              />
            </Paper>
          )}


          {/* Details */}
          {googleUser && (
            <Paper variant="outlined" sx={{ p: 1.25, borderRadius: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Traveller Details
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
                {!googleUser && (
                  <TextField
                    label="Your Name"
                    value={form.name}
                    onChange={onChange("name")}
                    required
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonRoundedIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
                <TextField
                  label="Where Are You From?"
                  value={form.location}
                  onChange={onChange("location")}
                  select
                  fullWidth
                  SelectProps={{ native: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PublicRoundedIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                >
                  <option value=""></option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </TextField>
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25} sx={{ mt: 1.25 }}>
                <TextField
                  label="Where Did You Go?"
                  value={form.trip}
                  onChange={onChange("trip")}
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MapRoundedIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Avatar upload */}
                {!googleUser && (
                  <Box sx={{ width: "100%" }}>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Profile Photo
                    </Typography>

                    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                      {/* If user uploaded a file, show preview + chip */}
                      {avatarFile ? (
                        <>
                          <Chip
                            label={avatarFile.name}
                            onDelete={() => setAvatarFile(null)}
                            variant="outlined"
                            size="small"
                          />
                        </>
                      ) : googleUser?.picture ? (
                        // If Google account is connected → show their Google profile photo
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Avatar
                            src={googleUser.picture}
                            alt={googleUser.name}
                            sx={{ width: 40, height: 40 }}
                          />
                          <Chip label="Using Google photo" variant="outlined" size="small" />
                        </Stack>
                      ) : (
                        // Fallback → allow manual upload if no Google photo
                        <Button
                          component="label"
                          variant="outlined"
                          size="small"
                          startIcon={<PhotoCameraRoundedIcon />}
                        >
                          Upload Photo
                          <input type="file" accept="image/*" hidden onChange={onAvatarChange} />
                        </Button>
                      )}
                    </Stack>
                  </Box>
                )}

              </Stack>

              {/* Rating */}
              <Box sx={{ mt: 1.25 }}>
                <Typography variant="subtitle2" sx={{ mb: 0.5, display: "flex", alignItems: "center", gap: 0.5 }}>
                  <StarRoundedIcon fontSize="small" />
                  Rating
                </Typography>
                <Rating
                  precision={0.5}
                  value={Number(form.rating) || 0}
                  onChange={(_, val) => setForm((f) => ({ ...f, rating: val ?? f.rating }))}
                />
              </Box>
            </Paper>
          )}

          {/* Gallery */}
          {googleUser && (
            <Paper variant="outlined" sx={{ p: 1.25, borderRadius: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, display: "flex", alignItems: "center", gap: 0.5 }}>
                <ImageRoundedIcon fontSize="small" />
                Trip Photos (optional)
              </Typography>

              <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                <Button component="label" variant="outlined" size="small" startIcon={<ImageRoundedIcon />}>
                  Add Images
                  <input
                    ref={galleryInputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    multiple
                    onChange={onGalleryChange}
                  />
                </Button>
                <Typography variant="caption" color="text.secondary">
                  Up to {MAX_IMAGES} images • Max {MAX_IMAGE_MB}MB each
                </Typography>
              </Stack>

              {!!galleryPreviews.length && (
                <>
                  <Divider sx={{ my: 1 }} />
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 0.75,
                      "@media (min-width:600px)": { gridTemplateColumns: "repeat(4, 1fr)" },
                    }}
                  >
                    {galleryPreviews.map((src, i) => (
                      <Box
                        key={src}
                        sx={{
                          position: "relative",
                          borderRadius: 1.5,
                          overflow: "hidden",
                          border: "1px solid",
                          borderColor: "divider",
                          aspectRatio: "1 / 1",
                        }}
                      >
                        <img
                          src={src}
                          alt={`preview-${i}`}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                        <Button
                          size="small"
                          onClick={() => removeGalleryFile(i)}
                          sx={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            minWidth: 0,
                            px: 1,
                            py: 0.25,
                            borderRadius: 10,
                            bgcolor: "background.paper",
                            border: "1px solid",
                            borderColor: "divider",
                            "&:hover": { bgcolor: "background.paper" },
                          }}
                        >
                          Remove
                        </Button>
                      </Box>
                    ))}
                  </Box>
                </>
              )}
            </Paper>
          )}          
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          px: 2,
          py: 1.5,
          gap: 1,
          flexDirection: { xs: "column", sm: "row" },
          "& > .MuiButton-root": { width: { xs: "100%", sm: "auto" } },
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Button onClick={onClose} disabled={submitting} variant="outlined">
          Cancel
        </Button>
        <Button onClick={submit} variant="contained" disabled={submitting}>
          {submitting ? "Saving…" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTestimonialDialog;
