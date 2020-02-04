import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';

const Clock = () => {
  const [time, setTime] = useState(moment().format('LT'));

  useEffect(() => {
    let interval = setInterval(() => {
      setTime(moment().format('LT'));
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <Container>{time}</Container>;
};

export default Clock;

const Container = styled.div`
  margin-left: auto;
  color: ${props => props.theme.white};
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  cursor: default;
`;
