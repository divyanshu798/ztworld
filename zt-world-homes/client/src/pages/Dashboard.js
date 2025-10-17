import React from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const WelcomeCard = styled.div`
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  color: white;
  padding: 2rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
`;

const WelcomeTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const WelcomeText = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <WelcomeCard>
        <WelcomeTitle>Welcome to Your Dashboard</WelcomeTitle>
        <WelcomeText>
          Manage your bookings, view your stay history, and explore more properties.
        </WelcomeText>
      </WelcomeCard>

      {/* TODO: Add booking history, upcoming stays, etc. */}
      <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray-500)' }}>
        <h3>Dashboard features coming soon...</h3>
        <p>Booking history, upcoming stays, and more!</p>
      </div>
    </DashboardContainer>
  );
};

export default Dashboard;
