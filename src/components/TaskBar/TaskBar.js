import React from 'react';
import styled from 'styled-components';

const TaskBar = () => {
  return (
    <Container>
      <StartButton>Start</StartButton>
      <Time>CLOCK</Time>
    </Container>
  );
};

export default TaskBar;

const Container = styled.div`
  margin-top: auto;
  display: flex;
  width: 100%;
  height: 48px;
  border: dashed;
`;

const StartButton = styled.button`
  width: 100px;
  border: none;
  height: 48px;
  color: black;
  font-size: 20px;
  border: dashed;
`;

const Time = styled.div`
  margin-left: auto;
  color: black;
  border: dashed red;
  width: 100px;
`;
