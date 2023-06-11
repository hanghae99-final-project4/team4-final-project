import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import useInput from '../../MyTools/Hooks/UseInput';
import { useState } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Header, {
  Ban,
  Chatbot,
  ImgBox,
  MessageBox,
  PointerBox,
} from '../Header/Header';
import ImageFormIcon from '../../Element/ImageFormIcon';
import CounterProfileModal from '../Modal/CounterProfileModal';
import { Cookies } from 'react-cookie';
import { ReactComponent as HeaderPointer } from '../../Assets/HeaderItem/HeaderPointer.svg';
import sendbtn from '../../Assets/Chatting/trans.svg';
import { trainApi, trainApi2 } from '../../apis/Instance';
import Matching from '../../Pages/Matching/MatchingPage';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  useArriveState,
  useBotState,
  useStationState,
} from '../../Recoil/userList';
import chatbot from '../../Assets/Chatting/chatbot.svg';
import ban from '../../Assets/Chatting/ban.svg';
import Timer from '../Timer/Timer';
import ChattingModal, {
  BtnBox,
  Exit,
  PriBtn,
  SubBtn,
} from '../Modal/ChattingModal';
import addimg from '../../Assets/ChattingModal/add.svg';
import exitimg from '../../Assets/ChattingModal/exit.svg';
import leaveimg from '../../Assets/ChattingModal/leave.svg';
import imageCompression from 'browser-image-compression';
import chatImg from '../../Assets/Chatting/chatprofile.svg';
import close from '../../Assets/ChattingModal/close.svg';
import { SmallToast } from '../Profile/Mypage';
import { ToastMessage } from '../Signup/Signup';

