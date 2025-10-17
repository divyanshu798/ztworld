import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
  min-height: calc(100vh - 160px);
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  color: white;
  padding: 6rem 2rem;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 1rem 2rem;
  background: ${props => props.variant === 'secondary' ? 'transparent' : 'white'};
  color: ${props => props.variant === 'secondary' ? 'white' : 'var(--primary-color)'};
  border: ${props => props.variant === 'secondary' ? '2px solid white' : 'none'};
  border-radius: 0.75rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    ${props => props.variant === 'secondary' ? 
      'background: white; color: var(--primary-color);' : 
      'background: var(--gray-50);'
    }
  }
`;

const FeaturesSection = styled.section`
  padding: 6rem 2rem;
  background: white;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--gray-800);
`;

const SectionSubtitle = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: var(--gray-600);
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  text-align: center;
  padding: 2rem;
  border-radius: 1rem;
  background: var(--gray-50);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--gray-800);
`;

const FeatureDescription = styled.p`
  color: var(--gray-600);
  line-height: 1.6;
`;

const StatsSection = styled.section`
  padding: 4rem 2rem;
  background: var(--primary-color);
  color: white;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const StatCard = styled.div``;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  opacity: 0.9;
`;

const Home = () => {
  const features = [
    {
      icon: '🏠',
      title: 'Premium Properties',
      description: 'Carefully selected guest houses with modern amenities and comfortable accommodations across multiple locations.'
    },
    {
      icon: '📅',
      title: 'Easy Booking',
      description: 'Simple and secure booking process with real-time availability and instant confirmation for your convenience.'
    },
    {
      icon: '💳',
      title: 'Secure Payments',
      description: 'Multiple payment options including cards, UPI, and net banking with secure payment processing via Razorpay.'
    },
    {
      icon: '🌟',
      title: 'Quality Service',
      description: 'Exceptional hospitality and customer service to ensure your stay is comfortable and memorable.'
    }
  ];

  const stats = [
    { number: '50+', label: 'Properties' },
    { number: '500+', label: 'Happy Guests' },
    { number: '10+', label: 'Cities' },
    { number: '4.8/5', label: 'Rating' }
  ];

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Welcome to Z&T World Homes</HeroTitle>
          <HeroSubtitle>
            Discover premium guest houses and book your perfect stay with ease. 
            Experience comfort, convenience, and exceptional hospitality.
          </HeroSubtitle>
          <CTAButtons>
            <CTAButton to="/properties">
              Explore Properties
            </CTAButton>
            <CTAButton to="/register" variant="secondary">
              Get Started
            </CTAButton>
          </CTAButtons>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <SectionTitle>Why Choose Us?</SectionTitle>
        <SectionSubtitle>
          We provide the best guest house booking experience with premium properties, 
          seamless booking, and exceptional service.
        </SectionSubtitle>
        
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </FeaturesSection>

      <StatsSection>
        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard key={index}>
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>
      </StatsSection>
    </HomeContainer>
  );
};

export default Home;
