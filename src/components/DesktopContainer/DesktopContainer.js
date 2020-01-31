import React from 'react';
import styled from 'styled-components';
import bliss from '../../images/bliss-1440x900.jpg';

export default function DesktopContainer({ children }) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-image: url(${bliss});
  background-size: 100vw 100vh;
`;
