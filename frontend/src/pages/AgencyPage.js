import React from 'react';
import styled from 'styled-components';
import Team from '../components/Team';
import Advantages from '../components/Advantages';

const AgencyContainer = styled.div`
  margin-top: 120px;
  min-height: 100vh;
`;

const AgencyPage = () => {
  return (
    <AgencyContainer>
      <Team />
      <Advantages />
    </AgencyContainer>
  );
};

export default AgencyPage; 