// const socket = io(`${process.env.REACT_APP_SOCKET_URL}`);
const socket = io.connect(`${process.env.REACT_APP_SOCKET_URL}`, {
  path: '/socket.io',
  transports: ['websocket'],
});
const Chatting = () => {
  const name = JSON.parse(localStorage.getItem('nickname')).value;
  const profile = JSON.parse(localStorage.getItem('profile')).value;
  const roomkey = localStorage.getItem('room');
  const initialState = {
    url: profile,
    nickname: name,
    msg: '',
  };
  const [isModal, setIsModal] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [file, setFile] = useState([]);
  const [success, setSuccess] = useState(false);
  const [room, setRoom] = useState(null);
  const [chatArr, setChatArr] = useState([]);
  const [message, setMessage, onChangeHandler, reset] = useInput(initialState);
  const [scrollState, setScrollState] = useState(true);
  const [counter, setCounter] = useState([]);
  const [counterUser, setCounterUser] = useState([{}]);
  const [leave, setLeave] = useState(false);
  const [prepare, setPrepare] = useState(false);

  // 시간 추가 모달
  const [addModal, setAddModal] = useState(false);
  // 나가기 모달
  const [isExit, setIsExit] = useState(false);
  // 시간 추가 reset
  const [timereset, setTimeReset] = useState(false);

  const [chattingBot, setChattingBot] = useRecoilState(useBotState);
  // 도착역
  const arrive = useRecoilValue(useArriveState);
  const station = arrive?.station_name;
  const line = arrive?.line_number;
  //출발역
  const start = useRecoilValue(useStationState);
  const startStation = start?.place_name?.split('역')[0];
  const startLine = localStorage.getItem('line');
  //위도 ,경도
  const lat = localStorage.getItem('lat');
  const lon = localStorage.getItem('lon');
  const navigate = useNavigate();
  //버튼 클릭하면 disable 시키기
  const [disabled, setDisabled] = useState([]);
  const boxRef = useRef(null);
  const scrollRef = useRef();
  const inputRef = useRef();
  const cookies = new Cookies();
  const token = cookies.get('token');
  const thURL = process.env.REACT_APP_TH_S_HOST;
  const [cnt, setCnt] = useState(0);
  const [coupon, setCoupon] = useState(false);
  const [timeCnt, setTimeCnt] = useState(0);
  const [missBot, setMissBot] = useState(false);
  //챗봇 데이터 배열
  const [chatArray, setChatArray] = useState([
    ['산', '바다'],
    ['여름', '겨울'],
    ['자장면', '짬뽕'],
    ['집착 심한 애인', '애정표현 없는 애인'],
    ['애인이랑 스킨십만 1년', '애인이랑 스킨십 전혀 없이 1년'],
    ['게임에 미쳐버린 애인', '술에 미쳐버린 애인'],
    ['가장 친한 친구가 내 험담', '나의 애인이 내 험담'],
    ['이성친구와 여행 가는 애인', '전 애인과 밤새 술마시는 애인'],
    ['정장입고 1박 2일 자전거 타기', '바이크복 입고 1박2일 일하기'],
    [
      '술 먹고 다음날 일어났더니 전 애인한테 부재중 발신 21건',
      '술 먹고 다음날 일어났더니 전공교수님과 통화 내역 1건',
    ],
    ['로또 당첨되면 애인에게 바로 말한다', '숨긴다'],
    ['빚이 30억 있는 이상형 만나기', '부자지만 내가 싫어하는 사람과 연애'],
    ['잠수 이별', '환승 이별'],
    [
      '새 신발인데 물웅덩이에 빠지고 1시간 이상 돌아다니기',
      '양말 젖어서 1시간 이상 돌아다니는데 발 냄새 심하게 나기',
    ],
    ['1년 동안 폰 없이 살기', '1년동안 친구 없기'],
    ['여름에 히터 틀고 자기', '겨울에 에어컨 켜고 자기'],
    ['애인한테 꼬리 치는 베프', '베프한테 꼬리 치는 애인'],
    ['연하', '연상'],
    ['낮져밤이', '낮이밤져'],
    ['매일 사랑을 표현하는 애인', '말 없이 깜짝 이벤트 해주는 애인'],
    ['원하는 얼굴로 태어나기', '원하는 몸매로 태어나기'],
  ]);
  const [chatData, setChatData] = useState(
    chatArray[Math.floor(Math.random() * chatArray.length)]
  );

  const year = new Date().getFullYear();
  const month = String(new Date().getMonth()).padStart(2, '0');
  const day = String(new Date().getDate()).padStart(2, '0');
  // 랜덤 벨류 뽑아주는 핸들러
  //랜덤 벨류 만들고 chatArray 에서 randomValue 값이 포함 되면 그 랜덤 벨류를 제외한 값으로 바꾸기
  const randomChatHandler = () => {
    const randomValue = chatArray[Math.floor(Math.random() * chatArray.length)];

    if (chatArray.includes(randomValue)) {
      const newChatArr = chatArray.filter((i, v) => i !== randomValue);

      setChatArray(newChatArr);
    }
    setChatData(randomValue);
  };

  // function setItemWithExpireTime(keyName, keyValue, tts) {
  //   // localStorage에 저장할 객체
  //   const obj = {
  //     value: keyValue,
  //     expire: Date.now() + tts,
  //   };

  //   // 객체를 JSON 문자열로 변환
  //   const objString = JSON.stringify(obj);

  //   // setItem
  //   window.localStorage.setItem(keyName, objString);
  // }
  const scrollEvent = _.debounce(() => {
    const scrollTop = boxRef.current.scrollTop; //요소의 상단에서 맨 위에 표시 되는 콘텐츠까지의 거리를 측정한 것입니다.
    const clientHeight = boxRef.current.clientHeight; //뷰포트의 높이
    const scrollHeight = boxRef.current.scrollHeight; //뷰포트에 모든 콘텐츠를 맞추기 위해 요소에 필요한 최소 높이와 같습니다.

    //스크롤이 맨 아래에 있을때
    setScrollState(
      scrollTop + clientHeight >= scrollHeight - 100 ? true : false
    );
  }, 100);
  const scroll = React.useCallback(scrollEvent, []);

  // //localStorage 만료시간
  // function getItemWithExpireTime(keyName) {
  //   // localStorage 값 읽기 (문자열)
  //   const objString = window.localStorage.getItem(keyName);

  //   // null 체크
  //   if (!objString) {
  //     return null;
  //   }

  //   // 문자열을 객체로 변환
  //   const obj = JSON.parse(objString);

  //   // 현재 시간과 localStorage의 expire 시간 비교
  //   if (Date.now() > obj.expire) {
  //     // 만료시간이 지난 item 삭제
  //     window.localStorage.removeItem(keyName);
  //     alert('만료시간 지남');
  //     navigate('/converspage');

  //     // null 리턴
  //     return null;
  //   }

  //   // 만료기간이 남아있는 경우, value 값 리턴
  //   return obj.value;
  // }

  //상대방 프로필
  const CounterUserHandler = async () => {
    setIsModal(true);
    try {
      const Id = localStorage.getItem('fairId');
      const { data } = await trainApi.getConvers(Id);
      setCounterUser(data.userInfo);
    } catch (err) {
      return;
    }
  };

  // name handle socket 핸들러

  const handleSocketMessage = (message) => {
    console.log(message);
    if (message.roomkey !== null) {
      setChattingBot(false);
      setCounter(message);

      if (message.roomkey !== undefined) {
        setRoom(message.roomkey);
      }
      localStorage.setItem('room', message.roomkey);
      localStorage.setItem('fairId', message.id);

      if (
        message.fail !==
        '매칭 가능한 상대방이 없습니다. 다시 시도해주세요. 뀨잉뀨잉'
      ) {
        socket.emit('stop', message.roomkey);
        socket.emit('joinroom', message.roomkey);

        setSuccess(true);
      } else {
        navigate('/failpage');
      }
    }
  };

  // broad casting 핸들러
  const handleBroadcastMessage = (message) => {
    // 상대방 나갔을 시
    if (message.leave === true) {
      setTimeout(() => setLeave(true), 2000);
    }
    if (message.addtime === true) {
      setTimeReset(true);
    }

    setChatArr((prevChatArr) => [
      ...prevChatArr,
      {
        addtime: message.addtime,
        leave: message.leave,
        chatbot: message.chatbot,
        roomkey: roomkey,
        nickname: message.name,
        msg: message.msg,
        profile: message.profile,
        url: message.url,
      },
    ]);
  };

  //매칭 시작 nickname 보내고 위도 경도 / 출발호선 출발역/ 도착호선 도착역 보낸 다음 socket.on 받는데 ..
  ///매칭 순서대로 randomjoin => maching => name
  useEffect(() => {
    socket.emit('nickname', JSON.parse(localStorage.getItem('nickname')).value);
    if (chattingBot) {
      socket.emit('updatelocation_bot');
    } else {
      socket.emit(
        'updatelocation',
        [lon, lat], //현재 위치 위도, 경도
        [`${startStation}:${startLine}`, `${station}:${line}`] //출발역 출발호선  도착역 도착호선  // ["인천터미널:인천선", "서울대입구:2호선"]
      );
    }

    socket.once(`${name}`, handleSocketMessage);
    socket.on('broadcast', handleBroadcastMessage);

    return () => {
      socket.off('broadcast', handleBroadcastMessage);
    };
  }, []);

  useEffect(() => {
    if (scrollState) {
      scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
      // scrollRef 의 element위치로 스크롤 이동 behavior는 전환 애니메이션의 정의
    }
  }, [chatArr]);
  useEffect(() => {
    boxRef?.current?.addEventListener('scroll', scroll);
  });

  //submithandler
  const SubmitHandler = (e, callback) => {
    e.preventDefault();

    if (message.msg !== '') {
      socket.emit('persnalchat', {
        roomkey: room,
        msg: message.msg,
        nickname: message.nickname,
        profile: message.url,
      });

      reset(initialState);
      if (callback) {
        callback();
      }
    }
  };

  //이미지 비디오 보내는 로직
  async function postSend(img) {
    if (!img) {
      return;
    }

    if (img.size === 0) {
      return;
    }
    if (img && img.size > 0) {
      const options = {
        maxSizeMB: 1, // 허용하는 최대 사이즈 지정
        maxWidthOrHeight: 1920, // 허용하는 최대 width, height 값 지정
        useWebWorker: true, // webworker 사용 여부
      };

      try {
        //resizing 시키기 추가
        const compressedFile = await imageCompression(img, options);
        const compressedFileAsFile = new File([compressedFile], img.name, {
          type: img.type,
        });
        const formData = new FormData();
        formData.append('chatImage', compressedFileAsFile);

        const name = JSON.parse(localStorage.getItem('nickname')).value;
        const { data } = await trainApi2.chattingForm(name, formData);

        socket.emit('persnalchat', {
          profile: message.url,
          url: data?.url,
          nickname: message?.nickname,
          roomkey: room,
        });
      } catch (error) {
        return;
      }
    } else {
    }
  }

  socket.on('imgaeUP', (message) => {});
  // 나가기 동작 핸들러
  const leaveHandler = () => {
    socket.off('stop');
    socket.off('joinroom');
    socket.off('chat-bot');
    socket.emit('leaveRoom', roomkey);
    localStorage.removeItem('room');
    navigate('/subwaypage');
  };

  // 시간 추가 동작 핸들러
  const addTimeHandler = () => {
    setAddModal(true);
  };
  //타임 추가 핸들러
  const addTimeFunction = () => {
    const roomkey = localStorage.getItem('room');
    if (timeCnt < 1) {
      socket.emit('timeset', roomkey, name);

      setTimeCnt((prev) => prev + 1);
      setTimeReset(false);
    } else {
      setCoupon(true);
    }

    setAddModal(!addModal);
  };
  //챗봇 노출 핸들러
  const chatBotHandler = () => {
    const roomkey = localStorage.getItem('room');
    randomChatHandler();
    if (cnt <= 3) {
      setCnt(cnt + 1);
      socket.emit('chat-bot', roomkey, chatData);
      // 노출 끝나고 채팅을 이어 가세요! 말해주기
    } else {
      setMissBot(true);
    }
  };
  useEffect(() => {
    setTimeout(() => setTimeReset(false), 2000);
    setTimeout(() => setCoupon(false), 3000);
    setTimeout(() => setMissBot(false), 3000);
    setTimeout(() => setPrepare(false), 3000);
  }, [missBot, prepare, coupon, timereset]);
  const buttonHandler = (item, index) => {
    setDisabled([...disabled, index]);
    socket.emit('persnalchat', {
      roomkey: room,
      msg: item,
      nickname: name,
      profile: profile,
    });
  };
  console.log(chatArr);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {success ? (
        <FooterBox>
          <div style={{ height: '812px' }}>
            <Header>
              <PointerBox>
                <HeaderPointer
                  style={{ cursor: 'pointer' }}
                  onClick={() => setIsExit(true)}
                />
              </PointerBox>
              <ImgBox src={counter?.profile} margin="63px" />

              <MessageBox margin="6px">{counter?.fair}</MessageBox>
              <Chatbot
                onClick={() => chatBotHandler()}
                margin="15px"
                src={chatbot}
              />
              <Ban onClick={() => setPrepare(true)} src={ban} />
            </Header>

            <AllChatDiv>
              {prepare && <SmallToast>준비중입니다.</SmallToast>}
              {missBot && (
                <ToastMessage>
                  아쉽지만 챗봇의 기회가 끝났습니다.
                  <br />
                  이제 대화를 이어가보세요!
                </ToastMessage>
              )}
              {coupon && (
                <ToastMessage>소유하고 계신 쿠폰이 없습니다!</ToastMessage>
              )}
              <ConversatonTime>
                <span>대화 시간</span>
                <Timer
                  addModal={addModal}
                  setAddModal={setAddModal}
                  leave={leave}
                  setLeave={setLeave}
                  setTimeReset={setTimeReset}
                  timereset={timereset}
                  margin="80px"
                />
              </ConversatonTime>

              <ChatMainDiv ref={boxRef}>
                {/* 상대방 프로필 모달 */}
                {isModal && (
                  <CounterProfileModal
                    gender={counterUser?.result?.gender}
                    statusmessage={counterUser?.result?.introduction}
                    nickname={counterUser?.result?.nickname}
                    representProfile={counterUser?.images}
                    setCounterUser={setCounterUser}
                    couterUser={counterUser}
                    isModal={isModal}
                    setIsModal={setIsModal}
                  />
                )}
                {/* 시간 추가 모달 */}
                {addModal && (
                  <ChattingModal>
                    <Exit onClick={() => setAddModal(!addModal)} src={close} />
                    <img src={addimg} alt="addimg" />
                    <span margin="20px" className="add">
                      시간을 추가 할까요?
                    </span>
                    <span margin="5px" className="sub">
                      쿠폰 이벤트 준비중입니다!".
                    </span>
                    <BtnBox margin="25px">
                      <SubBtn onClick={() => setPrepare(!prepare)}>
                        충전하기
                      </SubBtn>
                      <PriBtn onClick={() => addTimeFunction()}>
                        1회 무료 추가
                      </PriBtn>
                    </BtnBox>
                  </ChattingModal>
                )}
                {/* 채팅방 나가면 뜨는 모달 */}
                {isExit && (
                  <ChattingModal>
                    <img src={exitimg} alt="exit" />
                    <span margin="10px" className="exit">
                      채팅방을 나가면 <br />
                      다시 돌아올 수 없어요! <br />
                      <span margin="6px" className="sub">
                        그래도 나갈까요?
                      </span>
                    </span>
                    <BtnBox margin="15px">
                      <SubBtn onClick={() => setIsExit(!isExit)}>취소</SubBtn>
                      <PriBtn onClick={() => leaveHandler()}>나가기</PriBtn>
                    </BtnBox>
                  </ChattingModal>
                )}
                {leave && (
                  <ChattingModal>
                    <img src={leaveimg} alt="leave" />
                    <span margin="20px" className="exit">
                      아쉽지만 대화가 <span className="leave">종료</span>
                      되었어요!
                    </span>
                    <span margin="5px" className="sub">
                      새로운 매칭을 할까요?
                    </span>

                    <BtnBox margin="21px">
                      <SubBtn onClick={() => navigate('/subwaypage')}>
                        홈으로
                      </SubBtn>
                      <PriBtn onClick={() => window.location.reload()}>
                        매칭
                      </PriBtn>
                    </BtnBox>
                  </ChattingModal>
                )}

                <ChatBox>
                  <LineBox>
                    <Line />{' '}
                    <span>
                      {year}.{month}.{day}
                    </span>{' '}
                    <Line />
                  </LineBox>
                  {/* 아이스 브래킹 봇 */}
                  <UserProfileDiv>
                    <UserProfileImg src={chatImg} />
                    <UserProfileNameChat>
                      <UserProfileName>아이스 브래킹 봇</UserProfileName>

                      <ChatDiv className={'bot'}>
                        안녕하세요? <br />
                        저는 어색한 분위기를 타파 시켜줄
                        <br /> ‘아이스 브래킹 봇’ 입니다.
                        <br />
                        <br />
                        제가 필요하면 오른쪽 상단의 ‘Quiz 버튼’ 을 눌러주세요.
                      </ChatDiv>
                    </UserProfileNameChat>
                    <Time>
                      {String(new Date().getHours()).padStart(2, '0') +
                        ':' +
                        String(new Date().getMinutes()).padStart(2, '0')}
                    </Time>
                  </UserProfileDiv>
                  {chatArr?.map((item, index) => (
                    <div
                      style={
                        name === item.nickname
                          ? {
                              width: '100%',
                              paddingLeft: '42%',

                              display: 'flex',
                              justifyContent: 'flex-end',
                            }
                          : {
                              width: '100%',
                            }
                      }
                    >
                      <UserChatDiv key={index}>
                        {/* 수신 발신 삼항 연산식 */}
                        {name === item.nickname ? (
                          <UserProfileDiv>
                            <UserProfileImg style={{ display: 'none' }} />
                            <ChatBoxTime>
                              {item.addtime !== true ? (
                                <Time>
                                  {String(new Date().getHours()).padStart(
                                    2,
                                    '0'
                                  ) +
                                    ':' +
                                    String(new Date().getMinutes()).padStart(
                                      2,
                                      '0'
                                    )}
                                </Time>
                              ) : (
                                <UserProfileDiv>
                                  <AddMessage
                                    className={item.addtime === true && 'add'}
                                  >
                                    <span>{item.nickname}</span> 님이 시간을
                                    추가하셨습니다.
                                  </AddMessage>
                                </UserProfileDiv>
                              )}

                              {item.msg ? (
                                <ChatDiv
                                  className={name === item.nickname && 'owner'}
                                >
                                  {item.msg}
                                </ChatDiv>
                              ) : (
                                // <div>mp4</div>
                                <>
                                  <ChatImg
                                    className={
                                      name === item.nickname && 'owner'
                                    }
                                    imgurl={item?.url}
                                  />
                                </>
                              )}
                            </ChatBoxTime>
                          </UserProfileDiv>
                        ) : // 아이스 브레이킹 봇 일때
                        item.nickname === '아이스 브레이킹 봇' ? (
                          <UserProfileDiv>
                            <UserProfileImg src={item.profile} />
                            <UserProfileNameChat>
                              <UserProfileName>{item.nickname}</UserProfileName>
                              {item.msg ? (
                                <ChatDiv
                                  className={
                                    item.nickname === '아이스 브레이킹 봇' &&
                                    'bot'
                                  }
                                >
                                  {item.msg}
                                  <ButtonBox>
                                    <button
                                      disabled={disabled.includes(index)}
                                      onClick={() =>
                                        buttonHandler(item?.chatbot[0], index)
                                      }
                                    >
                                      {item.chatbot && item?.chatbot[0]}
                                    </button>
                                    <button
                                      disabled={disabled.includes(index)}
                                      onClick={() =>
                                        buttonHandler(item?.chatbot[1], index)
                                      }
                                    >
                                      {item.chatbot && item?.chatbot[1]}
                                    </button>
                                  </ButtonBox>
                                </ChatDiv>
                              ) : item.url?.split('.')[5] == 'mp4' ? (
                                <>
                                  <ChatVideo
                                    className={
                                      item.nickname === '아이스 브레이킹 봇' &&
                                      'bot'
                                    }
                                    src={item?.url}
                                  />
                                </>
                              ) : (
                                // <div>mp4</div>
                                <>
                                  <ChatImg
                                    className={
                                      item.nickname === '아이스 브레이킹 봇' &&
                                      'bot'
                                    }
                                    imgurl={item?.url}
                                  />
                                </>

                                // <div>img</div>
                              )}
                            </UserProfileNameChat>
                            <Time>
                              {String(new Date().getHours()).padStart(2, '0') +
                                ':' +
                                String(new Date().getMinutes()).padStart(
                                  2,
                                  '0'
                                )}
                            </Time>
                          </UserProfileDiv>
                        ) : // profile 이 없는 사람은 기본 프로필 설정 삼항 연산자
                        item.profile !== undefined ? (
                          <UserProfileDiv>
                            <UserProfileImg
                              onClick={() => CounterUserHandler()}
                              src={item.profile}
                            />
                            <UserProfileNameChat>
                              <UserProfileName>{item.nickname}</UserProfileName>
                              {item.msg ? (
                                <ChatDiv
                                  className={name === item.nickname && 'owner'}
                                >
                                  {item.msg}
                                </ChatDiv>
                              ) : item.url?.split('.')[5] == 'mp4' ? (
                                <>
                                  <ChatVideo
                                    className={
                                      name === item.nickname && 'owner'
                                    }
                                    src={item?.url}
                                  />
                                </>
                              ) : (
                                // <div>mp4</div>
                                <>
                                  <ChatImg
                                    className={
                                      name === item.nickname && 'owner'
                                    }
                                    imgurl={item?.url}
                                  />
                                </>

                                // <div>img</div>
                              )}
                            </UserProfileNameChat>
                            <Time>
                              {String(new Date().getHours()).padStart(2, '0') +
                                ':' +
                                String(new Date().getMinutes()).padStart(
                                  2,
                                  '0'
                                )}
                            </Time>
                          </UserProfileDiv>
                        ) : // 상대방 나갔을 시
                        item.leave === true ? (
                          <UserProfileDiv>
                            <ChatDiv className={item.leave === true && 'leave'}>
                              <span>{item.nickname}</span> 님이 채팅방을
                              나가셨습니다.
                            </ChatDiv>
                          </UserProfileDiv>
                        ) : item.addtime === true ? (
                          <UserProfileDiv>
                            <ChatDiv className={item.addtime === true && 'add'}>
                              <span>{item.nickname}</span> 님이 시간을
                              추가하셨습니다.
                            </ChatDiv>
                          </UserProfileDiv>
                        ) : (
                          <UserProfileDiv>
                            <UserProfileImg
                              onClick={(e) => CounterUserHandler(e)}
                              src={
                                'https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/309/59932b0eb046f9fa3e063b8875032edd_crop.jpeg'
                              }
                            />
                            <UserProfileNameChat>
                              <UserProfileName>{item.nickname}</UserProfileName>
                              {item.msg ? (
                                <ChatDiv
                                  className={name === item.nickname && 'owner'}
                                >
                                  {item.msg}
                                </ChatDiv>
                              ) : (
                                // <div>mp4</div>
                                <>
                                  <ChatImg
                                    className={
                                      name === item.nickname && 'owner'
                                    }
                                    imgurl={item?.url}
                                  />
                                </>

                                // <div>img</div>
                              )}
                            </UserProfileNameChat>
                          </UserProfileDiv>
                        )}

                        {/* 맨 처음에는 메시지가 없기때문에 문제가 되는군 */}
                        {/* 삼항연산자 중첩해서 사용하니, 코드가 가독성이 많이 떨어지는 것 같다 */}
                        {/* 차라리 이미지 확장자를 따로 변수에 넣어 &&연산자를 사용하는 것이 가장 좋을것 같다/ */}
                      </UserChatDiv>
                    </div>
                  ))}{' '}
                  <div ref={scrollRef} />
                </ChatBox>
              </ChatMainDiv>

              <FooterDiv onSubmit={(e) => SubmitHandler(e)}>
                <Forminput
                  ref={inputRef}
                  type="file"
                  name="picture"
                  maxSize={300000000}
                  value={file?.picture}
                  accept="image/*,video/*"
                  multiple
                  onChange={(e) => postSend(e.target.files[0])}
                />
                <ImageFormIcon inputRef={inputRef} />
                <InputSendBox>
                  <ChatInput
                    placeholder=""
                    type="text"
                    value={message.msg}
                    name="msg"
                    onChange={onChangeHandler}
                  />
                </InputSendBox>
                <ChatSendBtn src={sendbtn} onClick={(e) => SubmitHandler(e)} />
              </FooterDiv>
            </AllChatDiv>
          </div>
        </FooterBox>
      ) : (
        <>
          <Matching />
        </>
      )}
    </div>
  );
};

