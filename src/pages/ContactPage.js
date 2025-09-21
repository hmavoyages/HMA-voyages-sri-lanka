import React, { useState } from 'react';
import styled from 'styled-components';

const ContactContainer = styled.div`
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

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ContactForm = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
`;

const FormTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 30px;
  color: #333;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
`;

const Input = styled.input`
  padding: 15px;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #ff6b35;
  }
`;

const TextArea = styled.textarea`
  padding: 15px;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #ff6b35;
  }
`;

const Select = styled.select`
  padding: 15px;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  font-size: 1rem;
  background: white;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #ff6b35;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #ff6b35 0%, #e55a2b 100%);
  color: white;
  border: none;
  padding: 18px 30px;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const InfoCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
`;

const InfoTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
  font-weight: 600;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
`;

const InfoIcon = styled.div`
  font-size: 1.5rem;
  margin-top: 2px;
`;

const InfoDetails = styled.div`
  flex: 1;
`;

const InfoLabel = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
`;

const InfoText = styled.div`
  color: #666;
  line-height: 1.5;
`;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelDates: '',
    destination: '',
    travelers: '',
    budget: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your inquiry! We\'ll get back to you within 24 hours.');
    // Handle form submission here
  };

  return (
    <ContactContainer>
      <Container>
        <PageHeader>
          <PageTitle>Get In Touch</PageTitle>
          <PageSubtitle>
            Ready to start planning your dream Sri Lankan adventure? 
            Contact our travel experts for personalized assistance.
          </PageSubtitle>
        </PageHeader>

        <ContactContent>
          <ContactForm>
            <FormTitle>Request a Custom Quote</FormTitle>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="travelDates">Preferred Travel Dates</Label>
                <Input
                  type="text"
                  id="travelDates"
                  name="travelDates"
                  placeholder="e.g., March 2024"
                  value={formData.travelDates}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="travelers">Number of Travelers</Label>
                <Select
                  id="travelers"
                  name="travelers"
                  value={formData.travelers}
                  onChange={handleChange}
                >
                  <option value="">Select...</option>
                  <option value="1">1 person</option>
                  <option value="2">2 people</option>
                  <option value="3-4">3-4 people</option>
                  <option value="5-8">5-8 people</option>
                  <option value="9+">9+ people</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="budget">Budget Range (per person)</Label>
                <Select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                >
                  <option value="">Select...</option>
                  <option value="under-1000">Under €1,000</option>
                  <option value="1000-2000">€1,000 - €2,000</option>
                  <option value="2000-3000">€2,000 - €3,000</option>
                  <option value="3000+">€3,000+</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="message">Tell us about your dream trip *</Label>
                <TextArea
                  id="message"
                  name="message"
                  placeholder="What would you like to experience in Sri Lanka? Any specific interests, activities, or requirements?"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <SubmitButton type="submit">Send Inquiry</SubmitButton>
            </Form>
          </ContactForm>

          <ContactInfo>
            <InfoCard>
              <InfoTitle>Contact Information</InfoTitle>
              
              <InfoItem>
                <InfoIcon>📍</InfoIcon>
                <InfoDetails>
                  <InfoLabel>Kandy Office</InfoLabel>
                  <InfoText>
                    45 Kandy Road<br />
                    Kandy, Sri Lanka
                  </InfoText>
                </InfoDetails>
              </InfoItem>

              <InfoItem>
                <InfoIcon>📞</InfoIcon>
                <InfoDetails>
                  <InfoLabel>Phone</InfoLabel>
                  <InfoText>+94 81 223 3456</InfoText>
                </InfoDetails>
              </InfoItem>

              <InfoItem>
                <InfoIcon>✉️</InfoIcon>
                <InfoDetails>
                  <InfoLabel>Email</InfoLabel>
                  <InfoText>contact@maiglobe.com</InfoText>
                </InfoDetails>
              </InfoItem>

              <InfoItem>
                <InfoIcon>🇱🇰</InfoIcon>
                <InfoDetails>
                  <InfoLabel>Sri Lanka Office</InfoLabel>
                  <InfoText>
                    Local partners in<br />
                    Colombo & Kandy
                  </InfoText>
                </InfoDetails>
              </InfoItem>
            </InfoCard>

            <InfoCard>
              <InfoTitle>Office Hours</InfoTitle>
              
              <InfoItem>
                <InfoIcon>🕒</InfoIcon>
                <InfoDetails>
                  <InfoLabel>Monday - Friday</InfoLabel>
                  <InfoText>9:00 AM - 6:00 PM (CET)</InfoText>
                </InfoDetails>
              </InfoItem>

              <InfoItem>
                <InfoIcon>📱</InfoIcon>
                <InfoDetails>
                  <InfoLabel>Emergency Support</InfoLabel>
                  <InfoText>24/7 during your trip</InfoText>
                </InfoDetails>
              </InfoItem>

              <InfoItem>
                <InfoIcon>💬</InfoIcon>
                <InfoDetails>
                  <InfoLabel>Response Time</InfoLabel>
                  <InfoText>Within 24 hours</InfoText>
                </InfoDetails>
              </InfoItem>
            </InfoCard>
          </ContactInfo>
        </ContactContent>
      </Container>
    </ContactContainer>
  );
};

export default ContactPage; 