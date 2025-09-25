import React from 'react';
import styled from 'styled-components';

const ExperiencesContainer = styled.section`
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

const ExperiencesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const ExperienceCard = styled.div`
  position: relative;
  height: 400px;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const ExperienceImage = styled.div`
  height: 100%;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8));
  }
`;

const ExperienceContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30px;
  color: white;
  z-index: 1;
`;

const ExperienceTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 10px;
  font-weight: 600;
`;

const ExperienceDescription = styled.p`
  font-size: 0.95rem;
  opacity: 0.9;
  line-height: 1.4;
  margin-bottom: 15px;
`;

const ExperienceFeatures = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
`;

const Feature = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  backdrop-filter: blur(10px);
`;

const Experiences = () => {
  const experiences = [
    {
      title: "Temple of the Tooth",
      description: "Visit the most sacred Buddhist temple in Sri Lanka, home to a relic of Buddha's tooth in Kandy.",
      features: ["Sacred Site", "Cultural Heritage", "Royal History"],
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Safari in Yala National Park",
      description: "Spot leopards, elephants, and exotic birds in Sri Lanka's most famous wildlife sanctuary.",
      features: ["Wildlife", "Photography", "Nature"],
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Train Ride to Ella",
      description: "Experience one of the world's most scenic train journeys through tea plantations and mountains.",
      features: ["Scenic Route", "Adventure", "Photography"],
      image: "https://images.unsplash.com/photo-1544306094-e2c49e7c7b9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Stilt Fishing",
      description: "Witness the traditional stilt fishermen of Weligama Bay, a unique Sri Lankan fishing method.",
      features: ["Tradition", "Coastal", "Photography"],
      image: "https://images.unsplash.com/photo-1580487625259-4bb1db1ff4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Sigiriya Rock Fortress",
      description: "Climb the ancient rock fortress and palace ruins with breathtaking 360-degree views.",
      features: ["UNESCO Site", "History", "Adventure"],
      image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Spice Garden Tour",
      description: "Discover exotic spices and learn about traditional Ayurvedic medicine in lush gardens.",
      features: ["Culture", "Learning", "Wellness"],
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <ExperiencesContainer id="experiences">
      <Container>
        <SectionTitle>Unforgettable Experiences</SectionTitle>
        <SectionSubtitle>
          Immerse yourself in the authentic culture, stunning nature, and unique traditions that make Sri Lanka extraordinary.
        </SectionSubtitle>
        
        <ExperiencesGrid>
          {experiences.map((experience, index) => (
            <ExperienceCard key={index}>
              <ExperienceImage bg={experience.image}>
                <ExperienceContent>
                  <ExperienceTitle>{experience.title}</ExperienceTitle>
                  <ExperienceDescription>{experience.description}</ExperienceDescription>
                  <ExperienceFeatures>
                    {experience.features.map((feature, idx) => (
                      <Feature key={idx}>{feature}</Feature>
                    ))}
                  </ExperienceFeatures>
                </ExperienceContent>
              </ExperienceImage>
            </ExperienceCard>
          ))}
        </ExperiencesGrid>
      </Container>
    </ExperiencesContainer>
  );
};

export default Experiences; 