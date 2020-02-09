import React from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import { Link } from 'react-router-dom';
import IconGroup from './IconGroup';

const ChatAppContainer = ({ children, user }) => {
  return (
    <Draggable
      bounds="parent"
      handle=".chat-app-drag"
      defaultPosition={{ x: 850, y: 60 }}
    >
      <Container>
        <TitleBarContainer className="chat-app-drag">
          <Icon></Icon>
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
        <Wrapper>{children}</Wrapper>
        <IconGroup user={user} />
      </Container>
    </Draggable>
  );
};

export default ChatAppContainer;

const Container = styled.div`
  width: 264px;
  height: 550px;
  border: solid ${props => props.theme.XPblue};
  background: ${props => props.theme.grey};
  z-index: 200;
`;

const Wrapper = styled.div`
  padding: 8px;
  margin: 8px;
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
  color: ${props => props.theme.white};
  /* TODO: abstract font into main css typography */
  font-family: 'Tahoma';
  margin-bottom: 0;
  cursor: default;
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
  height: 100%;
  width: 32px;
  margin-right: 32px;
`;

const StyledLink = styled(Link)`
  margin-left: auto;
`;
