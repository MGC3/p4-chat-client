import React from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import { Link } from 'react-router-dom';

const ChatAppContainer = ({ children, user }) => {
  return (
    <Draggable handle=".chat-app-drag" defaultPosition={{ x: 850, y: 60 }}>
      <Container>
        <TitleBarContainer className="chat-app-drag">
          <Icon>X</Icon>
          <TitleText>Instant Messenger</TitleText>
          {user && user.token ? (
            <StyledLink to="/sign-out">
              <CloseIcon>X</CloseIcon>
            </StyledLink>
          ) : (
            <StyledLink to="/">
              <CloseIcon>X</CloseIcon>
            </StyledLink>
          )}
        </TitleBarContainer>
        {children}
        <IconGroup>
          <TestIcon>
            <TestImage />
            <TestText>Setup</TestText>
          </TestIcon>
          <TestIcon>
            <TestImage />
            <TestText>Setup</TestText>
          </TestIcon>
          <TestIcon>
            <TestImage />
            <TestText>Setup</TestText>
          </TestIcon>
          <TestIcon>
            <TestImage />
            <TestText>Setup</TestText>
          </TestIcon>
        </IconGroup>
      </Container>
    </Draggable>
  );
};

export default ChatAppContainer;

const Container = styled.div`
  width: 264px;
  height: 550px;
  border: solid ${props => props.theme.blue};
  background: ${props => props.theme.grey};
`;

/* TODO: abstract to common/shared components */
const TitleBarContainer = styled.div`
  width: 100%;
  height: 32px;
  /* gradient attribution to codepen: https://codepen.io/brundolf/pen/wzrWdy */
  background: linear-gradient(
      to bottom,
      ${props => props.theme.gradientBlue.primary} 0%,
      ${props => props.theme.gradientBlue.secondary} 9%,
      ${props => props.theme.gradientBlue.primary} 18%,
      ${props => props.theme.gradientBlue.primary} 92%,
      ${props => props.theme.gradientBlue.black} 100%
    )
    center/cover no-repeat;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  align-items: center;
`;

const TitleText = styled.p`
  color: black;
  /* TODO: abstract font into main css typography */
  font-family: 'Tahoma';
`;

const CloseIcon = styled.button`
  margin-left: auto;
  /* test styles delete */
  height: 100%;
  width: 32px;
  color: ${props => props.theme.white};
  background: linear-gradient(
      to bottom,
      #df4b1d 0%,
      #e67053 9%,
      #df4b1d 18%,
      #e67053 92%,
      #333 100%
    )
    center/cover no-repeat;
`;

const Icon = styled.div`
  /* test styles delete */
  border: dashed pink;
  height: 100%;
  width: 32px;
  margin-right: 32px;
`;

const IconGroup = styled.div`
  width: 264px;
  height: 72px;
  border: dashed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
`;

const StyledLink = styled(Link)`
  margin-left: auto;
`;

const TestIcon = styled.div`
  width: 72px;
  height: 72px;
  border: dashed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TestImage = styled.img`
  width: 40px;
  height: 40px;
  margin: 0;
  border: dashed red;
`;

const TestText = styled.p`
  color: black;
  margin: 0;
  padding: 0;
`;
