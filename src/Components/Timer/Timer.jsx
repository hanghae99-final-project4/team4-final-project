import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Timer = ({
  margin,
  leave,
  setLeave,
  addModal,
  setAddModal,
  timereset,
  setTimeReset,
}) => {
  const [min, setMin] = useState(3);
  const [sec, setSec] = useState(0);
  const [add, setAdd] = useState(false);

  const timerId = useRef(null);
  const time = useRef(180);

  const addTimeHandler = () => {
    setAddModal(!addModal);
  };

  useEffect(() => {
    timerId.current = setInterval(() => {
      setMin(String(parseInt(time.current / 60)).padStart(2, '0'));
      setSec(String(time.current % 60).padStart(2, '0'));
      time.current -= 1;
    }, 1000);

    return () => clearInterval(timerId.current);
  }, []);

  useEffect(() => {
    if (time.current <= 0) {
      setLeave(!leave);
      clearInterval(timerId.current);
    }
  }, [sec]);
  useEffect(() => {
    if (timereset) {
      time.current += 180;
      setTimeReset(false);
    }
  }, [timereset]);

  return (
    <TimerBox className={time.current <= 30 ? 'red' : ''}>
      {min}:{sec}
      <button onClick={addTimeHandler}>추가</button>
    </TimerBox>
  );
};

export default Timer;

const TimerBox = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  color: #8fb398;
  margin-left: 80px;
  &.red {
    color: #fa3a45;
    position: relative;
    animation: bounce 1s infinite linear;

    @keyframes bounce {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }
  }
`;
