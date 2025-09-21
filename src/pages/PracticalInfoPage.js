import React from 'react';
import styled from 'styled-components';

const PracticalContainer = styled.div`
  margin-top: 120px;
  min-height: 100vh;
  background: #f8f9fa;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 80px 20px;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
  padding: 60px 0;
  background: linear-gradient(135deg, #2c5530 0%, #1e3a22 100%);
  color: white;
  border-radius: 20px;
`;

const PageTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 20px;
  font-weight: 300;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.3rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
`;

const InfoCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  }
`;

const InfoIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
  text-align: center;
`;

const InfoTitle = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 20px;
  color: #333;
  font-weight: 600;
  text-align: center;
`;

const InfoContent = styled.div`
  color: #666;
  line-height: 1.7;
`;

const InfoItem = styled.div`
  margin-bottom: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
  border-left: 4px solid #ff6b35;
`;

const InfoLabel = styled.strong`
  color: #333;
  display: block;
  margin-bottom: 5px;
`;

const PracticalInfoPage = () => {
  const practicalInfo = [
    {
      icon: "📋",
      title: "Visa & Entry Requirements",
      items: [
        { label: "Visa on Arrival", content: "Available for most countries, $25-40 USD" },
        { label: "Electronic Travel Authorization (ETA)", content: "Apply online before travel" },
        { label: "Passport Validity", content: "Must be valid for 6 months from arrival" },
        { label: "Duration", content: "Tourist visa valid for 30 days" }
      ]
    },
    {
      icon: "💰",
      title: "Currency & Money",
      items: [
        { label: "Currency", content: "Sri Lankan Rupee (LKR)" },
        { label: "ATMs", content: "Widely available in cities and towns" },
        { label: "Credit Cards", content: "Accepted in hotels, restaurants, shops" },
        { label: "Cash", content: "Preferred for local transport and small vendors" }
      ]
    },
    {
      icon: "🏥",
      title: "Health & Safety",
      items: [
        { label: "Vaccinations", content: "Hepatitis A & B, Typhoid recommended" },
        { label: "Malaria", content: "Low risk, use mosquito repellent" },
        { label: "Water", content: "Drink bottled or boiled water" },
        { label: "Emergency", content: "Police: 119, Medical: 110" }
      ]
    },
    {
      icon: "📱",
      title: "Communication",
      items: [
        { label: "Language", content: "Sinhala, Tamil, English widely spoken" },
        { label: "SIM Cards", content: "Available at airport and shops" },
        { label: "Internet", content: "WiFi available in most hotels" },
        { label: "Calling Code", content: "+94" }
      ]
    },
    {
      icon: "🌡️",
      title: "Climate & Weather",
      items: [
        { label: "Tropical Climate", content: "26-32°C year-round" },
        { label: "Southwest Monsoon", content: "May-September (west/south coast)" },
        { label: "Northeast Monsoon", content: "December-February (east/north)" },
        { label: "Best Time", content: "November-April for most regions" }
      ]
    },
    {
      icon: "🚗",
      title: "Transportation",
      items: [
        { label: "Trains", content: "Scenic routes, advance booking recommended" },
        { label: "Buses", content: "Extensive network, budget-friendly" },
        { label: "Tuk-tuks", content: "Convenient for short distances" },
        { label: "Car Rental", content: "International license required" }
      ]
    },
    {
      icon: "⚡",
      title: "Electricity & Power",
      items: [
        { label: "Voltage", content: "230V, 50Hz" },
        { label: "Plug Type", content: "Type D (3 round pins)" },
        { label: "Adapter", content: "Bring universal adapter" },
        { label: "Power Outages", content: "Occasional, especially during monsoon" }
      ]
    },
    {
      icon: "🍽️",
      title: "Food & Dining",
      items: [
        { label: "Cuisine", content: "Rice, curry, seafood, tropical fruits" },
        { label: "Spice Level", content: "Generally spicy, ask for mild" },
        { label: "Hygiene", content: "Choose busy restaurants and street food" },
        { label: "Vegetarian", content: "Excellent vegetarian options available" }
      ]
    },
    {
      icon: "🎭",
      title: "Culture & Etiquette",
      items: [
        { label: "Religion", content: "Buddhist majority, respect religious sites" },
        { label: "Dress Code", content: "Modest clothing for temples" },
        { label: "Shoes", content: "Remove shoes at temples and homes" },
        { label: "Photography", content: "Ask permission before photographing people" }
      ]
    }
  ];

  return (
    <PracticalContainer>
      <Container>
        <PageHeader>
          <PageTitle>Practical Information</PageTitle>
          <PageSubtitle>
            Everything you need to know for a smooth and enjoyable trip to Sri Lanka
          </PageSubtitle>
        </PageHeader>

        <InfoGrid>
          {practicalInfo.map((info, index) => (
            <InfoCard key={index}>
              <InfoIcon>{info.icon}</InfoIcon>
              <InfoTitle>{info.title}</InfoTitle>
              <InfoContent>
                {info.items.map((item, idx) => (
                  <InfoItem key={idx}>
                    <InfoLabel>{item.label}:</InfoLabel>
                    {item.content}
                  </InfoItem>
                ))}
              </InfoContent>
            </InfoCard>
          ))}
        </InfoGrid>
      </Container>
    </PracticalContainer>
  );
};

export default PracticalInfoPage; 