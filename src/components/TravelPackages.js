import React from 'react';
import styled from 'styled-components';

const PackagesContainer = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, 
    var(--neutral-warm-white) 0%, 
    var(--neutral-light-gray) 50%, 
    var(--neutral-cream) 100%);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(74, 155, 142, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const Container = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 30px;
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  margin-bottom: 25px;
  color: var(--primary-green);
  font-weight: 300;
  letter-spacing: -0.02em;
`;

const SectionSubtitle = styled.p`
  text-align: center;
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  margin-bottom: 80px;
  color: var(--text-secondary);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.8;
  font-weight: 300;
`;

const PackagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const PackageCard = styled.div`
  background: var(--neutral-warm-white);
  border-radius: 25px;
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  position: relative;
  
  &:hover {
    transform: translateY(-12px);
    box-shadow: var(--shadow-strong);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(26, 71, 42, 0.02) 0%, 
      rgba(212, 175, 55, 0.01) 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 1;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const PackageImage = styled.div`
  height: 280px;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, 
      rgba(0,0,0,0.1) 0%, 
      rgba(0,0,0,0.3) 70%, 
      rgba(0,0,0,0.6) 100%);
  }
`;

const PackageBadge = styled.div`
  position: absolute;
  top: 25px;
  left: 25px;
  background: linear-gradient(135deg, var(--accent-coral) 0%, var(--accent-gold) 100%);
  color: white;
  padding: 10px 18px;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  z-index: 2;
  box-shadow: 0 4px 15px rgba(255, 107, 71, 0.3);
  backdrop-filter: blur(10px);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const PackageContent = styled.div`
  padding: 35px 30px;
  position: relative;
  z-index: 2;
`;

const PackageTitle = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 18px;
  color: var(--primary-green);
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
`;

const PackageDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 25px;
  font-size: 1rem;
  font-weight: 400;
`;

const PackageDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 15px;
`;

const PackageInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  color: var(--text-secondary);
  font-weight: 500;
  
  span:first-child {
    font-size: 1.1rem;
  }
`;

const PackagePrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
`;

const Price = styled.div`
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--accent-coral) 0%, var(--accent-gold) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 5px;
`;

const PriceLabel = styled.div`
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
`;

const PackageButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, var(--primary-green) 0%, var(--primary-green-light) 100%);
  color: white;
  border: none;
  padding: 18px 24px;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  text-transform: none;
  letter-spacing: 0.5px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.6s;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &:hover {
    background: linear-gradient(135deg, var(--primary-green-light) 0%, var(--accent-teal) 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(26, 71, 42, 0.3);
  }
`;

const TravelPackages = () => {
  const packages = [
    {
      title: "Cultural Triangle Explorer",
      description: "Discover the ancient kingdoms of Anuradhapura, Polonnaruwa, and Kandy. Visit sacred temples, royal palaces, and UNESCO World Heritage sites that tell the story of Sri Lanka's glorious past.",
      duration: "8 days",
      groupSize: "2-12 people",
      price: "€1,299",
      badge: "Most Popular",
      image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=85"
    },
    {
      title: "Beach & Wildlife Adventure",
      description: "Combine pristine beaches of the south coast with incredible wildlife safaris in Yala National Park. Perfect for nature lovers seeking both relaxation and adventure.",
      duration: "10 days",
      groupSize: "2-8 people",
      price: "€1,599",
      badge: "Wildlife Special",
      image: "https://images.unsplash.com/photo-1571757767119-68b8dbed8c97?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=85"
    },
    {
      title: "Highland Tea Country",
      description: "Journey through misty mountains, lush tea plantations, and charming hill stations like Ella and Nuwara Eliya. Experience the world's finest Ceylon tea at its source.",
      duration: "7 days",
      groupSize: "2-10 people",
      price: "€1,199",
      badge: "Scenic Route",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=85"
    },
    {
      title: "Complete Sri Lanka",
      description: "The ultimate 2-week journey covering culture, nature, beaches, and highlands. Experience everything Sri Lanka has to offer in one comprehensive adventure.",
      duration: "15 days",
      groupSize: "2-15 people",
      price: "€2,299",
      badge: "Complete Experience",
      image: "https://images.unsplash.com/photo-1586500036706-41963de24d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=85"
    },
    {
      title: "Luxury Boutique Escape",
      description: "Stay in the finest boutique hotels and luxury resorts while exploring Sri Lanka's highlights in unparalleled style and comfort. Indulge in world-class hospitality.",
      duration: "12 days",
      groupSize: "2-6 people",
      price: "€3,499",
      badge: "Luxury",
      image: "https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=85"
    },
    {
      title: "Adventure Trekking Tour",
      description: "For active travelers: hike through national parks, climb Adam's Peak at sunrise, and explore off-the-beaten-path destinations that showcase Sri Lanka's wild side.",
      duration: "9 days",
      groupSize: "4-8 people",
      price: "€1,399",
      badge: "Adventure",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=85"
    }
  ];

  return (
    <PackagesContainer id="packages">
      <Container>
        <SectionTitle>Featured Travel Packages</SectionTitle>
        <SectionSubtitle>
          Choose from our carefully crafted itineraries designed to showcase the very best of Sri Lanka, 
          or let us create a completely custom journey tailored just for you.
        </SectionSubtitle>
        
        <PackagesGrid>
          {packages.map((pkg, index) => (
            <PackageCard key={index}>
              <PackageImage bg={pkg.image}>
                <PackageBadge>{pkg.badge}</PackageBadge>
              </PackageImage>
              <PackageContent>
                <PackageTitle>{pkg.title}</PackageTitle>
                <PackageDescription>{pkg.description}</PackageDescription>
                
                <PackageDetails>
                  <PackageInfo>
                    <InfoItem>
                      <span>⏱️</span>
                      <span>{pkg.duration}</span>
                    </InfoItem>
                    <InfoItem>
                      <span>👥</span>
                      <span>{pkg.groupSize}</span>
                    </InfoItem>
                  </PackageInfo>
                  
                  <PackagePrice>
                    <Price>{pkg.price}</Price>
                    <PriceLabel>per person</PriceLabel>
                  </PackagePrice>
                </PackageDetails>
                
                <PackageButton>View Details & Book</PackageButton>
              </PackageContent>
            </PackageCard>
          ))}
        </PackagesGrid>
      </Container>
    </PackagesContainer>
  );
};

export default TravelPackages; 