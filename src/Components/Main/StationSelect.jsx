import React from "react";
import styled from "styled-components";
import line from "../../Assets/Main/line.svg";
import stationimg from "../../Assets/Main/station.svg";
import { useRecoilState } from "recoil";
import { useStationState } from "../../Recoil/userList";

const StationSelect = () => {
  const [station, setStation] = useRecoilState(useStationState);
  return (
    <SubwayDiv>
      {/* 지하철 역 */}
      <StationBox>
        <Line>
          <img src={line} alt="line" />
        </Line>

        <Station>
          <Start>
            <span>출발</span>
            <div>
              <img src={stationimg} alt="station" />
              {station && <span>{station}</span>}
            </div>
          </Start>
          <Arrive>
            <span>도착</span>
            <div>
              <img src={stationimg} alt="station" />
              <span>도착역</span>
            </div>
          </Arrive>
        </Station>
      </StationBox>
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
  cursor: pointer;
  margin-top: 18px;
  width: 293px;
  height: 182px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const Start = styled.div`
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
