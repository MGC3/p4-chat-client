import React from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';

const ChatAppContainer = ({ children }) => {
  return (
    <Draggable handle=".chat-app-drag" defaultPosition={{ x: 850, y: 70 }}>
      <Container>
        <TitleBarContainer className="chat-app-drag">
          <Icon>X</Icon>
          <TitleText>Sign On</TitleText>
          <CloseIcon>X</CloseIcon>
        </TitleBarContainer>
        <h2>ChatApp Container</h2>
        {children}
      </Container>
    </Draggable>
  );
};

export default ChatAppContainer;

const Container = styled.div`
  width: 300px;
  height: 450px;
  border: dashed;
`;

const TitleBarContainer = styled.div`
  width: 100%;
  height: 32px;
  border: dashed;
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
  color: black;
`;

const Icon = styled.div`
  /* test styles delete */
  border: dashed pink;
  height: 100%;
  width: 32px;
  margin-right: 32px;
`;
