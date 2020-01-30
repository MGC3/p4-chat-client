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
  background: linear-gradient(
      to bottom,
      ${props => props.theme.gradientBlue.primary} 0%,
      ${props => props.theme.gradientBlue.secondary} 9%,
      ${props => props.theme.gradientBlue.primary} 18%,
      ${props => props.theme.gradientBlue.primary} 92%,
      ${props => props.theme.gradientBlue.black} 100%
    )
    center/cover no-repeat;
`;

const StartButton = styled.button`
  width: 100px;
  border: none;
  height: 48px;
  color: ${props => props.theme.gradientBlue.white};
  font-size: 20px;
  background: linear-gradient(
      to bottom,
      #91c08e 0%,
      #489e49 9%,
      #91c08e 18%,
      #489e49 92%,
      #333 100%
    )
    center/cover no-repeat;
`;

const Time = styled.div`
  margin-left: auto;
  color: black;
  border: dashed red;
  width: 100px;
`;
