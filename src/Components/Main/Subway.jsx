import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useInput from "../../MyTools/Hooks/UseInput";
import { useNavigate } from "react-router-dom";
import guide from "../../Assets/Main/guidebutton.svg";
import write from "../../Assets/Main/write.svg";
import setting from "../../Assets/Main/setting.svg";
import hand from "../../Assets/Main/hand.svg";
import line from "../../Assets/Main/line.svg";
import stationimg from "../../Assets/Main/station.svg";
import { trainApi } from "../../apis/Instance";
import Slick from "../Slick/Slick";
import Kakao from "../Kakao/Kakao";
import { useRecoilState } from "recoil";
import { useArriveState, useStationState } from "../../Recoil/userList";

const Subway = () => {
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();
  const initialState = {
    station: "",
  };
  const [subway, setSubway, onChangeHandler, reset] = useInput(initialState);
  const [station, setStation] = useRecoilState(useStationState);
  const [arrive, setArrive] = useRecoilState(useArriveState);
  useEffect(() => {
    getProfile();
  }, []);
  const naviHandler = () => {
    navigate("/stationselect");
  };
  //프로필 조회 함수
  async function getProfile() {
    try {
      const userId = localStorage.getItem("userId");
      const { data } = await trainApi.getConvers(userId);
      console.log(data);
      setProfile(data.userInfo);
    } catch (err) {
      console.log(err);
    }
  }
  const buttonHandler = () => {
    navigate("/chattingpage");
  };
  console.log(profile);
  return (
    <SubwayDiv>
      <GuideBox>
        <div>
          <span class="welcome">환영합니다!</span>
          <span class="guide">환승시민 어떻게 이용하는지 모르시겠다면?</span>
        </div>
        <div>
          <img src={guide} alt="guide" />
        </div>
      </GuideBox>
      <ProfileBox>
        <Profile>
          <Img>
            <img src={profile?.images?.[0]?.image_url} alt="profile" />
          </Img>
          <NicknameBox>
            <Nickname>{profile?.result?.nickname}</Nickname>
            <ApplySet>
              <img src={write} alt="write" />
              <span>반갑습니다.프로필을 설정 해 주세요</span>
            </ApplySet>
          </NicknameBox>
          <Setting>
            <img src={setting} alt="setting" />
          </Setting>
        </Profile>
      </ProfileBox>
      <SearchBox>
        <div>
          <img src={hand} alt="hand" />
          <span class="search">인연 찾기</span>
        </div>

        <span class="designate">
          인연을 찾기 전 출발역과 도착역을 지정 해 주세요.
        </span>
      </SearchBox>
      {/* 지하철 역 */}
      <StationBox>
        <Line>
          <img src={line} alt="line" />
        </Line>

        <Station onClick={naviHandler}>
          <Start>
            <span>출발</span>
            <div>
              <img src={stationimg} alt="station" />
              {station.length !== 0 ? (
                <span>{station}</span>
              ) : (
                <span>출발역</span>
              )}
            </div>
          </Start>
          <Arrive>
            <span>도착</span>
            <div>
              <img src={stationimg} alt="station" />
              {arrive.length !== 0 ? (
                <span>{arrive}</span>
              ) : (
                <span>도착역</span>
              )}
            </div>
          </Arrive>
        </Station>
      </StationBox>
      <div>
        <MatchBtn onClick={() => buttonHandler()}>매칭</MatchBtn>
      </div>

      {/* 이벤트 */}
      <Event>
        <span>이벤트</span>
        <span className="event">
          행운이 팡팡 터지는 이벤트에 참여 해 보세요!
        </span>
      </Event>
      {/* 슬라이더 */}
      <Slick />

      <HistoryBox>
        <span>매칭이력</span>
      </HistoryBox>
      <Kakao />
    </SubwayDiv>
  );
};

export default Subway;
const SubwayDiv = styled.div`
  z-index: 999;
  margin: 0 auto;
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
const GuideBox = styled.div`
  width: 342px;
  height: 42px;
  display: flex;
  margin-left: 17px;
  margin-top: 34px;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    flex-direction: column;
  }
  span {
    &.guide {
      font-weight: 400;
      font-size: 14px;
      color: #ababab;
    }
    &.welcome {
      font-weight: 500;
      font-size: 16px;
      color: #484848;
    }
  }
  img {
    cursor: pointer;
  }
`;
const ProfileBox = styled.div`
  display: flex;
  justify-items: center;
  margin-top: 32px;
  margin-left: 16px;
  width: 343px;
  height: 81px;
  align-items: center;
  background-color: #fefefe;
  border: 1px solid #f5f3f3;
  border-radius: 4px;
  stroke: solid #f5f3f3;
  box-shadow: 0px 1px 4px 1px #dcdcdc40;
`;
const Profile = styled.div`
  margin-left: 10px;
  width: 323;
  height: 60px;
  display: flex;
  align-items: center;
`;
const Img = styled.div`
  transform: scale(1);
  width: 60px;
  height: 60px;
  overflow: hidden;
  margin: 0 auto;
  border-radius: 100%;

  img {
    width: 100%;
    height: 100%;
  }
`;
const NicknameBox = styled.div`
  margin-left: 6px;
  gap: 4px;
  display: flex;
  flex-direction: column;
`;
const Nickname = styled.span`
  color: #8fb398;
  font-weight: 600;
  font-size: 16px;
`;
const ApplySet = styled.div`
  display: flex;
  gap: 6px;
  span {
    font-size: 12px;
    font-weight: 400;
    color: #575757;
  }
  img {
    cursor: pointer;
  }
`;
const Setting = styled.div`
  cursor: pointer;
  margin-left: 34px;
  width: 22.67px;
  height: 22.67px;
`;
const SearchBox = styled.div`
  margin-left: 16px;
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  width: 271px;
  height: 54px;
  gap: 8px;

  span.designate {
    font-weight: 400;
    font-size: 14px;
    color: #ababab;
  }
  div {
    display: flex;
    span {
      font-weight: 500;
      font-size: 24px;
    }
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
const MatchBtn = styled.button`
  margin-top: 18px;
  width: 343px;
  height: 40px;
  font-weight: 600;
  font-size: 16px;

  border-radius: 4px;
  color: #ffffff;
  background-color: #fa3a45;
`;
const Event = styled.div`
  margin-top: 40px;
  display: flex;
  gap: 8px;
  flex-direction: column;
  span {
    font-size: 24px;
    font-weight: 500;
    color: #404040;
  }
  span.event {
    font-weight: 400;
    font-size: 14px;
    color: #ababab;
  }
`;
const HistoryBox = styled.div`
  margin-top: 40px;
  width: 343px;
  height: 351px;

  span {
    font-weight: 500;
    font-size: 24px;
  }
`;
