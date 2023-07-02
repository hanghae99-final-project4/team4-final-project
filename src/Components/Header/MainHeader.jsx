import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import transferlogo from '../../Assets/Main/transferlogo.svg';
import alarmimg from '../../Assets/Main/alarm.svg';
import disalarmimg from '../../Assets/Main/disalarm.svg';
import { trainApi } from '../../apis/Instance';
import MymemoizedAlarm from '../../MyTools/Hooks/MymemoizedAlarm';
import { useRecoilState } from 'recoil';
import {
  useAlarmState,
  useCursorState,
  useStartState,
} from '../../Recoil/userList';
import { useMymemoizedAlarm } from '../../MyTools/Hooks/useMyMemoized';

const TransferHeader = ({ msg, margin }) => {
  const target = useRef(null);
  const [alarm, setAlarm] = useRecoilState(useAlarmState);

  const [isalarm, setIsAlarm] = useState(false);

  const [next, setNext] = useRecoilState(useCursorState);
  const [isLoaded, setIsLoaded] = useState(false);
  // 무한 스크롤 타겟
  const getMoreItem = async () => {
    // 데이터를 받아오도록 true 로 변경
    setIsLoaded(true);
  };
  // 관찰자

  useEffect(() => {
    let observer;

    const onIntersect = async ([entry], observer) => {
      if (entry.isIntersecting && !isLoaded) {
        observer.unobserve(entry.target);
        await getMoreItem();

        observer.observe(entry.target);
      }
    };
    if (target.current) {
      observer = new IntersectionObserver(
        onIntersect,

        { threshold: 0 }
      );
      observer.observe(target?.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [isLoaded]);

  //isLoaded 가 변할때 실행
  useEffect(() => {
    if (isLoaded) {
      trainApi.getalarmcursor(next).then((res) => {
        if (!res.data.error) {
          setNext(res.data?.nextcursor);
          setAlarm((alarm) => alarm?.concat(res.data?.result));
          setIsLoaded(false);
        }
      });
    }
  }, [isLoaded]);

  //알람 핸들러
  const fetch = useMymemoizedAlarm();
  const alarmHandler = async () => {
    const userId = localStorage.getItem('userId');

    setIsAlarm(!isalarm);
    const { data } = await trainApi.patchalarm(userId);
    if (data) {
      setIsLoaded(true);
      fetch();
    }
  };

  return (
    <div>
      {' '}
      <MainHeader>
        <MymemoizedAlarm />
        <PointerBox>
          <img src={transferlogo} alt="logo" />
        </PointerBox>
        <MessageBox margin={margin}>{msg}</MessageBox>
        <Alarm margin="12.875rem">
          <img
            onClick={alarmHandler}
            src={
              alarm?.filter((item) => item?.check === false)?.length !== 0
                ? alarmimg
                : disalarmimg
            }
            alt="alarm"
          />
          {isalarm && (
            <AlarmBox>
              {alarm?.map((item, i) => (
                <>
                  <div>
                    <span>{item.description}</span>
                  </div>
                </>
              ))}
              <div ref={target}></div>
            </AlarmBox>
          )}
        </Alarm>
      </MainHeader>
    </div>
  );
};
export default TransferHeader;

const MainHeader = styled.div`
  position: relative;
  font-family: Pretendard;
  font-style: Medium;
  border-bottom: 1px solid #f5f5f5;
  background-color: #ffffff;
  height: 48px;
  font-weight: 500;
  font-size: 17px;
  line-height: 20px;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 400;
  line-height: 21.78px;
  width: 375px;
`;
const PointerBox = styled.div`
  margin-left: 16px;
`;
const MessageBox = styled.div`
  margin-left: ${(props) => props.margin};
  font-family: Pretendard;
  font-weight: 500;
  font-size: 17px;
`;
const Alarm = styled.div`
  margin-left: ${(props) => props.margin};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  img {
    width: 20.276px;

    height: 21.779px;
  }
`;
const AlarmBox = styled.div`
  overflow-y: auto;
  display: flex;
  height: 9.375rem;
  flex-direction: column;
  right: 2rem;
  top: 1.875rem;
  position: absolute;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    height: 1%;

    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
  }
  div {
    z-index: 1000;
    max-width: 16.625rem;
    height: 30px;
    padding: 10px;
    display: flex;
    flex-shrink: 0;
    background: #fff;
    color: #222;
    &:hover {
      background: #f5f5f5;
    }
    font-size: 13px;
    font-family: Pretendard;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;
