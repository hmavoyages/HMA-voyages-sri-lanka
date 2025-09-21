import React from 'react';
import styled from 'styled-components';

const ThemesContainer = styled.section`
  padding: 100px 0;
  background: transparent;
  position: relative;
  z-index: 1;
`;

const Container = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 30px;
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
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
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.8;
  font-weight: 300;
`;

const ThemesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 35px;
  align-items: stretch;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  
  @media (max-width: 480px) {
    gap: 20px;
  }
`;

const ThemeCard = styled.div`
  position: relative;
  height: 350px;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-soft);
  
  &:hover {
    transform: translateY(-12px);
    box-shadow: var(--shadow-strong);
  }
  
  @media (max-width: 768px) {
    height: 320px;
    
    &:hover {
      transform: translateY(-8px);
    }
  }
`;

const ThemeImage = styled.div`
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
    background: linear-gradient(180deg, 
      rgba(0,0,0,0.1) 0%, 
      rgba(0,0,0,0.3) 40%, 
      rgba(0,0,0,0.7) 100%);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(26, 71, 42, 0.2) 0%, 
      rgba(74, 155, 142, 0.1) 50%, 
      rgba(212, 175, 55, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  ${ThemeCard}:hover &::after {
    opacity: 1;
  }
`;

const ThemeContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 35px 30px;
  color: white;
  z-index: 2;
  transform: translateY(0);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  ${ThemeCard}:hover & {
    transform: translateY(-5px);
  }
  
  @media (max-width: 768px) {
    padding: 30px 25px;
  }
`;

const ThemeTitle = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 15px;
  font-weight: 600;
  line-height: 1.3;
  text-shadow: 0 2px 8px rgba(0,0,0,0.5);
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin-bottom: 12px;
  }
`;

const ThemeDescription = styled.p`
  font-size: 1rem;
  opacity: 0.95;
  line-height: 1.6;
  text-shadow: 0 1px 4px rgba(0,0,0,0.5);
  margin-bottom: 0;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.5;
  }
`;

const ThemeIcon = styled.div`
  position: absolute;
  top: 25px;
  right: 25px;
  font-size: 2.5rem;
  z-index: 2;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.3));
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  ${ThemeCard}:hover & {
    transform: scale(1.1) rotate(5deg);
  }
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
    top: 20px;
    right: 20px;
  }
`;

const Themes = () => {
  const themes = [
    {
      title: "Cultural Heritage",
      description: "Explore ancient temples, UNESCO World Heritage sites, and discover 2,500 years of fascinating history that shaped this incredible island nation.",
      icon: "🏛️",
      image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=85"
    },
    {
      title: "Paradise Beaches",
      description: "Relax on pristine white sand beaches along the stunning coastline of the Indian Ocean with crystal clear waters and palm-fringed shores.",
      icon: "🏖️",
      image: "https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=85"
    },
    {
      title: "Breathtaking Landscapes",
      description: "Journey through lush tea plantations, misty mountains, and scenic train rides that showcase Sri Lanka's diverse natural beauty.",
      icon: "🌿",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=85"
    },
    {
      title: "Adventure Trekking",
      description: "Hike through national parks, climb sacred peaks like Adam's Peak, and explore diverse ecosystems filled with unique wildlife.",
      icon: "🥾",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=85"
    },
    {
      title: "Must-See Highlights",
      description: "Experience the iconic attractions and hidden gems that make Sri Lanka unforgettable, from ancient rock fortresses to vibrant markets.",
      icon: "⭐",
      image: "https://images.unsplash.com/photo-1586500036706-41963de24d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=85"
    }
  ];

  return (
    <ThemesContainer id="themes">
      <Container>
        <SectionTitle>Choose Your Adventure</SectionTitle>
        <SectionSubtitle>
          Discover Sri Lanka through different themes and create memories that will last a lifetime 
          in this enchanting tropical paradise.
        </SectionSubtitle>
        
        <ThemesGrid>
          {themes.map((theme, index) => (
            <ThemeCard key={index}>
              <ThemeImage bg={theme.image}>
                <ThemeIcon>{theme.icon}</ThemeIcon>
                <ThemeContent>
                  <ThemeTitle>{theme.title}</ThemeTitle>
                  <ThemeDescription>{theme.description}</ThemeDescription>
                </ThemeContent>
              </ThemeImage>
            </ThemeCard>
          ))}
        </ThemesGrid>
      </Container>
    </ThemesContainer>
  );
};

export default Themes; 