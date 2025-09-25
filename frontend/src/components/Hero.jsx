import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
`;

const parallaxMove = keyframes`
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-30px);
  }
`;

const HeroContainer = styled.section`
  background: 
    linear-gradient(135deg, 
      rgba(26, 71, 42, 0.8) 0%, 
      rgba(74, 155, 142, 0.6) 30%, 
      rgba(212, 175, 55, 0.5) 70%, 
      rgba(255, 107, 71, 0.4) 100%
    ),
    url('https://static01.nyt.com/images/2019/02/03/travel/03frugal-srilanka01/merlin_148552275_74c0d250-949c-46e0-b8a1-e6d499e992cf-superJumbo.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 120px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(ellipse at center, transparent 0%, rgba(26, 71, 42, 0.3) 100%);
    animation: ${float} 8s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: 
      radial-gradient(circle at 30% 20%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(74, 155, 142, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 70%, rgba(255, 107, 71, 0.08) 0%, transparent 50%);
    animation: ${parallaxMove} 20s linear infinite alternate;
  }
`;

const HeroContent = styled.div`
  max-width: 1000px;
  padding: 0 30px;
  position: relative;
  z-index: 3;
  animation: ${fadeInUp} 1.2s ease-out;
`;

const MainTitle = styled.h1`
  font-size: clamp(3rem, 8vw, 5.5rem);
  margin-bottom: 30px;
  font-weight: 350;
  text-shadow: 
    0 4px 12px rgba(0,0,0,0.4),
    0 8px 24px rgba(0,0,0,0.2);
  line-height: 1.1;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: clamp(2.5rem, 7vw, 4rem);
    letter-spacing: -0.02em;
  }
  
  @media (max-width: 480px) {
    font-size: clamp(2rem, 6vw, 3rem);
  }
`;

const MainTitleHighlight = styled.span`
  background: linear-gradient(135deg, #d4af37 0%, #ff6b47 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 400;
`;

const Subtitle = styled.p`
  font-size: clamp(1.2rem, 3vw, 1.6rem);
  color: #ffffffff;
  margin-bottom: 50px;
  opacity: 0.95;
  line-height: 1.8;
  font-weight: 300;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9);
  
  @media (max-width: 768px) {
    font-size: clamp(1.1rem, 2.5vw, 1.4rem);
    margin-bottom: 40px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 25px;
  justify-content: center;
  margin-bottom: 60px;
  flex-wrap: wrap;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

const CTAButton = styled(Link)`
  background: linear-gradient(135deg, #ff6b47 0%, #d4af37 100%);
  color: white;
  text-decoration: none;
  padding: 20px 40px;
  font-size: 1.3rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 10px 30px rgba(255, 107, 71, 0.4),
    0 4px 15px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
  
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
    transform: translateY(-5px) scale(1.02);
    box-shadow: 
      0 20px 40px rgba(255, 107, 71, 0.6),
      0 8px 25px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 480px) {
    width: 280px;
    padding: 18px 35px;
    font-size: 1.2rem;
  }
`;

const SecondaryButton = styled(Link)`
  background: rgba(255, 255, 255, 0.15);
  color: white;
  text-decoration: none;
  border: 2px solid rgba(255, 255, 255, 0.8);
  padding: 18px 38px;
  font-size: 1.3rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.25);
    border-color: white;
    transform: translateY(-5px) scale(1.02);
    box-shadow: 
      0 20px 40px rgba(255, 255, 255, 0.2),
      0 8px 25px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 480px) {
    width: 280px;
    padding: 16px 33px;
    font-size: 1.2rem;
  }
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 25px;
  margin-top: 80px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
    margin-top: 60px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-top: 50px;
  }
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 25px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-8px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 15px;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
  animation: ${float} 3s ease-in-out infinite;
  
  &:nth-child(1) {
    animation-delay: 0s;
  }
  &:nth-child(2) {
    animation-delay: 0.5s;
  }
  &:nth-child(3) {
    animation-delay: 1s;
  }
  &:nth-child(4) {
    animation-delay: 1.5s;
  }
`;

const FeatureText = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  line-height: 1.4;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2rem;
  color: white;
  opacity: 0.8;
  animation: ${float} 2s ease-in-out infinite;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.1);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  &:hover {
    opacity: 1;
    transform: translateX(-50%) scale(1.1);
    background: rgba(255, 255, 255, 0.2);
  }
`;

const Hero = () => {
  return (
    <HeroContainer>
      <HeroContent>
        <br/>
        <MainTitle>
          Experience the <MainTitleHighlight>charm</MainTitleHighlight> of Sri Lanka
        </MainTitle>
        <Subtitle>
          Journey into Sri Lanka’s timeless heritage, golden beaches, and awe-inspiring landscapes with the guidance of our local experts. Let every moment in this tropical paradise become a cherished memory.
        </Subtitle>
        
        <ButtonGroup>
          <SecondaryButton to="/tours">Explore Tours</SecondaryButton>
          <SecondaryButton to="https://api.whatsapp.com/send/?phone=%2B94789126818&text=Hi%2Ccan%20i%20have%20more%20details%20about%20HMAVoyages%20tour%20packages&type=phone_number&app_absent=0">Contact Us</SecondaryButton>
        </ButtonGroup>
        
        <Features>
          <Feature>
            <FeatureIcon>🏛️</FeatureIcon>
            <FeatureText>Ancient Heritage & Sacred Temples</FeatureText>
          </Feature>
          <Feature>
            <FeatureIcon>🏖️</FeatureIcon>
            <FeatureText>Paradise Beaches & Crystal Waters</FeatureText>
          </Feature>
          <Feature>
            <FeatureIcon>🌿</FeatureIcon>
            <FeatureText>Lush Tea Plantations & Mountains</FeatureText>
          </Feature>
          <Feature>
            <FeatureIcon>🐘</FeatureIcon>
            <FeatureText>Wildlife Safaris & Nature</FeatureText>
          </Feature>
        </Features>
        <br></br>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero; 