export default Chatting;

const PostDiv = styled.div`
  width: 300px;
  height: 300px;
`;
const PostPictureDiv = styled.div`
  display: flex;
  flex-direction: row;
`;
//전체 채팅방
const ChatMainDiv = styled.div`
  overflow-y: hidden;
  height: 551px;
  width: 375px;
  padding: 0 0px;
`;
const SitdownHeader = styled.div`
  background-color: #f5f5f5;
  height: 60px;
`;
//채팅 카메라 / 채팅칸 / 전송버튼
const FooterDiv = styled.form`
  display: flex;

  align-items: center;
  position: relative;

  bottom: -30px;
  background-color: #ffffff;
  height: 48px;
  width: 375px;
`;
const Forminput = styled.input`
  display: none;
`;
//닉네임 + 말풍선 div
const UserChatDiv = styled.div`
  margin-top: 10px;
  /* border: 3px solid black;
  width: 300px;
  min-height: 104px;
  height: 173px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border: none; */
`;
//전체 채팅방
const ChatBox = styled.div`
  margin-top: 20px;
  border: none;
  overflow-y: scroll;
  height: 551px;
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
//프로필 이미지
const UserProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 22px;
  border: none;
  cursor: pointer;
`;
//이름 + 프로필 이미지 div
const UserProfileDiv = styled.div`
  display: flex;

  flex-direction: row;
`;
// 닉네임 + 챗
const UserProfileNameChat = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 4px;
`;
// 말풍선
const ChatDiv = styled.div`
  margin-top: 6px;
  padding: 8px 10px 8px 10px;
  max-width: 163px;

  border-radius: 20px;
  font-weight: 400;
  font-size: 12px;
  border: none;
  background-color: #ececec;
  //발신 메시지일때 말풍선 색깔
  &.owner {
    color: #fff;
    background-color: #fa3a45;
    margin-right: 16px;
  }
  &.bot {
    max-width: 240px;
    max-height: 185px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    border-radius: 4px;
    padding: 8px 10px 15px 10px;
    background-color: #f3f3f3;
  }
  &.leave {
    margin-top: 40px;
    margin-left: 73px;
    max-height: 37px;
    max-width: 230px;
    background-color: #eeeeee;
    border-radius: 4px;
    padding: 10px;
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 400;

    text-align: left;
    span {
      font-family: Pretendard;
      font-size: 14px;
      font-weight: 500;

      text-align: left;
    }
  }
  &.add {
    margin-top: 40px;
    margin-left: 73px;
    max-height: 37px;
    max-width: 230px;
    background-color: #eeeeee;
    border-radius: 4px;
    padding: 10px;
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 400;

    text-align: left;
    span {
      font-family: Pretendard;
      font-size: 14px;
      font-weight: 500;
      text-align: left;
    }
  }
