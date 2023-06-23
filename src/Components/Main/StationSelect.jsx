import React from 'react';
import styled from 'styled-components';
import line from '../../Assets/Main/line.svg';
import stationimg from '../../Assets/Main/station.svg';
import { useRecoilState } from 'recoil';
import { useArriveState, useStationState } from '../../Recoil/userList';
import { useNavigate } from 'react-router-dom';

const StationSelect = () => {
  const navigate = useNavigate();
  const [station, setStation] = useRecoilState(useStationState);
  const [arrive, setArrive] = useRecoilState(useArriveState);
  const naviHandler = () => {
    navigate('/stationsearch');
  };
  const buttonHandler = () => {
    navigate('/subwaypage');
  };

  return (
    <SubwayDiv>
      {/* 지하철 역 */}
      <StationBox>
        <Line>
          <img src={line} alt="line" />
        </Line>

        <Station>
          <Start onClick={() => navigate('/startselect')}>
            <span>출발</span>
            <div>
              <img src={stationimg} alt="station" />
              {station && true ? (
                <span>{station?.place_name?.split('역')[0]}</span>
              ) : (
                <span>{'도착역'}</span>
              )}
            </div>
          </Start>
          <Arrive onClick={naviHandler}>
            <span>도착</span>
            <div>
              <img src={stationimg} alt="station" />
              {arrive && true ? (
                <span>{arrive?.station_name}</span>
              ) : (
                <span>도착역</span>
              )}
            </div>
          </Arrive>
        </Station>
      </StationBox>
      <OKBtn onClick={buttonHandler}>확인</OKBtn>
    </SubwayDiv>
  );
};

export default StationSelect;
const SubwayDiv = styled.div`
  z-index: 999;
  align-items: center;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 375px;
  height: 875px;
  overflow: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    height: 1%;

    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
  }
`;
const StationBox = styled.div`
  padding-bottom: 20px;
  margin-top: 17px;
  width: 343px;
  height: 218px;
  display: flex;
  gap: 6px;
  border: 1px solid #c3c3c340;
  box-shadow: 0px 0px 4px 1px #c3c3c340;
  border-radius: 4px;
`;
const Line = styled.div`
  margin-top: 21px;
  margin-left: 11px;
`;
const Station = styled.div`
  margin-top: 18px;
  width: 293px;
  height: 182px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const Start = styled.div`
  cursor: pointer;
  display: flex;
  gap: 13px;
  flex-direction: column;
  width: 293px;
  height: 78px;
  span {
    color: #4e4e4e;
    font-weight: 500;
    font-size: 18px;
  }
  div {
    width: 293px;
    height: 44px;
    border: 1px solid #dadada;
    display: flex;
    align-items: center;
    gap: 8px;
    span {
      font-weight: 400;
      color: #585858;
      font-size: 16px;
    }
  }
`;
const Arrive = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 291px;
  height: 74px;
  gap: 9px;
  span {
    color: #4e4e4e;
    font-weight: 500;
    font-size: 18px;
  }
  div {
    width: 293px;
    height: 44px;
    border: 1px solid #dadada;
    display: flex;
    align-items: center;
    gap: 8px;
    span {
      font-weight: 400;
      color: #585858;
      font-size: 16px;
    }
  }
`;
const OKBtn = styled.button`
  margin-top: 30px;
  width: 343px;
  height: 50px;
  background-color: #fa3a45;
  color: #ffffff;
`;
