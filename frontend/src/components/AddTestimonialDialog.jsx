import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Rating,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

const API_BASE = "https://tv3vzvbn-5000.asse.devtunnels.ms";

const AddTestimonialDialog = ({ open, onClose, onCreated }) => {
  const [form, setForm] = useState({
    text: "",
    name: "",
    location: "",
    trip: "",
    rating: 5,
    photo: "",
    images: [],
    isFeatured: false,
  });
  const [imageInput, setImageInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const addImage = () => {
    const v = imageInput.trim();
    if (!v) return;
    setForm((f) => ({ ...f, images: [...f.images, v] }));
    setImageInput("");
  };

  const removeImage = (idx) => {
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));
  };

  const submit = async () => {
    setErr("");
    // simple validation
    if (!form.text || !form.name || !form.trip) {
      setErr("Text, Name and Trip are required.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/testimonials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      // controller returns { message, testimonial }
      const created = data?.testimonial || data;
      onCreated?.(created);
      onClose();
      // reset form (optional)
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
    } catch (e) {
      setErr("Failed to create testimonial.");
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  // List of countries (shortened for brevity, add more as needed)
  // List of all countries in alphabetical order
  const countries = [
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
    "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Share Your Thoughts With Us!</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {err && (
            <Typography variant="body2" color="error">
              {err}
            </Typography>
          )}
          <TextField
            label="Write Here!"
            value={form.text}
            onChange={onChange("text")}
            multiline
            minRows={3}
            required
            fullWidth
          />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Your Name"
              value={form.name}
              onChange={onChange("name")}
              required
              fullWidth
            />
            <TextField
              label="Where Are You From?"
              value={form.location}
              onChange={onChange("location")}
              select
              fullWidth
              SelectProps={{ native: true }}
            >
              <option value=""></option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </TextField>
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Where Did You Go?"
              value={form.trip}
              onChange={onChange("trip")}
              required
              fullWidth
            />
            <TextField
              label="Photo URL (avatar)"
              value={form.photo}
              onChange={onChange("photo")}
              fullWidth
            />
          </Stack>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
              Rating
            </Typography>
            <Rating
              precision={0.5}
              value={Number(form.rating) || 0}
              onChange={(_, val) =>
                setForm((f) => ({ ...f, rating: val ?? f.rating }))
              }
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
              Image URLs (optional, shown as mosaic)
            </Typography>
            <Stack direction="row" spacing={1}>
              <TextField
                placeholder="https://example.com/image.jpg"
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                fullWidth
              />
              <Button onClick={addImage} variant="outlined">
                Add
              </Button>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
              {form.images.map((url, i) => (
                <Chip key={i} label={url} onDelete={() => removeImage(i)} />
              ))}
            </Stack>
          </Box>

          <FormControlLabel
            control={
              <Switch
                checked={form.isFeatured}
                onChange={(e) =>
                  setForm((f) => ({ ...f, isFeatured: e.target.checked }))
                }
              />
            }
            label="Feature this testimonial"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={submitting}>
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
