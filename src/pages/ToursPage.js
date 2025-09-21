import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  Chip,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import Slider from "react-slick";
import { motion } from "framer-motion"; // for animations
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import tour2Image1 from "../assets/images/2/1.jpeg";
import tour2Image2 from "../assets/images/2/2.jpeg";
import tour2Image3 from "../assets/images/2/3.jpeg";

import tour1Image1 from "../assets/images/1/1.jpeg";
import tour1Image2 from "../assets/images/1/2.jpeg";
import tour1Image3 from "../assets/images/1/3.jpeg";
import tour1Image4 from "../assets/images/1/4.jpeg";
import tour1Image5 from "../assets/images/1/5.jpeg";
import tour1Image6 from "../assets/images/1/6.jpeg";
import tour1Image7 from "../assets/images/1/7.jpeg";
import tour1Image8 from "../assets/images/1/8.jpeg";






const ToursPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Cultural", "Adventure", "Beach", "Wildlife", "Luxury", "Budget"];

  const tours = [
    {
      title: "Cultural Triangle Explorer",
      description:
        "Journey through 2,500 years of history visiting the ancient kingdoms of Anuradhapura, Polonnaruwa, and the sacred city of Kandy. Explore magnificent temples, royal palaces, and UNESCO World Heritage sites.",
      duration: "8 days",
      groupSize: "2-12 people",
      difficulty: "Easy",
      price: "€1,299",
      category: "Cultural",
      badge: "Most Popular",
      images: [
        tour2Image1,
        tour2Image2,
        tour2Image3,
      ],
      highlights: [
        "Temple of the Sacred Tooth Relic in Kandy",
        "Ancient ruins of Anuradhapura",
        "Polonnaruwa archaeological site",
        "Traditional Kandyan cultural show",
        "Royal Botanical Gardens",
      ],
    },
    {
      title: "Cultural Triangle Explorer",
      description:
        "Journey through 2,500 years of history visiting the ancient kingdoms of Anuradhapura, Polonnaruwa, and the sacred city of Kandy. Explore magnificent temples, royal palaces, and UNESCO World Heritage sites.",
      duration: "8 days",
      groupSize: "2-12 people",
      difficulty: "Easy",
      price: "€1,299",
      category: "Adventure",
      badge: "Most Popular",
      images: [
        tour1Image1,
        tour1Image2,
        tour1Image3,
        tour1Image4,
        tour1Image5,
        tour1Image6,
        tour1Image7,
        tour1Image8,
      ],
      highlights: [
        "Temple of the Sacred Tooth Relic in Kandy",
        "Ancient ruins of Anuradhapura",
        "Polonnaruwa archaeological site",
        "Traditional Kandyan cultural show",
        "Royal Botanical Gardens",
      ],
    },
  ];

  const filteredTours =
    activeFilter === "All"
      ? tours
      : tours.filter((tour) => tour.category === activeFilter);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
  };

  return (
    <Box sx={{ py: 6, bgcolor: "#f9fafb" }}>
      <Container maxWidth="lg">
        {/* Page Header */}
        <Box textAlign="center" mb={5}>
          <Typography variant="h3" fontWeight="bold" gutterBottom color="primary.main">
            Discover Sri Lanka Tours
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            maxWidth="700px"
            mx="auto"
          >
            Carefully crafted journeys to explore the Pearl of the Indian Ocean. From cultural
            wonders to pristine beaches, find your perfect adventure.
          </Typography>
        </Box>

        {/* Filters */}
        <Box display="flex" justifyContent="center" mb={5}>
          <Tabs
            value={filters.indexOf(activeFilter)}
            onChange={(e, newValue) => setActiveFilter(filters[newValue])}
            textColor="primary"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            {filters.map((filter) => (
              <Tab key={filter} label={filter} />
            ))}
          </Tabs>
        </Box>

        {/* Tours Grid */}
        <Grid container spacing={4}>
          {filteredTours.map((tour, index) => (
            <Grid item xs={12} md={6} key={index}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Card
                  sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                    boxShadow: 6,
                    transition: "0.3s",
                    "&:hover": { boxShadow: 12 },
                  }}
                >
                  {/* Slider */}
                  <Box sx={{ position: "relative", overflow: "hidden" }}>
                    <Slider {...settings}>
                      {tour.images.map((img, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            height: 300,
                            backgroundImage: `url(${img})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            transition: "transform 0.4s ease",
                            "&:hover": { transform: "scale(1.05)" },
                          }}
                        />
                      ))}
                    </Slider>
                    <Chip
                      label={tour.badge}
                      sx={{
                        position: "absolute",
                        top: 16,
                        left: 16,
                        bgcolor: "primary.main",
                        color: "white",
                        fontWeight: "bold",
                        px: 1,
                        borderRadius: "20px",
                      }}
                    />
                    <Chip
                      label={tour.difficulty}
                      variant="outlined"
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        bgcolor: "rgba(255,255,255,0.9)",
                        borderRadius: "20px",
                        fontWeight: "bold",
                      }}
                    />
                  </Box>

                  {/* Content */}
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {tour.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                      {tour.description}
                    </Typography>

                    <Grid container spacing={2} mb={2}>
                      <Grid item>
                        <Typography variant="body2">⏱️ {tour.duration}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2">👥 {tour.groupSize}</Typography>
                      </Grid>
                    </Grid>

                    <Typography variant="subtitle2" fontWeight="bold">
                      Tour Highlights:
                    </Typography>
                    <ul style={{ margin: "8px 0 16px", paddingLeft: "20px" }}>
                      {tour.highlights.slice(0, 3).map((highlight, idx) => (
                        <li key={idx}>
                          <Typography variant="body2" color="text.secondary">
                            {highlight}
                          </Typography>
                        </li>
                      ))}
                    </ul>

                    <Divider sx={{ my: 2 }} />

                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="h6" color="primary">
                          {tour.price}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          per person
                        </Typography>
                      </Box>

                      <Box>
                        <Button
                          variant="contained"
                          sx={{
                            mr: 1,
                            borderRadius: 3,
                            px: 3,
                            py: 1,
                            background: "linear-gradient(45deg, #f57c00, #ef6c00)",
                            "&:hover": { background: "linear-gradient(45deg, #ef6c00, #e65100)" },
                          }}
                        >
                          Book Now
                        </Button>
                        <Button
                          variant="outlined"
                          sx={{
                            borderRadius: 3,
                            px: 3,
                            py: 1,
                          }}
                        >
                          Details
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ToursPage;
