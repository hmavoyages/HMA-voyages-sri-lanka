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
  Button,
} from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import AddTestimonialDialog from "./AddTestimonialDialog";

const Testimonials = () => {
  const theme = useTheme();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [openAdd, setOpenAdd] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(" https://backend.hmavoyages.com/testimonials");
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
    setTestimonials((prev) => [created, ...prev]);
  };

  const countryCodes = {
    Afghanistan: "af", Albania: "al", Algeria: "dz", Andorra: "ad", Angola: "ao", "Antigua and Barbuda": "ag", Argentina: "ar", Armenia: "am",
    Australia: "au", Austria: "at", Azerbaijan: "az", Bahamas: "bs", Bahrain: "bh", Bangladesh: "bd", Barbados: "bb", Belarus: "by",
    Belgium: "be", Belize: "bz", Benin: "bj", Bhutan: "bt", Bolivia: "bo", "Bosnia and Herzegovina": "ba", Botswana: "bw", Brazil: "br",
    Brunei: "bn", Bulgaria: "bg", "Burkina Faso": "bf", Burundi: "bi", "Cabo Verde": "cv", Cambodia: "kh", Cameroon: "cm", Canada: "ca",
    "Central African Republic": "cf", Chad: "td", Chile: "cl", China: "cn", Colombia: "co", Comoros: "km", "Congo (Congo-Brazzaville)": "cg",
    "Democratic Republic of the Congo": "cd", "Costa Rica": "cr", Croatia: "hr", Cuba: "cu", Cyprus: "cy", "Czech Republic": "cz", Denmark: "dk",
    Djibouti: "dj", Dominica: "dm", "Dominican Republic": "do", Ecuador: "ec", Egypt: "eg", "El Salvador": "sv", "Equatorial Guinea": "gq",
    Eritrea: "er", Estonia: "ee", Eswatini: "sz", Ethiopia: "et", Fiji: "fj", Finland: "fi", France: "fr", Gabon: "ga",
    Gambia: "gm", Georgia: "ge", Germany: "de", Ghana: "gh", Greece: "gr", Grenada: "gd", Guatemala: "gt", Guinea: "gn",
    "Guinea-Bissau": "gw", Guyana: "gy", Haiti: "ht", Honduras: "hn", Hungary: "hu", Iceland: "is", India: "in",
    Indonesia: "id", Iran: "ir", Iraq: "iq", Ireland: "ie", Israel: "il", Italy: "it", "Ivory Coast": "ci", Jamaica: "jm",
    Japan: "jp", Jordan: "jo", Kazakhstan: "kz", Kenya: "ke", Kiribati: "ki", Kuwait: "kw", Kyrgyzstan: "kg", Laos: "la",
    Latvia: "lv", Lebanon: "lb", Lesotho: "ls", Liberia: "lr", Libya: "ly", Liechtenstein: "li", Lithuania: "lt", Luxembourg: "lu", Madagascar: "mg",
    Malawi: "mw", Malaysia: "my", Maldives: "mv", Mali: "ml", Malta: "mt", "Marshall Islands": "mh", Mauritania: "mr", Mauritius: "mu",
    Mexico: "mx", Micronesia: "fm", Moldova: "md", Monaco: "mc", Mongolia: "mn", Montenegro: "me", Morocco: "ma", Mozambique: "mz",
    Myanmar: "mm", Namibia: "na", Nauru: "nr", Nepal: "np", Netherlands: "nl", "New Zealand": "nz", Nicaragua: "ni", Niger: "ne",
    Nigeria: "ng", "North Korea": "kp", "North Macedonia": "mk", Norway: "no", Oman: "om", Pakistan: "pk", Palau: "pw", Palestine: "ps",
    Panama: "pa", "Papua New Guinea": "pg", Paraguay: "py", Peru: "pe", Philippines: "ph", Poland: "pl", Portugal: "pt", Qatar: "qa",
    Romania: "ro", Russia: "ru", Rwanda: "rw", "Saint Kitts and Nevis": "kn", "Saint Lucia": "lc", "Saint Vincent and the Grenadines": "vc",
    Samoa: "ws", "San Marino": "sm", "Sao Tome and Principe": "st", "Saudi Arabia": "sa", Senegal: "sn", Serbia: "rs", Seychelles: "sc", "Sierra Leone": "sl",
    Singapore: "sg", Slovakia: "sk", Slovenia: "si", "Solomon Islands": "sb", Somalia: "so", "South Africa": "za", "South Korea": "kr", "South Sudan": "ss",
    Spain: "es", "Sri Lanka": "lk", Sudan: "sd", Suriname: "sr", Sweden: "se", Switzerland: "ch", Syria: "sy", Taiwan: "tw",
    Tajikistan: "tj", Tanzania: "tz", Thailand: "th", "Timor-Leste": "tl", Togo: "tg", Tonga: "to", "Trinidad and Tobago": "tt", Tunisia: "tn",
    Turkey: "tr", Turkmenistan: "tm", Tuvalu: "tv", Uganda: "ug", Ukraine: "ua", "United Arab Emirates": "ae", "United Kingdom": "gb", "United States": "us",
    Uruguay: "uy", Uzbekistan: "uz", Vanuatu: "vu", "Vatican City": "va", Venezuela: "ve", Vietnam: "vn", Yemen: "ye", Zambia: "zm", Zimbabwe: "zw",
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
        {/* Header */}
        <br />
        <br />
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

        <Button
          variant="contained"
          onClick={() => setOpenAdd(true)}
          sx={{ mb: 4, backgroundColor: "#ff4800ff", "&:hover": { backgroundColor: "#244427" } }}
        >
          Write a Review
        </Button>

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
                  <br />

                  {/* Optional image mosaic */}
                  {Array.isArray(t.images) && t.images.length > 0 && (
                    <Box sx={{ mb: 2, mt: 3 }}>
                      <ImageList
                        variant="quilted"
                        cols={3}
                        rowHeight={250}
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
                        {t.location && countryCodes[t.location] && (
                          <img
                            src={`https://flagcdn.com/24x18/${countryCodes[t.location]}.png`}
                            alt={t.location}
                            style={{
                              verticalAlign: "middle",
                              marginLeft: 6,
                              borderRadius: 2,
                              boxShadow: "0 1px 4px rgba(0,0,0,0.10)",
                            }}
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

                  {/* Trip tag (Typography as div to avoid <div> inside <p>) */}
                  <CardContent sx={{ px: 0, pt: 2.5, mt: "auto" }}>
                    <Typography component="div" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box component="span" sx={{ color: "text.secondary" }}>Trip to:</Box>
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
                      )}
                    </Typography>
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
