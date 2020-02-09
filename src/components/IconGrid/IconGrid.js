import React from 'react';
import styled from 'styled-components';

const IconGrid = () => {
  return (
    <Container>
      <h1>IconGrid Component</h1>
    </Container>
  );
};

export default IconGrid;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  border: dashed red;
  position: absolute;
  z-index: 100;
`;
