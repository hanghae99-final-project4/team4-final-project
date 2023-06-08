import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import guide from '../../Assets/Main/guidebutton.svg';
import write from '../../Assets/Main/write.svg';
import setting from '../../Assets/Main/setting.svg';
import hand from '../../Assets/Main/hand.svg';
import line from '../../Assets/Main/line.svg';
import stationimg from '../../Assets/Main/station.svg';
import { trainApi } from '../../apis/Instance';
import Slick from '../Slick/Slick';
import Kakao from '../Kakao/Kakao';
import { useRecoilState } from 'recoil';
import { useArriveState, useStationState } from '../../Recoil/userList';
import { useStation } from '../../MyTools/quries/station';
import { ModalCtn } from '../Modal/CounterProfileModal';
import exit from '../../Assets/Modal/status.svg';
import circleimg from '../../Assets/History/circle.svg';
import upimg from '../../Assets/History/up.svg';
import downimg from '../../Assets/History/down.svg';
import normalupimg from '../../Assets/History/normalup.svg';
import normaldownimg from '../../Assets/History/normaldown.svg';
import ProfileSlick from '../Slick/ProfileSlick';
const Subway = () => {
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();
  const initialState = {
    station: '',
  };

  const [station, setStation] = useRecoilState(useStationState);
  const [arrive, setArrive] = useRecoilState(useArriveState);
  const [bottomSheet, setBottomSheet] = useState(false);
  const [status, setStatus] = useState('');
  const [match, setMatch] = useState([]);
  const { data } = useStation(station?.place_name?.split('역')[0]);
  localStorage.setItem('line', data?.[0]?.line_number);
  useEffect(() => {
    getProfile();
    getMatch();
  }, []);
  const naviHandler = () => {
    navigate('/stationselect');
  };
  //프로필 조회 함수
  const getProfile = useCallback(async () => {
    try {
      const userId = localStorage.getItem('userId');
      const { data } = await trainApi.getConvers(userId);
      setProfile(data.userInfo);
    } catch (err) {
      return;
    }
  }, []);

  const getMatch = useCallback(async () => {
    try {
      const Id = localStorage.getItem('userId');
      const { data } = await trainApi.getMatch(Id);
      setMatch(data);
    } catch (err) {
      return;
    }
  }, []);

  // localstorage 객체 배열로 만드는 함수
  function setItemWithExpireTime(keyName, keyValue, tts) {
    // localStorage에 저장할 객체
    const obj = {
      value: keyValue,
      expire: Date.now() + tts,
    };

    // 객체를 JSON 문자열로 변환
    const objString = JSON.stringify(obj);

    // setItem
    window.localStorage.setItem(keyName, objString);
  }
  const buttonHandler = () => {
    localStorage.setItem(arrive.station_name, arrive.line_number);
    setItemWithExpireTime('nickname', profile.result.nickname, 30000000);
    setItemWithExpireTime('profile', profile?.images?.[0]?.image_url, 3000000);
    navigate('/chattingpage');
  };
  const registerHandler = async () => {
    try {
      const id = localStorage.getItem('userId');
      const { data } = await trainApi.postStatusmessage(id, {
        introduction: status.status,
      });
      getProfile();
      setBottomSheet(!bottomSheet);
    } catch (err) {
      return;
    }
  };
  const reputationDownHandler = async (Id) => {
    try {
      const { data } = await trainApi.patchreputation(Id, {
        reputation: false,
      });
      getMatch();
    } catch (err) {
      return;
    }
  };

  const reputationUpHandler = async (Id) => {
    try {
      const { data } = await trainApi.patchreputation(Id, { reputation: true });
      getMatch();
    } catch (err) {
      return;
    }
  };

  const statusHandler = useCallback(
    (e) => {
      const { name, value } = e.target;

      setStatus((status) => ({ ...status, [name]: value }));
    },
    [status.status]
  );

  return (
    <SubwayDiv>
      {bottomSheet && <ModalCtn></ModalCtn>}
      <Modal className={bottomSheet ? 'open' : ''}>
        <Status>
          <span>상태 메시지 수정</span>
          <Exit onClick={() => setBottomSheet(!bottomSheet)} src={exit} />
        </Status>

        <InputDiv>
          <input
            maxLength={20}
            onChange={statusHandler}
            value={status.status}
            name="status"
            placeholder="안녕하세요 잘 부탁드려요!"
          />
          <span className="sub">
            {status?.status?.length}/{20}
          </span>
        </InputDiv>

        <button onClick={registerHandler}>확인</button>
      </Modal>
      <GuideBox>
        <div>
          <span class="welcome">환영합니다!</span>
          <span class="guide">환승시민 어떻게 이용하는지 모르시겠다면?</span>
        </div>
        <div>
          <img onClick={() => navigate('/guide')} src={guide} alt="guide" />
        </div>
      </GuideBox>
      <ProfileBox>
        <Profile>
          <Img onClick={() => navigate('/changeprofile')}>
            <img
              src={
                profile?.images?.filter((item) => item.is_primary === true)?.[0]
                  ?.image_url
              }
              alt="profile"
            />
          </Img>
          <NicknameBox>
            <Nickname>{profile?.result?.nickname}</Nickname>
            <ApplySet>
              <img
                onClick={() => setBottomSheet(!bottomSheet)}
                src={write}
                alt="write"
              />

              <span onClick={() => setBottomSheet(!bottomSheet)}>
                {profile?.result?.introduction !== null
                  ? profile?.result?.introduction
                  : '반갑습니다. 프로필을 설정 해 주세요'}
              </span>
            </ApplySet>
          </NicknameBox>
          <Setting onClick={() => navigate('/mypage')}>
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
              {station?.place_name?.length !== 0 ? (
                <span>{station?.place_name?.split('역')[0]}</span>
              ) : (
                <span>출발역</span>
              )}
            </div>
          </Start>
          <Arrive>
            <span>도착</span>
            <div>
              <img src={stationimg} alt="station" />
              {arrive?.station_name?.length !== 0 ? (
                <span>{arrive?.station_name}</span>
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
        {match.map((item, i) => (
          <HistoryItem key={i}>
            <MatchItem>
              <MatchResultBox>
                <img src={circleimg} />
                <div>매칭성공</div>
              </MatchResultBox>

              <span>
                {`${item?.updatedAt.slice(0, 4)} /${item?.updatedAt.slice(
                  5,
                  7
                )}/${item?.updatedAt.slice(8, 10)}
                 `}
              </span>
            </MatchItem>

            <MatchNic>
              {item?.User?.nickname}
              <span>님과 매칭 되었습니다.</span>
            </MatchNic>
            <Comment>
              <div>지속적으로 대화 하고 싶으신가요?</div>
              {item.reputation ? (
                <LikeBox>
                  <img
                    onClick={() => reputationDownHandler(item.id)}
                    src={normaldownimg}
                  />
                  <img
                    onClick={() => reputationUpHandler(item.id)}
                    src={upimg}
                  />
                </LikeBox>
              ) : item.reputation === null ? (
                <LikeBox>
                  <img
                    onClick={() => reputationDownHandler(item.id)}
                    src={normaldownimg}
                  />
                  <img
                    onClick={() => reputationUpHandler(item.id)}
                    src={normalupimg}
                  />
                </LikeBox>
              ) : (
                <LikeBox>
                  <img
                    onClick={() => reputationDownHandler(item.id)}
                    src={downimg}
                  />
                  <img
                    onClick={() => reputationUpHandler(item.id)}
                    src={normalupimg}
                  />
                </LikeBox>
              )}
            </Comment>
          </HistoryItem>
        ))}
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
export const Profile = styled.div`
  margin-left: 10px;
  width: 323;
  height: 81px;
  display: flex;
  align-items: center;
`;
export const Img = styled.div`
  cursor: pointer;
  transform: scale(1);
  width: 60px;
  height: 60px;
  overflow: hidden;
  margin: 0 auto;
  border-radius: 100%;
  object-fit: cover;

  img {
    width: 100%;
    height: 100%;
  }
`;
export const NicknameBox = styled.div`
  margin-left: 6px;
  gap: 4px;
  display: flex;
  flex-direction: column;
`;
export const Nickname = styled.span`
  color: #8fb398;
  font-weight: 600;
  font-size: 16px;
`;
export const ApplySet = styled.div`
  display: flex;
  gap: 6px;
  span {
    cursor: pointer;
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
  position: absolute;
  right: 23.3px;

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
  margin-left: 16px;
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
  margin-left: 16px;
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
  margin-left: 16px;
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
  margin-left: 16px;
  margin-top: 40px;
  width: 343px;

  span {
    font-weight: 500;
    font-size: 24px;
  }
`;
// 상태프로필 모달
export const Modal = styled.div`
  background: #fff;
  width: 375px;
  height: 812px;
  margin: 0;
  padding: 0;
  transition: all 600ms cubic-bezier(0.86, 0, 0.07, 1);
  top: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 14px 14px 0px 0px;

  z-index: 9999;
  &.open {
    top: 229px;
  }
  span {
    font-size: 17px;
    font-weight: 600;
    &.sub {
      font-family: Pretendard;
      font-size: 12px;
      font-weight: 300;
      line-height: 14px;
      letter-spacing: 0em;
      text-align: center;
      color: #7a7a7a;
    }
  }
  button {
    width: 343px;
    height: 40px;
    background-color: #8fb398;

    font-size: 17px;
    font-weight: 600;
    color: #ffffff;
  }
`;
export const InputDiv = styled.div`
  margin-top: 40px;
  width: 343px;
  height: 76px;
  input {
    width: 343px;
    border-bottom: 1px solid #e3e3e3;
    &::placeholder {
      color: #b0b0b0;
    }
  }
  span {
    color: #7a7a7a;
    display: flex;
    justify-content: end;
  }
`;
export const Exit = styled.img`
  cursor: pointer;
  margin-right: 10px;
`;
export const Status = styled.div`
  display: flex;
  width: 225px;
  height: 48px;
  margin-left: 134px;
  align-items: center;
  justify-content: space-between;
`;
const HistoryItem = styled.div`
  display: flex;
  flex-direction: column;

  width: 343px;
  height: 105px;
  border-bottom: 1px solid #e2e2e2;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  color: #8fb398;
`;
const MatchNic = styled.div`
  margin-top: 12px;
  font-size: 16px;
  font-weight: 500;
  gap: 6px;
  color: #2e2e2e;
  display: flex;
  span {
    font-size: 14px;
    font-weight: 400;
    color: #949494;
  }
`;
const MatchItem = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    font-size: 12px;
    font-weight: 400;
    color: #aaaaaa;
  }
`;
const Comment = styled.div`
  margin-top: 11px;
  font-size: 14px;
  font-weight: 400;
  color: #6c6c6c;
  display: flex;
  justify-content: space-between;
`;
const Curcle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 999px;
  border: 2px soild #8fb398;
`;
const MatchResultBox = styled.div`
  display: flex;
  gap: 7px;
`;
const LikeBox = styled.div`
  margin-bottom: 15px;
  display: flex;
  gap: 15px;
  img {
    cursor: pointer;
  }
`;
