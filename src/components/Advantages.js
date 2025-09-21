import React from 'react';
import styled from 'styled-components';
import { Box, Grid, Typography } from "@mui/material";

const AdvantagesContainer = styled.section`
  padding: 80px 0;
  background: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #333;
`;

const SectionSubtitle = styled.p`
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 60px;
  color: #666;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const AdvantagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
`;

const AdvantageCard = styled.div`
  text-align: center;
  padding: 40px 30px;
  border-radius: 15px;
  background: #f8f9fa;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  }
`;

const AdvantageIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const AdvantageTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: #333;
  font-weight: 600;
`;

const AdvantageDescription = styled.p`
  color: #666;
  line-height: 1.6;
  font-size: 1rem;
`;

const StatsSection = styled.div`
  margin-top: 80px;
  padding: 60px 20px;
  border-radius: 20px;
  text-align: center;
  color: white;

  /* Background gradient overlay on image */
  background: 
    linear-gradient(
      135deg, 
      rgba(26, 71, 42, 0.8) 0%, 
      rgba(74, 155, 142, 0.6) 30%, 
      rgba(212, 175, 55, 0.5) 70%, 
      rgba(255, 107, 71, 0.4) 100%
    ),
    url('https://i.pinimg.com/736x/0a/2d/12/0a2d1232dab309a9d3de38109705b9bc.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;

  /* Flex layout for inner content */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* Optional shadow for depth */
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  max-width: 800px;
  margin: 0 auto;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  opacity: 0.9;
`;

const Advantages = () => {
  const advantages = [
    {
      icon: "✈️",
      title: "Airport Pick-up",
      description: "Convenient and comfortable airport transfers to start your journey smoothly."
    },
    {
      icon: "🏨",
      title: "Hotel Booking",
      description: "Book the best hotels across Sri Lanka with ease, from luxury resorts to cozy stays."
    },
    {
      icon: "🚐",
      title: "Vehicle/Van with A/C",
      description: "Travel in comfort with our fully air-conditioned vehicles and experienced drivers."
    },
    {
      icon: "🛺",
      title: "Tuk Tuk/Taxi Booking",
      description: "Quick and easy Tuk Tuk or taxi bookings for exploring cities and attractions."
    },
    {
      icon: "🍽️",
      title: "Restaurant Reservation",
      description: "Reserve tables at popular local restaurants and enjoy authentic Sri Lankan cuisine."
    },
    {
      icon: "🎫",
      title: "Ticket Booking",
      description: "Book tickets for tours, events, and activities hassle-free with our assistance."
    }
  ];

  const stats = [
    { number: "500+", label: "Happy Travelers" },
    { number: "15+", label: "Years Experience" },
    { number: "50+", label: "Unique Destinations" },
    { number: "", label: "" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "", label: "" }
  ];

  return (
    <AdvantagesContainer id="advantages">
      <Container>
        <SectionTitle>Why Choose HMA Voyages?</SectionTitle>
        <SectionSubtitle>
          We don't just organize trips – we create life-changing experiences that connect you
          with the heart and soul of Sri Lanka.
        </SectionSubtitle>

        <AdvantagesGrid>
          {advantages.map((advantage, index) => (
            <AdvantageCard key={index}>
              <AdvantageIcon>{advantage.icon}</AdvantageIcon>
              <AdvantageTitle>{advantage.title}</AdvantageTitle>
              <AdvantageDescription>{advantage.description}</AdvantageDescription>
            </AdvantageCard>
          ))}
        </AdvantagesGrid>

        <StatsSection>
          <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: "40px", color: "#ffffffff" }}>
            Our Track Record
          </Typography>
          <StatsGrid container spacing={2} justifyContent="center">
  {stats.map((stat, index) => (
    <Grid 
      item 
      key={index} 
      xs={6}   // 2 items per row on mobile
      sm={6}   // 2 items per row on small devices
      md={3}   // 4 items per row on desktop
    >
      <StatItem>
        <StatNumber>{stat.number}</StatNumber>
        <StatLabel>{stat.label}</StatLabel>
      </StatItem>
    </Grid>
  ))}
</StatsGrid>

        </StatsSection>
      </Container>
    </AdvantagesContainer>
  );
};

export default Advantages; 