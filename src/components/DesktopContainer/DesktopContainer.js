import React from 'react';
import styled from 'styled-components';

export default function DesktopContainer({ children }) {
  return (
    <Container>
      <h1>DesktopContainer Component</h1>
      {children}
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  border: dashed;
  display: flex;
  flex-direction: column;
`;
