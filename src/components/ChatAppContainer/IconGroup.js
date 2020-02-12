import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MdSettings } from 'react-icons/md';

const IconGroup = ({ user }) => (
  <Container>
    {user ? (
      <Icon>
        <Link to="/change-password">
          <Image>
            <MdSettings size="24px" />
          </Image>
          <Text>Settings</Text>
        </Link>
      </Icon>
    ) : null}
  </Container>
);

export default IconGroup;

const Container = styled.div`
  width: 100%;
  height: 72px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
`;

const Icon = styled.div`
  width: 72px;
  height: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.3);
`;

const Image = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  text-align: center;
`;

const Text = styled.p`
  margin: 0;
  padding: 0;
`;
