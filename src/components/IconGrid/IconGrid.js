import React from 'react';
import styled from 'styled-components';
import ttt from '../../images/tic-tac-toe-300x300.png';
// pixel cat image attrib to:
// https://www.pngkey.com/detail/u2t4t4o0o0w7u2o0_orange-cat-cat-pixel-art/
import cat from '../../images/pixel-cat-300x300.png';
import petlee from '../../images/petlee-300x300.png';

const IconGrid = () => {
  return (
    <Container>
      <Icon>
        <StyledLink
          href="https://mgc3.github.io/p1-tic-tac-toe-client/"
          target="_blank"
        >
          <Wrapper>
            <Image background={ttt} />
            <Text>Tic Tac Toe</Text>
          </Wrapper>
        </StyledLink>
      </Icon>
      <Icon>
        <StyledLink
          href="https://mgc3.github.io/p2-pet-client/"
          target="_blank"
        >
          <Wrapper>
            <Image background={petlee} />
            <Text>Petly - Pet Weight Management App</Text>
          </Wrapper>
        </StyledLink>
      </Icon>
      <Icon>
        <StyledLink
          href="https://vigilant-hugle-84a7b7.netlify.com/"
          target="_blank"
        >
          <Wrapper>
            <Image background={cat} />
            <Text>Orange Cat or Not Orange Cat</Text>
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
  min-height: 120px;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.div`
  width: 64px;
  height: 64px;
  margin: 0;
  background-size: cover;
  background-image: ${props => `url(${props.background}`});
`;

const Text = styled.p`
  margin: 0;
  text-align: center;
  font-size: 14px;
  color: ${props => props.theme.white};
`;