`;
const AddMessage = styled.div`
  height: 37px;
  margin-top: 40px;
  background-color: #eee;
  display: flex;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
  position: relative;
  left: 124px;
  width: 210px;
  align-items: center;
  justify-content: center;

  span {
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 500;
  }
`;
const ConversatonTime = styled.div`
  width: 343px;
  height: 42px;
  display: flex;
  align-items: center;
  span {
    font-size: 14px;
    font-weight: 400;
    color: #808080;
    margin-left: 20px;
  }
  button {
    height: 26px;
    width: 50px;
    border-radius: 4px;
    background-color: #fa3a45;
    color: #fff;
    margin-left: 82px;
    font-size: 10px;
    font-weight: 400;
  }
`;
//말풍선 + 시간
const ChatBoxTime = styled.div`
  display: flex;
`;
const Time = styled.span`
  margin-right: 4px;
  display: flex;
  align-items: end;
  font-family: Pretendard;
  font-size: 10px;
  font-weight: 400;
  line-height: 12px;
  color: #999999;
`;
//채팅 칸 + 전송버튼
const InputSendBox = styled.div`
  display: flex;
  padding-left: 17px;
  margin-left: 4px;
  width: 267px;
  height: 45px;
  justify-content: space-between;
  border-radius: 9999px;
  border: 1px solid #e7e7e7;
