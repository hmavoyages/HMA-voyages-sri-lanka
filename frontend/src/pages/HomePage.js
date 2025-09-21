import React from 'react';
import styled from 'styled-components';
import Hero from '../components/Hero';
import Advantages from '../components/Advantages';
import TestimonialsGrid from '../components/Testimonials';

const HomeContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
  min-height: 100vh;
  position: relative;
`;

const SectionWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  
  /* Ensure consistent spacing between sections */
  &:not(:first-child) {
    margin-top: 0;
  }
  
  /* Remove any potential gaps */
  & > * {
    width: 100%;
    max-width: 100%;
  }
`;

const AdvantagesSection = styled(SectionWrapper)`
  background: var(--neutral-warm-white);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 80% 20%, rgba(74, 155, 142, 0.02) 0%, transparent 50%),
      radial-gradient(circle at 20% 80%, rgba(255, 107, 71, 0.02) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const ExperiencesSection = styled(SectionWrapper)`
  background: var(--neutral-warm-white);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 30% 30%, rgba(26, 71, 42, 0.02) 0%, transparent 50%),
      radial-gradient(circle at 70% 70%, rgba(212, 175, 55, 0.02) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const TestimonialsSection = styled(SectionWrapper)`
  background: linear-gradient(135deg, 
    var(--neutral-cream) 0%, 
    var(--neutral-light-gray) 50%, 
    var(--neutral-warm-white) 100%);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 25% 40%, rgba(74, 155, 142, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 75% 60%, rgba(255, 107, 71, 0.02) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const HomePage = () => {
  return (
    <HomeContainer>
      <SectionWrapper>
        <Hero />
      </SectionWrapper>
      
      {/*<ThemesSection>
        <Themes />
      </ThemesSection>*/}
      
      <AdvantagesSection>
        <Advantages />
      </AdvantagesSection>
      
      {/*<SectionWrapper>
        <TravelPackages />
      </SectionWrapper>
      
      <ExperiencesSection>
        <Experiences />
      </ExperiencesSection>*/}
      
      <TestimonialsSection>
        <TestimonialsGrid />
      </TestimonialsSection>
    </HomeContainer>
  );
};

export default HomePage; 