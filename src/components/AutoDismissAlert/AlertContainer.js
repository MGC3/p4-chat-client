import React from 'react';
import styled from 'styled-components';

const AlertContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

export default AlertContainer;

const Container = styled.div`
  height: 80px;
  width: 30rem;
  display: flex;
  left: 0;
  right: 0;
  margin: auto;
  position: absolute;
`;
