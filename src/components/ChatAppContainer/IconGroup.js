import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const IconGroup = ({ user }) => (
  <Container>
    <TestIcon>
      <TestImage />
      <TestText></TestText>
    </TestIcon>
    <TestIcon>
      <TestImage />
      <TestText></TestText>
    </TestIcon>
    <TestIcon>
      <TestImage />
      <TestText></TestText>
    </TestIcon>
    {user ? (
      <TestIcon>
        <TestImage />
        <TestText>
          <Link to="/change-password">
            Change <br />
            Pw
          </Link>
        </TestText>
      </TestIcon>
    ) : (
      <TestIcon>
        <TestImage />
        <TestText></TestText>
      </TestIcon>
    )}
  </Container>
);

export default IconGroup;

const Container = styled.div`
  width: 100%;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
`;

const TestIcon = styled.div`
  width: 72px;
  height: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TestImage = styled.div`
  width: 40px;
  height: 40px;
  margin: 0;
`;

const TestText = styled.p`
  color: black;
  margin: 0;
  padding: 0;
`;
