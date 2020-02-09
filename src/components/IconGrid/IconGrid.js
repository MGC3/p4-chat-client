import React from 'react';
import styled from 'styled-components';

const IconGrid = () => {
  return (
    <Container>
      <Icon>
        <StyledLink href="https://google.com" target="_blank">
          <Wrapper>
            <Image />
            <Text>Tic Tac Toe</Text>
          </Wrapper>
        </StyledLink>
      </Icon>
      <Icon>
        <StyledLink href="https://google.com" target="_blank">
          <Wrapper>
            <Image />
            <Text>Tic Tac Toe</Text>
          </Wrapper>
        </StyledLink>
      </Icon>
      <Icon>
        <StyledLink href="https://google.com" target="_blank">
          <Wrapper>
            <Image />
            <Text>Tic Tac Toe</Text>
          </Wrapper>
        </StyledLink>
      </Icon>
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled.a`
  &:hover {
    text-decoration: inherit;
  }
`;

const Icon = styled.div`
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.div`
  width: 64px;
  height: 64px;
  border: dashed pink;
`;

const Text = styled.p`
  margin: 0;
  color: ${props => props.theme.white};
`;
