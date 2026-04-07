import React from "react";
import styled from "styled-components";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import Advantages from "../components/Advantages";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PublicIcon from "@mui/icons-material/Public";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const AboutContainer = styled.div`
  min-height: 100vh;
  padding-top: 80px;
  background-color: var(--neutral-cream, #f9f9f9);

  @media (max-width: 600px) {
    padding-top: 60px;
  }
`;

const HeroSection = styled.div`
  padding: 60px 20px;
  text-align: center;
  background: linear-gradient(
    135deg,
    rgba(26, 71, 42, 0.05) 0%,
    rgba(74, 155, 142, 0.05) 100%
  );

  @media (max-width: 600px) {
    padding: 40px 16px;
  }
`;

const ValuesSection = styled.div`
  padding: 60px 20px;

  @media (max-width: 600px) {
    padding: 40px 16px;
  }
`;

const values = [
  {
    icon: <AutoAwesomeIcon />,
    title: "Unforgettable Experiences",
    text: "We aim to make every trip not just a holiday, but a collection of happy moments.",
  },
  {
    icon: <PublicIcon />,
    title: "Local Expertise",
    text: "Our guides ensure you experience authentic Sri Lankan life safely.",
  },
  {
    icon: <VerifiedUserIcon />,
    title: "Trust & Reliability",
    text: "We offer 24/7 support and seamless logistics for your journey.",
  },
];

const AboutPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AboutContainer>
      <HeroSection>
        <Container maxWidth="md" component={motion.div} {...fadeIn}>
          <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
            <img
              src="/hma-logo.jpg"
              alt="HMA Voyages Logo"
              style={{
                width: isMobile ? "100px" : "150px",
                height: isMobile ? "100px" : "150px",
                borderRadius: "50%",
                objectFit: "cover",
                boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
              }}
            />
          </Box>

          <Typography
            variant={isMobile ? "h5" : "h3"}
            fontWeight={800}
            gutterBottom
            sx={{ color: "var(--primary-green)" }}
          >
            About HMA Voyages
          </Typography>

          <Typography
            variant={isMobile ? "body1" : "h6"}
            color="text.secondary"
            sx={{ mb: 3, lineHeight: 1.7 }}
          >
            We are committed to filling your vacation with beautiful memories
            and making every moment of it enjoyable. "HAPPY MOMENT ALWAYS"
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.7 }}
          >
            Based in Sri Lanka, HMA Voyages has proudly showcased the true
            essence and beauty of the island since our inception. We believe in
            crafting personalized travel experiences that resonate with each
            traveler.
          </Typography>
        </Container>
      </HeroSection>

      <ValuesSection>
        <Container maxWidth="lg">
          <Typography
            variant={isMobile ? "h5" : "h4"}
            fontWeight={800}
            textAlign="center"
            sx={{ mb: 5 }}
          >
            Our Core Values
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {values.map((item, index) => (
              <Grid
                key={index}
                size={{ xs: 12, sm: 6, md: 4 }} // ✅ NEW WAY
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Paper
                  component={motion.div}
                  whileHover={{ y: -8 }}
                  elevation={2}
                  sx={{
                    p: 3,
                    textAlign: "center",
                    width: "100%",
                    maxWidth: 350,
                    borderRadius: 3,
                  }}
                >
                  <Box sx={{ color: "var(--accent-orange)", mb: 2 }}>
                    {React.cloneElement(item.icon, { style: { fontSize: 40 } })}
                  </Box>

                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {item.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {item.text}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </ValuesSection>

      <Box sx={{ backgroundColor: "white", py: isMobile ? 3 : 5 }}>
        <Advantages />
      </Box>
    </AboutContainer>
  );
};

export default AboutPage;
