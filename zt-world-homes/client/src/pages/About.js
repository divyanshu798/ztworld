import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  min-height: calc(100vh - 160px);
  background: linear-gradient(135deg, var(--praise-warm) 0%, var(--praise-cream) 100%);
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, var(--praise-amber) 0%, var(--praise-orange) 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>') repeat;
    animation: float 20s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 0;
  opacity: 0.9;
`;

const ContentSection = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-bottom: 4rem;
`;

const ContentCard = styled.div`
  background: linear-gradient(135deg, var(--white) 0%, var(--praise-warm) 100%);
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid var(--praise-light);
  box-shadow: 0 8px 15px rgba(217, 119, 6, 0.1), 0 4px 6px rgba(217, 119, 6, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 25px rgba(217, 119, 6, 0.15), 0 8px 10px rgba(217, 119, 6, 0.1);
  }
`;

const CardIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  text-align: center;
  filter: drop-shadow(0 2px 4px rgba(217, 119, 6, 0.3));
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--praise-amber) 0%, var(--praise-orange) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  font-weight: 700;
`;

const CardDescription = styled.p`
  line-height: 1.6;
  color: var(--text-secondary);
  text-align: center;
`;

const StorySection = styled.div`
  background: linear-gradient(135deg, var(--white) 0%, var(--praise-warm) 100%);
  padding: 3rem;
  border-radius: 1rem;
  border: 1px solid var(--praise-light);
  box-shadow: 0 8px 15px rgba(217, 119, 6, 0.1), 0 4px 6px rgba(217, 119, 6, 0.05);
  margin-bottom: 3rem;
`;

const StoryTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, var(--praise-amber) 0%, var(--praise-orange) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const StoryText = styled.p`
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  text-align: justify;
`;

const StatsSection = styled.div`
  background: linear-gradient(135deg, var(--white) 0%, var(--praise-warm) 100%);
  padding: 3rem;
  border-radius: 1rem;
  border: 1px solid var(--praise-light);
  box-shadow: 0 8px 15px rgba(217, 119, 6, 0.1), 0 4px 6px rgba(217, 119, 6, 0.05);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
`;

const StatItem = styled.div`
  padding: 1rem;
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--praise-amber) 0%, var(--praise-orange) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(217, 119, 6, 0.1);
`;

const StatLabel = styled.div`
  font-size: 1.125rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
`;

const About = () => {
  return (
    <AboutContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>About Z&T World Homes</HeroTitle>
          <HeroSubtitle>
            Your trusted partner in finding the perfect home away from home
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <StorySection>
          <StoryTitle>Our Story</StoryTitle>
          <StoryText>
            Founded with a vision to revolutionize the hospitality industry, Z&T World Homes 
            has been connecting travelers with exceptional accommodation experiences since our inception. 
            We believe that where you stay can transform your entire journey, and we're dedicated to 
            providing homes that offer comfort, convenience, and authentic local experiences.
          </StoryText>
          <StoryText>
            What started as a small collection of carefully curated properties has grown into a 
            comprehensive platform featuring diverse accommodations across India. From bustling city 
            apartments to serene countryside retreats, each property in our portfolio is handpicked 
            and maintained to meet our high standards of quality and hospitality.
          </StoryText>
          <StoryText>
            Our commitment goes beyond just providing a place to stay. We strive to create memorable 
            experiences that connect our guests with local communities, cultures, and traditions. 
            Every booking through Z&T World Homes is a step towards discovering the true essence of 
            your destination.
          </StoryText>
        </StorySection>

        <ContentGrid>
          <ContentCard>
            <CardIcon>🏠</CardIcon>
            <CardTitle>Quality Assurance</CardTitle>
            <CardDescription>
              Every property is personally inspected and verified to ensure it meets our 
              strict standards for cleanliness, safety, and comfort. We guarantee a 
              quality experience in every home.
            </CardDescription>
          </ContentCard>

          <ContentCard>
            <CardIcon>🌟</CardIcon>
            <CardTitle>Exceptional Service</CardTitle>
            <CardDescription>
              Our dedicated support team is available 24/7 to assist you throughout your 
              journey. From booking to check-out, we're here to ensure your stay is perfect.
            </CardDescription>
          </ContentCard>

          <ContentCard>
            <CardIcon>💰</CardIcon>
            <CardTitle>Best Value</CardTitle>
            <CardDescription>
              We offer competitive pricing without compromising on quality. Enjoy premium 
              accommodations at affordable rates with transparent pricing and no hidden fees.
            </CardDescription>
          </ContentCard>

          <ContentCard>
            <CardIcon>🔒</CardIcon>
            <CardTitle>Secure Booking</CardTitle>
            <CardDescription>
              Your security is our priority. We use advanced encryption and secure payment 
              systems to protect your personal information and ensure safe transactions.
            </CardDescription>
          </ContentCard>

          <ContentCard>
            <CardIcon>🌍</CardIcon>
            <CardTitle>Local Experience</CardTitle>
            <CardDescription>
              Our properties are located in authentic neighborhoods, giving you the opportunity 
              to experience destinations like a local while enjoying the comforts of home.
            </CardDescription>
          </ContentCard>

          <ContentCard>
            <CardIcon>📱</CardIcon>
            <CardTitle>Easy Booking</CardTitle>
            <CardDescription>
              Our user-friendly platform makes finding and booking your perfect accommodation 
              simple and hassle-free. Browse, compare, and book in just a few clicks.
            </CardDescription>
          </ContentCard>
        </ContentGrid>

        <StatsSection>
          <StoryTitle style={{ marginBottom: '3rem' }}>Our Impact</StoryTitle>
          <StatsGrid>
            <StatItem>
              <StatNumber>500+</StatNumber>
              <StatLabel>Properties</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>10,000+</StatNumber>
              <StatLabel>Happy Guests</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>50+</StatNumber>
              <StatLabel>Cities</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>98%</StatNumber>
              <StatLabel>Satisfaction Rate</StatLabel>
            </StatItem>
          </StatsGrid>
        </StatsSection>
      </ContentSection>
    </AboutContainer>
  );
};

export default About;