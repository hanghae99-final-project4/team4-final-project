import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const AuthTimer = ({}) => {
  const [min, setMin] = useState(3);
  const [sec, setSec] = useState(0);
  const [add, setAdd] = useState(false);

  const timerId = useRef(null);
  const time = useRef(300);

  useEffect(() => {
    timerId.current = setInterval(() => {
      setMin(String(parseInt(time.current / 60)).padStart(2, '0'));
      setSec(String(time.current % 60).padStart(2, '0'));
      time.current -= 1;
    }, 1000);

    return () => clearInterval(timerId.current);
  }, []);

  return (
    <TimerBox>
      {min}:{sec}
    </TimerBox>
  );
};

export default AuthTimer;

const TimerBox = styled.div`
  margin-top: 25px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  display: flex;

  color: #fa3a45;
`;
const Time = styled.div`
  width: 39px;
  height: 17px;
  color: #8fb398;
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