`;
//채팅 칸
const ChatInput = styled.input`
  padding-left: 10px;
  font-weight: 400;
  font-size: 14px;
  outline: none;
  border: none;
`;
//전송버튼
const ChatSendBtn = styled.img`
  cursor: pointer;

  width: 52px;
  height: 40px;
`;
//이미지 div
const ChatImg = styled.div`
  background-size: cover;
  background-repeat: repeat;
  background-image: ${({ imgurl }) => `url(${imgurl})`};
  background-position: center;
  width: 150px;
  height: 150px;
  border-radius: 10%;
  border: none;
  @media only screen and (min-width: 320px) and (max-width: 650px) {
    width: 200px;
    height: 200px;
  }
`;

const ChatVideo = styled.video`
  background-size: cover;
  background-repeat: repeat;
  background-image: ${({ imgurl }) => `url(${imgurl})`};
  background-position: center;
  width: 300px;
  height: 300px;
  border-radius: 10%;
  border: none;
  @media only screen and (min-width: 320px) and (max-width: 650px) {
    width: 200px;
    height: 200px;
  }
`;

const LoadingDiv = styled.div`
  margin: auto;
  overflow-y: hidden;
  width: 375px;
  height: 812px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (min-width: 320px) and (max-width: 650px) {
    margin: auto;
    overflow-y: hidden;
    width: 375px;
    height: 812px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const UserProfileName = styled.div`
  height: 12px;
  border: none;
  font-weight: 400;
  color: #686868;
  font-size: 10px;
  margin-left: 4px;
`;
//전체 채팅 화면
const AllChatDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Download = styled.a`
  width: 88px;
  height: 38px;
  background-color: #c3f4ff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  font-family: 'Noto Sans KR', sans-serif;
`;

const FooterBox = styled.div`
  height: 812px;
  position: relative;
`;
const ModalCtn = styled.div`
  width: 100%;
  height: 100%;
  border: none;
  overflow: hidden;
  box-sizing: border-box;
  display: ${(isModal) => (isModal ? 'block' : 'none')};
  position: absolute;

  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0;

  z-index: 1000;
`;
//상대 프로필 전체 div
const ModalWrap = styled.div`
  position: absolute;
  border-radius: 5px;
  left: 4%;
  top: 15%;

  width: 342px;
  height: 429px;
  background-color: #dcf9ff;
  box-shadow: 10px 15px 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
`;
const StationInfoDiv = styled.div`
  height: 300px;
  display: flex;

  flex-direction: column;
  justify-content: flex;
`;
//닉네임 + 값
const TagDiv = styled.div`
  margin-top: 11px;
  margin-left: 23px;
  width: 227px;
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
//style + 값
const StatusTagDiv = styled.div`
  margin-top: 40px;
  margin-left: 23px;
  width: 267px;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
//닉네임 값
const Nickname = styled.div`
  padding-left: 8px;
  font-size: 16px;
  font-weight: 400;
  background-color: #ffffff;
  color: #797979;
  border-radius: 10px;
  width: 140px;
  height: 30px;
  display: flex;
  align-items: center;
`;
//닉네임 태그
const NickNameTag = styled.div`
  font-size: 16px;
  font-weight: 400;
  width: 50px;
  height: 19px;
`;
//상대방 프로필 이미지
const CounterProfileImg = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 20px;
  margin-left: 117px;
  margin-top: 18px;
`;
//상태메시지 태그
const StatusTag = styled.div`
  width: 100px;
  height: 20px;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 114px;
`;

const StatusMessage = styled.div`
  margin-top: -36px;
  padding-left: 8px;
  padding-top: 15px;
  font-size: 16px;
  font-weight: 400;
  background-color: #ffffff;
  color: #797979;
  border-radius: 10px;
  width: 180px;
  height: 100px;
  display: flex;
  margin-left: 17px;
`;
//
const ButtonBox = styled.div`
  margin-top: 13px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  button {
    height: 30px;
    width: 220px;

    border-radius: 4px;
    background-color: #8fb398;
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 500;
    color: #ffffff;
    &:disabled {
      opacity: 0.5;
    }
  }
`;
const Line = styled.div`
  border-top: 1px solid #ebebeb;
  width: 135px;
  height: 0px;
`;
const LineBox = styled.div`
  margin-left: 16px;
  width: 343px;
  height: 17px;
  gap: 8px;
  display: flex;
  align-items: center;
  span {
    font-family: Roboto;
    font-size: 11px;
    font-weight: 400;
    color: #888888;
  }
`;
