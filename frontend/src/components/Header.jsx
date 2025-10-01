import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import GoogleTranslateSwitch from "../components/GoogleTranslateSwitch";

const HeaderContainer = styled.header`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  box-shadow: var(--shadow-soft);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const NavContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 90px;
  position: relative;
  
  @media (max-width: 1024px) {
    padding: 0 25px;
  }
  
  @media (max-width: 768px) {
    padding: 0 20px;
    height: 80px;
  }
`;

const Logo = styled(Link)`
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  font-weight: 700;
  color: var(--primary-green);
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: -0.02em;
  flex-shrink: 0;
  
  .highlight {
    background: var(--gradient-accent);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  &:hover {
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
  
  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const DesktopNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 35px;
  
  @media (max-width: 1024px) {
    gap: 25px;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileNav = styled.nav`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    flex-direction: column;
    padding: 30px;
    box-shadow: var(--shadow-medium);
    border-radius: 0 0 25px 25px;
    gap: 20px;
    border-top: 1px solid rgba(26, 71, 42, 0.1);
    align-items: center;
    text-align: center;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 500;
  font-size: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  padding: 8px 0;
  white-space: nowrap;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--gradient-accent);
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  &:hover {
    color: var(--primary-green);
    transform: translateY(-1px);
    
    &::after {
      width: 100%;
    }
  }
  
  &.active {
    color: var(--primary-green);
    font-weight: 600;
    
    &::after {
      width: 100%;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 18px;
    padding: 15px 0;
    
    &:hover {
      transform: none;
    }
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
  
  @media (max-width: 1024px) {
    gap: 20px;
  }
  
  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const GetQuoteButton = styled(Link)`
  background: var(--gradient-accent);
  color: white;
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-soft);
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
  
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
    transform: translateY(-2px);
    box-shadow: var(--shadow-medium);
  }
  
  @media (max-width: 1024px) {
    padding: 10px 20px;
    font-size: 13px;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileGetQuoteButton = styled(Link)`
  background: var(--gradient-accent);
  color: white;
  text-decoration: none;
  padding: 16px 32px;
  border-radius: 25px;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-soft);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 10px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-medium);
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(26, 71, 42, 0.1);
  }
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MenuIcon = styled.div`
  width: 24px;
  height: 2px;
  background: var(--primary-green);
  position: relative;
  transition: all 0.3s ease;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background: var(--primary-green);
    transition: all 0.3s ease;
  }
  
  &::before {
    top: -8px;
  }
  
  &::after {
    bottom: -8px;
  }
  
  ${props => props.isOpen && `
    background: transparent;
    
    &::before {
      top: 0;
      transform: rotate(45deg);
    }
    
    &::after {
      bottom: 0;
      transform: rotate(-45deg);
    }
  `}
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <HeaderContainer>
      {/*<TopBar>
      🌟 Discover Sri Lanka with Expert Local Guides - Book Your Dream Journey Today! 🇱🇰
    </TopBar>*/}

      <NavContainer>
        <Logo to="/" onClick={closeMenu}>
          H<span className="highlight">M</span>Avoyages</Logo>

        <DesktopNav>
          <NavLink
            to="/"
            className={location.pathname === '/' ? 'active' : ''}
          >
            Home
          </NavLink>
          <NavLink
            to="/tours"
            className={location.pathname === '/tours' ? 'active' : ''}
          >
            Tour Packages
          </NavLink>
          <NavLink
            to="/gallery"
            className={location.pathname === '/gallery' ? 'active' : ''}
            onClick={closeMenu}
          >
            Gallery
          </NavLink>
          <NavLink
            to="/feedbacks"
            className={location.pathname === '/feedbacks' ? 'active' : ''}
            onClick={closeMenu}
          >
            Feedbacks
          </NavLink>
        </DesktopNav>

        <RightSection>
          <GetQuoteButton to="https://api.whatsapp.com/send/?phone=%2B94789126818&text=Hi%2Ccan%20i%20have%20more%20details%20about%20HMAVoyages%20tour%20packages&type=phone_number&app_absent=0">
            Contact
          </GetQuoteButton>

          <div style={{ padding: "8px 16px", display: "flex", justifyContent: "flex-end" }}>
            <GoogleTranslateSwitch />
          </div>

          <MenuButton onClick={toggleMenu}>
            <MenuIcon isOpen={isMenuOpen} />
          </MenuButton>
        </RightSection>

        <MobileNav isOpen={isMenuOpen}>
          <NavLink
            to="/"
            className={location.pathname === '/' ? 'active' : ''}
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/tours"
            className={location.pathname === '/tours' ? 'active' : ''}
            onClick={closeMenu}
          >
            Tour Packages
          </NavLink>
          <NavLink
            to="/gallery"
            className={location.pathname === '/gallery' ? 'active' : ''}
            onClick={closeMenu}
          >
            Gallery
          </NavLink>
          <NavLink
            to="/feedbacks"
            className={location.pathname === '/feedbacks' ? 'active' : ''}
            onClick={closeMenu}
          >
            Feedbacks
          </NavLink>
          <MobileGetQuoteButton to="https://api.whatsapp.com/send/?phone=%2B94789126818&text=Hi%2Ccan%20i%20have%20more%20details%20about%20HMAVoyages%20tour%20packages&type=phone_number&app_absent=0" onClick={closeMenu}>
            Contact
          </MobileGetQuoteButton>

          <div style={{ padding: "8px 16px", display: "flex", justifyContent: "flex-end" }}>
            <GoogleTranslateSwitch />
          </div>
        </MobileNav>
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header; 