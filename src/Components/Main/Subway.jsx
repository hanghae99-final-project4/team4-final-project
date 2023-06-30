import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import guide from '../../Assets/Main/guidebutton.svg';
import write from '../../Assets/Main/write.svg';
import setting from '../../Assets/Main/setting.svg';
import handsign from '../../Assets/Main/handsign.png';
import line from '../../Assets/Main/line.svg';
import stationimg from '../../Assets/Main/station.svg';
import { trainApi } from '../../apis/Instance';
import Slick from '../Slick/Slick';
import Kakao from '../Kakao/Kakao';
import { useRecoilState } from 'recoil';
import {
  useArriveState,
  useContinueState,
  useReportState,
  useStartState,
  useStationState,
  useUserState,
} from '../../Recoil/userList';
import { useStation } from '../../MyTools/quries/station';
import { ModalCtn } from '../Modal/CounterProfileModal';
import exit from '../../Assets/Modal/status.svg';
import circleimg from '../../Assets/History/circle.svg';
import upimg from '../../Assets/History/up.svg';
import downimg from '../../Assets/History/down.svg';
import normalupimg from '../../Assets/Main/normalup.png';
import normaldownimg from '../../Assets/Main/normaldown.png';
import nomatchImg from '../../Assets/Matching/nomatch.svg';
import revertImg from '../../Assets/Main/revert.svg';
import { SmallToast } from '../Profile/Mypage';
import { ToastMessage } from '../Signup/Signup';
import ChattingModal, { BtnBox, PriBtn, SubBtn } from '../Modal/ChattingModal';
import reportimg from '../../Assets/Chatting/report.svg';
import blockimg from '../../Assets/Modal/block.svg';
import { io } from 'socket.io-client';
const socket = io.connect(`${process.env.REACT_APP_SOCKET_URL}`, {
  path: '/socket.io',
  transports: ['websocket'],
});
const Subway = () => {
  //소켓 연결

  const [profile, setProfile] = useState([]);

  const navigate = useNavigate();

  const [station, setStation] = useRecoilState(useStationState);
  const [arrive, setArrive] = useRecoilState(useArriveState);
  const [bottomSheet, setBottomSheet] = useState(false);
  const [status, setStatus] = useState('');
  const [match, setMatch] = useState([]);
  //차단하기 + 신고하기
  const [block, setBlock] = useState(false);
  const [counterUser, setCounterUser] = useState(0);
  const [report, setReport] = useState(false);
  const [counter, setCounter] = useRecoilState(useReportState);
  const [counterNic, setCounterNic] = useState('');
  const [isblock, setIsBlock] = useState(false);
  // 대화하기 요청 할 시
  const [conversation, setConversation] = useRecoilState(useContinueState);
  // 최신순 좋아요순 버튼 리스트
  const revertItem = [
    {
      name: '최신순',
      value: 'recent',
    },
    { name: '좋아요', value: 'like' },
  ];
  // infinite scroll state
  const [start, setStart] = useRecoilState(useStartState);
  const [isRevert, setIsRevert] = useState(false);
  const [revert, setRevert] = useState('최신순');
  const [next, setNext] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  //매칭 버튼 실패시 토스트 메시지 알림
  const [toast, setToast] = useState(false);
  const [confirmToast, setConfirmToast] = useState(false);
  const { data } = useStation(station?.place_name?.split('역')[0]);
  localStorage.setItem('line', data?.[0]?.line_number);

  const target = useRef(null);
  useEffect(() => {
    getMatch();
    getProfile();
  }, []);

  const naviHandler = () => {
    navigate('/stationselect');
  };

  useEffect(() => {
    let observer;
    if (target) {
      const observer = new IntersectionObserver(
        onIntersect,

        { threshold: 0 }
      );
      if (target.current) observer.observe(target?.current);
    }

    return () => observer && observer.disconnect();
  }, [target, isLoaded]);

  // 무한 스크롤 타겟
  const getMoreItem = async () => {
    // 데이터를 받아오도록 true 로 변경
    setIsLoaded(true);
  };

  //isLoaded 가 변할때 실행
  useEffect(() => {
    if (isLoaded) {
      trainApi.getInfinite(next).then((res) => {
        if (!res.data.error) {
          setNext(res.data?.nextcursor);
          setMatch((match) => match.concat(res.data?.result));
          setIsLoaded(false);
        }
      });
    }
  }, [isLoaded]);

  // 관찰자
  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await getMoreItem();

      observer.observe(entry.target);
    }
  };
  const getInfinite = async (next) => {
    const { data } = await trainApi.getInfinite(next);
  };

  //Observer option

  // monitor

  //Observer

  // socket 로직 정리

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

      if (data.nextcursor) {
        setNext(data.nextcursor);
      }

      setMatch(data?.result);
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
    if (start.length !== 0 && arrive.length !== 0) {
      setConversation([]);
      localStorage.setItem(arrive.station_name, arrive.line_number);
      setItemWithExpireTime('nickname', profile.result.nickname, 30000000);
      setItemWithExpireTime(
        'profile',
        profile?.images?.[0]?.image_url,
        3000000
      );
      navigate('/chattingpage');
    } else if (arrive.length === 0) {
      setConfirmToast(true);
    } else {
      setToast(true);
    }
    return (
      setTimeout(() => setToast(false), 3000),
      setTimeout(() => setConfirmToast(false), 3000)
    );
  };
  // 상태메시지 등록 핸들러
  const registerHandler = async () => {
    try {
      const id = localStorage.getItem('userId');
      const { data } = await trainApi.patchnickname(id, {
        introduction: status.status,
      });
      getProfile();
      setBottomSheet(!bottomSheet);
    } catch (err) {
      return;
    }
  };
  // 싫어요 핸들러
  const reputationDownHandler = async (Id, i) => {
    try {
      const { data } = await trainApi.patchreputation(Id, {
        reputation: false,
      });
      const newArr = match.map((item, index) => {
        if (index === i && item.id === Id) {
          return { ...item, reputation: false };
        }
        return item;
      });
      setMatch(newArr);
    } catch (err) {
      return;
    }
  };
  // 좋아요 핸들러
  const reputationUpHandler = async (Id, i) => {
    try {
      const { data } = await trainApi.patchreputation(Id, { reputation: true });

      const newArr = match.map((item, index) => {
        if (index === i && item.id === Id) {
          return { ...item, reputation: true };
        }
        return item;
      });
      setMatch(newArr);
    } catch (err) {
      return;
    }
  };
  const socketChatStatus = (message) => {
    console.log(message);
  };
  const socketAlarmHandler = (message) => {
    console.log(message);
  };
  useEffect(() => {
    socket.emit(
      'nickname',
      profile?.result?.nickname,
      localStorage.getItem('userId')
    );
    socket.emit('test', localStorage.getItem('userId'));
    socket.on('test', (message) => console.log(message));
    socket.on('chatstatus', socketChatStatus);
    socket.on('alram', socketAlarmHandler);
    console.log('작동하고 있음');
  });
  const statusHandler = useCallback(
    (e) => {
      const { name, value } = e.target;

      setStatus((status) => ({ ...status, [name]: value }));
    },
    [status.status]
  );

  const reverHandler = (e) => {
    setRevert((prev) => {
      return e.target.name;
    });

    setIsRevert(false);
  };

  useEffect(() => {
    if (revert === '좋아요') {
      const like = Array.from(new Set(match)).sort((a, b) =>
        a.reputation < b.reputation ? 1 : -1
      );
      setMatch(like);
    } else if (revert === '최신순') {
      const recent = Array.from(new Set(match)).sort((a, b) =>
        a.createdAt < b.createdAt ? 1 : -1
      );
      setMatch(recent);
    }
  }, [revert]);

  const blockHandler = (userId, nickname) => {
    setBlock(!block);
    setCounterUser(userId);
    setCounterNic(nickname);
  };
  const userBlockHandler = async () => {
    try {
      const Id = localStorage.getItem('userId');
      const { data } = await trainApi.blockuser(Id, counterUser);
      if (data?.result === '성공') {
        setIsBlock(true);
      }
      setBlock(true);
      return (
        setTimeout(() => setBlock(!block), 3000),
        setTimeout(() => setIsBlock(false), 3000)
      );
    } catch (err) {
      window.alert(err.response.data.error);
    }
  };
  const reportHandler = (Id) => {
    setReport(!report);
    setCounter(Id);
  };
  //대화 하기 핸들러
  const conversationHandler = (roomkey, matchId, nickname) => {
    setConversation({ roomkey: roomkey, match: matchId, nickname: nickname });
    setItemWithExpireTime('nickname', profile.result.nickname, 30000000);
    setItemWithExpireTime('profile', profile?.images?.[0]?.image_url, 3000000);
    navigate('/chattingpage');
  };
  // 대화 요청하기 핸들러
  const conversationApplyHandler = async (item) => {
    try {
      const { data } = await trainApi.applychatrequset({
        chatrequest: 'requested',
        my_id: item?.user_id, //나의 아이디
        other_id: item?.matched_user, //상대방 아이디
        my_nickname: profile?.result?.nickname, //내 닉네임
        other_nickname: item?.User?.nickname, //상대 닉네임
        matchedlist_id: item?.matched_userlist_id, // 상대 매칭 리스트
        mymatchedlist_id: item?.id,
      });
    } catch (err) {
      return;
    }
  };
  // 대화 수락하기 핸들러
  const acceptConversationHandler = async (item, i) => {
    try {
      await reputationUpHandler(item.id, i);
      const { data } = await trainApi.applychatrequset({
        chatrequest: 'accept',
        my_id: item?.user_id, //나의 아이디
        other_id: item?.matched_user, //상대방 아이디
        my_nickname: profile?.result?.nickname, //내 닉네임
        other_nickname: item?.User?.nickname, //상대 닉네임
        matchedlist_id: item?.matched_userlist_id, // 상대 매칭 리스트})
        mymatchedlist_id: item?.id,
      });
    } catch (err) {
      return;
    }
  };
  const conversationDenyHandler = async (item) => {
    try {
      const { data } = await trainApi.applychatrequset({
        chatrequest: 'deny',
        my_id: item?.user_id, //나의 아이디
        other_id: item?.matched_user, //상대방 아이디
        my_nickname: profile?.result?.nickname, //내 닉네임
        other_nickname: item?.User?.nickname, //상대 닉네임
        matchedlist_id: item?.matched_userlist_id, // 상대 매칭 리스트})
        mymatchedlist_id: item?.id,
      });
    } catch (err) {
      return;
    }
  };
  console.log(match);

  return (
    <>
      {report && (
        <ChattingModal>
          <img src={reportimg} />
          <span className="report">신고 페이지로 이동 할까요?</span>
          <span className="sub">신고버튼 시 신고페이지로 이동합니다.</span>
          <BtnBox margin="21px">
            <SubBtn onClick={() => setReport(!report)}>취소</SubBtn>
            <PriBtn onClick={() => navigate('/report')}>신고</PriBtn>
          </BtnBox>
        </ChattingModal>
      )}
      {block && (
        <ChattingModal>
          <img src={blockimg} />
          <span className="report">상대방을 차단 할까요?</span>
          <span className="sub">차단하면 서로 매칭이 되지 않습니다.</span>
          <BtnBox margin="20px">
            <SubBtn onClick={() => setBlock(!block)}>취소</SubBtn>
            <PriBtn onClick={userBlockHandler}>차단</PriBtn>
          </BtnBox>
        </ChattingModal>
      )}
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
        {toast && (
          <ToastMessage className="matching">
            환승시민을 이용하기 위해서는
            <br /> 위치 액세스를 허용해주세요!
          </ToastMessage>
        )}
        {confirmToast && (
          <SmallToast className="matching">도착역을 입력해주세요</SmallToast>
        )}
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
                  profile?.images?.filter(
                    (item) => item.is_primary === true
                  )?.[0]?.image_url
                }
                alt="profile"
              />
            </Img>
            <NicknameBox>
              <Nickname>{profile?.result?.nickname}</Nickname>
              <ApplySet
                className={
                  profile?.result?.introduction === null ? 'first' : ''
                }
              >
                <img
                  onClick={() => setBottomSheet(!bottomSheet)}
                  src={write}
                  alt="write"
                />

                <span onClick={() => setBottomSheet(!bottomSheet)}>
                  {profile?.result?.introduction !== null
                    ? profile?.result?.introduction
                    : '반갑습니다. 소개글을 작성해주세요.'}
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
            <img src={handsign} alt="hand" />
            <span class="search">인연 찾기</span>
          </div>

          <span class="designate">
            인연을 찾기 전 도착역을 지정해 주세요.
            <br /> 출발역은 자동 입력됩니다.
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
                {start.length !== 0 ? (
                  <span>{station?.place_name?.split('역')[0]}</span>
                ) : (
                  <span className="deactive">위치 엑세스를 허용해주세요.</span>
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
          <MatchBtn
            className={
              start.length !== 0 && arrive.length !== 0 ? 'active' : ''
            }
            onClick={() => buttonHandler()}
          >
            매칭
          </MatchBtn>
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
          {isblock && (
            <SmallToast>{counterNic} 님이 차단되었습니다.</SmallToast>
          )}
          <RevertBox>
            <span>매칭이력</span>
            <HistoryRevert onClick={() => setIsRevert(!isRevert)}>
              <img src={revertImg} />
              <span>{revert}</span>
            </HistoryRevert>
          </RevertBox>
          {isRevert && (
            <RevertItemBox>
              {revertItem?.map((item, i) => (
                <RevertItem
                  onClick={reverHandler}
                  name={item?.name}
                  className={item.name === revert ? 'revert' : ''}
                >
                  {item.name}
                </RevertItem>
              ))}
            </RevertItemBox>
          )}

          {match?.length !== 0 ? (
            <HistoryItemBox>
              {match?.map((item, i) => (
                <HistoryItem
                  className={
                    item.reputation
                      ? 'active'
                      : item.reputation === null &&
                        item?.chatrequest === 'accept'
                      ? 'active'
                      : item.reputation === null &&
                        item?.chatrequest === 'requested'
                      ? 'active'
                      : item.reputation === null
                      ? ''
                      : 'active'
                  }
                  key={i}
                >
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
                        <img className="disable" src={normaldownimg} />
                        <img className="disable" src={upimg} />
                      </LikeBox>
                    ) : item.reputation === null ? (
                      <LikeBox>
                        <img
                          onClick={() => reputationDownHandler(item.id, i)}
                          src={normaldownimg}
                        />
                        <img
                          onClick={() => reputationUpHandler(item.id, i)}
                          src={normalupimg}
                        />
                      </LikeBox>
                    ) : (
                      <LikeBox>
                        <img className="disable" src={downimg} />
                        <img className="disable" src={normalupimg} />
                      </LikeBox>
                    )}
                  </Comment>
                  {/* item 의 chat request 에 따른 삼항식 */}
                  {item.reputation && item.chatrequest === 'accept' ? (
                    <ButtonBox class="buttonbox">
                      <button
                        onClick={() =>
                          conversationHandler(
                            item.roomkey,
                            item.matched_user,
                            item.User.nickname
                          )
                        }
                      >
                        대화하기
                      </button>
                    </ButtonBox>
                  ) : item.reputation && item.chatrequest === 'request' ? (
                    <ButtonBox class="buttonbox">
                      <button class="response">상대방 응답 기다리는중</button>
                    </ButtonBox>
                  ) : item.reputation && item.chatrequest === 'deny' ? (
                    <ButtonBox class="buttonbox">
                      <button>상대방이 대화를 거절하였습니다.</button>
                    </ButtonBox>
                  ) : item.reputation && item.chatrequest === null ? (
                    <ButtonBox class="buttonbox">
                      <button onClick={() => conversationApplyHandler(item)}>
                        대화 요청
                      </button>
                    </ButtonBox>
                  ) : (item.reputation === null &&
                      item.chatrequest === 'requested') ||
                    (item.reputation === false &&
                      item.chatrequest === 'requested') ? (
                    <ButtonBox class="buttonbox">
                      <button
                        onClick={() => acceptConversationHandler(item, i)}
                      >
                        수락
                      </button>
                      <button onClick={() => conversationDenyHandler(item)}>
                        거절
                      </button>
                    </ButtonBox>
                  ) : item.reputation === null && item.chatrequest === null ? (
                    ''
                  ) : (
                    <ButtonBox class="buttonbox">
                      <button onClick={() => reportHandler(item.matched_user)}>
                        신고하기
                      </button>
                      <button
                        onClick={() =>
                          blockHandler(item.matched_user, item.User.nickname)
                        }
                      >
                        차단하기
                      </button>
                    </ButtonBox>
                  )}
                </HistoryItem>
              ))}
              <div ref={target}></div>
            </HistoryItemBox>
          ) : (
            <NoMatchBox>
              <img src={nomatchImg} />
              <div>매칭 이력이 없습니다</div>
            </NoMatchBox>
          )}
        </HistoryBox>

        <Kakao />
      </SubwayDiv>
    </>
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
  transition: background-color 0.5s;
  span {
    cursor: pointer;
    font-size: 12px;
    font-weight: 400;
    color: #575757;
  }
  img {
    cursor: pointer;
  }
  &:hover {
    background-color: #eeeeee;
    opacity: 0.7;
    box-shadow: 0px 1px 5px rgba(220, 220, 220, 0.25);
    border-radius: 8px;
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
    gap: 4px;
    img {
      width: 24px;
      height: 24px;
    }
    span {
      font-weight: 500;
      font-size: 24px;
    }
  }
