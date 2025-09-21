import React, { useState } from 'react';
import styled from 'styled-components';

const GuideContainer = styled.div`
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
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80');
    background-size: cover;
    background-position: center;
    opacity: 0.1;
  }
`;

const PageTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 20px;
  font-weight: 300;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.3rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const GuideCategories = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 80px;
`;

const CategoryCard = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: all 0.3s;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 50px rgba(0,0,0,0.15);
  }
`;

const CategoryImage = styled.div`
  height: 200px;
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
    background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6));
  }
`;

const CategoryTitle = styled.h3`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  z-index: 1;
`;

const CategoryContent = styled.div`
  padding: 25px;
`;

const CategoryDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const CategoryButton = styled.button`
  background: #ff6b35;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
  
  &:hover {
    background: #e55a2b;
  }
`;

const DetailedGuides = styled.div`
  margin-top: 80px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 60px;
  color: #333;
`;

const GuidesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
`;

const GuideCard = styled.article`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  }
`;

const GuideImage = styled.div`
  height: 220px;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const GuideCategory = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  background: #ff6b35;
  color: white;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const GuideContent = styled.div`
  padding: 25px;
`;

const GuideTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: #333;
  font-weight: 600;
  line-height: 1.4;
`;

const GuideExcerpt = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 0.95rem;
`;

const GuideFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #eee;
`;

const ReadTime = styled.span`
  color: #999;
  font-size: 0.85rem;
`;

const ReadMoreButton = styled.button`
  background: none;
  border: none;
  color: #ff6b35;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.3s;
  
  &:hover {
    color: #e55a2b;
  }
`;

const GuidePage = () => {
  const categories = [
    {
      title: "Planning Your Trip",
      description: "Essential information for planning your perfect Sri Lankan adventure, including best times to visit, weather patterns, and itinerary suggestions.",
      image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Culture & Traditions",
      description: "Discover the rich cultural heritage of Sri Lanka, from ancient temples and festivals to local customs and traditional arts.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Food & Cuisine",
      description: "Explore the flavors of Sri Lankan cuisine, from spicy curries and fresh seafood to tropical fruits and traditional sweets.",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Wildlife & Nature",
      description: "Your guide to Sri Lanka's incredible biodiversity, national parks, and the best spots for wildlife encounters.",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Transportation",
      description: "Navigate Sri Lanka with ease using our comprehensive guide to trains, buses, tuk-tuks, and other transportation options.",
      image: "https://images.unsplash.com/photo-1544306094-e2c49e7c7b9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Accommodation",
      description: "From luxury resorts to budget guesthouses, find the perfect place to stay during your Sri Lankan journey.",
      image: "https://images.unsplash.com/photo-1580487625259-4bb1db1ff4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const guides = [
    {
      title: "Best Time to Visit Sri Lanka: Complete Weather Guide",
      excerpt: "Plan your trip with our comprehensive guide to Sri Lanka's climate, monsoon seasons, and regional weather patterns. Discover the perfect time for your activities.",
      category: "Planning",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Complete Guide to Sri Lankan Cuisine",
      excerpt: "From fiery curries to sweet treats, explore the diverse flavors of Sri Lankan food. Learn about must-try dishes, local ingredients, and dining etiquette.",
      category: "Food",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Wildlife Safari Guide: Where to Spot Big Five",
      excerpt: "Maximize your wildlife encounters with our expert guide to Sri Lanka's national parks, best safari times, and photography tips.",
      category: "Wildlife",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Cultural Etiquette: Do's and Don'ts in Sri Lanka",
      excerpt: "Respect local customs and traditions with our guide to Sri Lankan etiquette, temple visits, dress codes, and social norms.",
      category: "Culture",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Getting Around Sri Lanka: Transportation Guide",
      excerpt: "Navigate like a local with our comprehensive guide to trains, buses, tuk-tuks, and rental cars. Includes prices, routes, and booking tips.",
      category: "Transport",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1544306094-e2c49e7c7b9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Where to Stay in Sri Lanka: Accommodation Guide",
      excerpt: "Find your perfect accommodation from beach resorts and mountain retreats to budget guesthouses and homestays.",
      category: "Accommodation",
      readTime: "11 min read",
      image: "https://images.unsplash.com/photo-1580487625259-4bb1db1ff4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Festival Calendar: Sri Lankan Celebrations",
      excerpt: "Experience Sri Lanka's vibrant festivals throughout the year. From Vesak to Kandy Esala Perahera, plan your visit around these spectacular events.",
      category: "Culture",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Health & Safety Tips for Sri Lanka Travel",
      excerpt: "Stay safe and healthy with our essential guide covering vaccinations, common health concerns, emergency contacts, and travel insurance.",
      category: "Planning",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Packing Guide for Sri Lanka: What to Bring",
      excerpt: "Pack smart for your Sri Lankan adventure with our comprehensive packing list covering clothing, gear, and essential items for every season.",
      category: "Planning",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <GuideContainer>
      <Container>
        <PageHeader>
          <PageTitle>Sri Lanka Travel Guide</PageTitle>
          <PageSubtitle>
            Your comprehensive guide to exploring the Pearl of the Indian Ocean. 
            Expert tips, cultural insights, and practical advice for an unforgettable journey.
          </PageSubtitle>
        </PageHeader>

        <GuideCategories>
          {categories.map((category, index) => (
            <CategoryCard key={index}>
              <CategoryImage bg={category.image}>
                <CategoryTitle>{category.title}</CategoryTitle>
              </CategoryImage>
              <CategoryContent>
                <CategoryDescription>{category.description}</CategoryDescription>
                <CategoryButton>Explore Guides</CategoryButton>
              </CategoryContent>
            </CategoryCard>
          ))}
        </GuideCategories>

        <DetailedGuides>
          <SectionTitle>Featured Travel Guides</SectionTitle>
          
          <GuidesGrid>
            {guides.map((guide, index) => (
              <GuideCard key={index}>
                <GuideImage bg={guide.image}>
                  <GuideCategory>{guide.category}</GuideCategory>
                </GuideImage>
                <GuideContent>
                  <GuideTitle>{guide.title}</GuideTitle>
                  <GuideExcerpt>{guide.excerpt}</GuideExcerpt>
                  <GuideFooter>
                    <ReadTime>{guide.readTime}</ReadTime>
                    <ReadMoreButton>Read More →</ReadMoreButton>
                  </GuideFooter>
                </GuideContent>
              </GuideCard>
            ))}
          </GuidesGrid>
        </DetailedGuides>
      </Container>
    </GuideContainer>
  );
};

export default GuidePage; 