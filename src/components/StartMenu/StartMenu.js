import React from 'react';
import styled from 'styled-components';

const StartMenu = () => {
  return (
    <Container>
      <h1>Start Menu Component</h1>
    </Container>
  );
};

export default StartMenu;

const Container = styled.div`
  margin: auto 0 48px 0;
  display: flex;
  width: 400px;
  height: 500px;
  position: absolute;
  bottom: 0;
  background: ${props => props.theme.white};
  border-radius: 0 8px 8px 0;
`;
