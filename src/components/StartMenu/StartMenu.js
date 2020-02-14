import React from 'react';
import styled from 'styled-components';

const StartMenu = () => {
  return (
    <Container>
      <LeftPane>
        <StyledLink href="https://michaelgchun.com" target="_blank">
          <MenuItem>My Portfolio</MenuItem>
        </StyledLink>
        <StyledLink
          href="https://www.michaelgchun.com/static/Michael-Chun-Resume-7d6d1dadf23409b832c24770e3dfc8a4.pdf"
          target="_blank"
        >
          <MenuItem>My Resume</MenuItem>
        </StyledLink>
      </LeftPane>
      <RightPane />
    </Container>
  );
};

export default StartMenu;

// some start menu styles borrowed from:
// https://codepen.io/brundolf/full/wzrWdy
const Container = styled.div`
  margin: auto 0 48px 0;
  display: flex;
  width: 400px;
  height: 500px;
  position: absolute;
  bottom: 0;
  border: 1px solid ${props => props.theme.blue};
  border-radius: 0 8px 8px 0;
  z-index: 300;
`;

const LeftPane = styled.div`
  padding-top: 32px;
  width: 50%;
  background: ${props => props.theme.white};
  border-right: 1px solid ${props => props.theme.blue};
`;

const RightPane = styled.div`
  width: 50%;
  background: ${props => props.theme.lightBlue};
  border-radius: 0 8px 8px 0;
`;

const MenuItem = styled.div`
  height: 48px;
  width: 180px;
  margin: 0 auto;
  padding-right: 40px;
  font-family: Tahoma, sans-serif;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &:hover {
    background: #245edb;
    cursor: pointer;
    color: ${props => props.theme.white};
  }
`;

const StyledLink = styled.a`
  color: inherit;
`;
