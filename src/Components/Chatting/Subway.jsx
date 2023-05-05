import React, { useEffect, useRef, useState } from 'react';
import SubwayIcon from '../../Element/SubwayIcon';
import styled from 'styled-components';
import useInput from '../../MyTools/Hooks/UseInput';
import { useNavigate } from 'react-router-dom';
import HomeMenu from '../HomeMenu/HomeMenu';
import SubwayHome from '../HomeMenu/SubwayHome';
import guide from '../../Assets/Main/guidebutton.svg';
import write from '../../Assets/Main/write.svg';
import setting from '../../Assets/Main/setting.svg';
import hand from '../../Assets/Main/hand.svg';
import { trainApi } from './../../apis/Instance';
import { yup } from 'yup';

const Subway = () => {
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();
  const initialState = {
    station: '',
  };
  const [subway, setSubway, onChangeHandler, reset] = useInput(initialState);

  useEffect(() => {
    getProfile();
  }, []);
  //프로필 조회 함수
  async function getProfile() {
    const userId = localStorage.getItem('userId');
    const { data } = await trainApi.getConvers(userId);
    setProfile(data.userInfo);
  }
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
            <img src={profile?.images[0]?.image_url} alt="profile" />
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
  height: 812px;
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
  stroke: #f5f3f3;
  offset: 0px, 1px rgba(220, 220, 220, 0.25);
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
  width: 272px;
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