`;
const StationBox = styled.div`
  margin-left: 16px;
  padding-bottom: 20px;
  margin-top: 40px;
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
    &.deactive {
      color: #fa3a45;
    }
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
  background: rgba(250, 58, 69, 0.3);
  &.active {
    background-color: #fa3a45;
  }
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
  &.active {
    height: 160px;
  }
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
    width: 1.875rem;
    height: 1.875rem;
    cursor: pointer;
    &.disable {
      cursor: default;
    }
  }
  button {
  }
`;
const NoMatchBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 343px;
  height: 335px;
  gap: 20px;
`;
const HistoryItemBox = styled.div`
  margin-top: 36px;
`;
const HistoryRevert = styled.div`
  cursor: pointer;
  width: 75px;
  height: 38px;
  background-color: #f5f5f5;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  display: flex;
  gap: 6.92px;
  img {
    width: 18px;
    height: 14px;
  }
  span {
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    color: #222222;
    text-align: center;
  }
`;
const RevertBox = styled.div`
  width: 343px;
  height: 38px;
  display: flex;
  justify-content: space-between;
`;
const RevertItem = styled.button`
  cursor: pointer;
  width: 100px;
  height: 30px;
  text-align: left;
  padding-left: 10px;
  background-color: #fff;
  &.revert {
    background-color: #f5f5f5;
  }
`;
const RevertItemBox = styled.div`
  background-color: #fff;
  height: 70px;
  width: 100px;
  left: 69%;
  box-shadow: 0px 1px 5px 2px rgba(186, 186, 186, 0.25);
  border-radius: 4px;
  align-items: flex-end;

  position: relative;
  display: flex;
  flex-direction: column;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 10px;
  height: 30px;

  animation: slideIn 2s ease;
  button {
    width: 62px;
    height: 30px;
    background-color: #f4f4f4;
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    letter-spacing: 0em;
    text-align: center;
    color: #333333;
    &.response {
      width: 130px;
    }
  }
  @keyframes slideIn {
    0% {
      opacity: 0;
      transform: translateY(-100%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
