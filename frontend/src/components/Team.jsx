import React from 'react';
import styled from 'styled-components';

const TeamContainer = styled.section`
  padding: 80px 0;
  background: #f8f9fa;
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

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
`;

const TeamCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0,0,0,0.15);
  }
`;

const TeamPhoto = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center;
  margin: 0 auto 20px;
  border: 4px solid #ff6b35;
`;

const TeamName = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 8px;
  color: #333;
  font-weight: 600;
`;

const TeamRole = styled.p`
  color: #ff6b35;
  font-weight: 500;
  margin-bottom: 15px;
  font-size: 1rem;
`;

const TeamDescription = styled.p`
  color: #666;
  line-height: 1.6;
  font-size: 0.95rem;
  margin-bottom: 20px;
`;

const TeamLanguages = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const Language = styled.span`
  background: #e9ecef;
  color: #666;
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 0.8rem;
`;

const Team = () => {
  const teamMembers = [
    {
      name: "Sasha Dubois",
      role: "Founder & Travel Designer",
      description: "With over 15 years in luxury travel, Sasha specializes in creating extraordinary journeys throughout Asia.",
      languages: ["French", "English", "Spanish"],
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Kumara Bandara",
      role: "Local Expert & Guide",
      description: "Born in Kandy, Kumara is our Sri Lankan partner with deep knowledge of hidden gems and local culture.",
      languages: ["Sinhala", "Tamil", "English"],
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Marie Laurent",
      role: "Travel Coordinator",
      description: "Marie ensures every detail of your journey is perfect, from accommodation to transportation.",
      languages: ["French", "English", "Italian"],
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Arjuna Silva",
      role: "Wildlife & Nature Specialist",
      description: "Expert in Sri Lankan wildlife with 20+ years guiding safaris and nature expeditions.",
      languages: ["Sinhala", "English", "German"],
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <TeamContainer id="team">
      <Container>
        <SectionTitle>Meet Our Expert Team</SectionTitle>
        <SectionSubtitle>
          Our passionate team of travel experts and local guides are dedicated to creating your perfect Sri Lankan adventure.
        </SectionSubtitle>
        
        <TeamGrid>
          {teamMembers.map((member, index) => (
            <TeamCard key={index}>
              <TeamPhoto bg={member.photo} />
              <TeamName>{member.name}</TeamName>
              <TeamRole>{member.role}</TeamRole>
              <TeamDescription>{member.description}</TeamDescription>
              <TeamLanguages>
                {member.languages.map((language, idx) => (
                  <Language key={idx}>{language}</Language>
                ))}
              </TeamLanguages>
            </TeamCard>
          ))}
        </TeamGrid>
      </Container>
    </TeamContainer>
  );
};

export default Team; 