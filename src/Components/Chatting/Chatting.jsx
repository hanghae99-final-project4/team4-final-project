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
import { trainApi2 } from '../../apis/Instance';
import Matching from '../../Pages/Matching/MatchingPage';
import { useRecoilValue } from 'recoil';
import { useArriveState, useStationState } from '../../Recoil/userList';
import chatbot from '../../Assets/Chatting/chatbot.svg';
import ban from '../../Assets/Chatting/ban.svg';
import FailPage from '../../Pages/Matching/FailPage';
import Timer from '../Timer/Timer';

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
  const [counterUser, setCounterUser] = useState([]);
  const [fail, setFail] = useState(true);

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

  const boxRef = useRef(null);
  const scrollRef = useRef();
  const inputRef = useRef();
  const cookies = new Cookies();
  const token = cookies.get('token');
  const thURL = process.env.REACT_APP_TH_S_HOST;

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
    console.log('scroll');
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
  const CounterUserHandler = () => {
    setIsModal(true);
    socket.emit('counteruser', {
      fair: counter.fair,
      ownself: counter.ownself,
    });
    socket.on(`${name}`, (message) => {
      console.log(message, 'counteruser 메시지 잘 받아요');

      setCounterUser(message);
    });
    console.log(counterUser, '난 카운터 유저 ');
  };

  //매칭 시작 nickname 보내고 위도 경도 / 출발호선 출발역/ 도착호선 도착역 보낸 다음 socket.on 받는데 ..
  ///매칭 순서대로 randomjoin => maching => name
  useEffect(() => {
    socket.emit('nickname', JSON.parse(localStorage.getItem('nickname')).value);

    socket.emit(
      'updatelocation',
      [lon, lat], //현재 위치 위도, 경도
      [`${startStation}:${startLine}`, `${station}:${line}`] //출발역 출발호선  도착역 도착호선  // ["인천터미널:인천선", "서울대입구:2호선"]
    );

    const handleSocketMessage = (message) => {
      if (message.roomkey !== null) {
        console.log(message.roomkey);
        console.log(message, `입장 시 불러오는 socket.on`);

        setCounter(message);
        console.log(message);
        console.log(message.roomkey);
        if (message.roomkey !== undefined) {
          setRoom(message.roomkey);
        }
        localStorage.setItem('room', message.roomkey);

        if (
          message.fail !==
          '매칭 가능한 상대방이 없습니다. 다시 시도해주세요. 뀨잉뀨잉'
        ) {
          socket.emit('stop', message.roomkey);
          socket.emit('joinroom', message.roomkey);
          socket.emit('chat-bot', message.roomkey);
          setSuccess(true);
          console.log('실행됨', success);
        } else {
          socket.off('stop', handleSocketMessage);
          socket.off('joinroom', handleSocketMessage);
          socket.off('chat-bot', handleSocketMessage);
          navigate('/failpage');
          console.log(message);
        }
        console.log('success', success);
      }
      socket.off(`${name}`, handleSocketMessage);
    };

    const handleBroadcastMessage = (message) => {
      console.log(message);
      console.log(chatArr);

      setChatArr((prevChatArr) => [
        ...prevChatArr,
        {
          roomkey: message.roomkey,
          nickname: message.name,
          msg: message.msg,
          profile: message.profile,
          url: message.url,
        },
      ]);
    };

    socket.on(`${name}`, handleSocketMessage);
    socket.on('broadcast', handleBroadcastMessage);

    return () => {
      socket.off(`${name}`, handleSocketMessage);
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
  const SubmitHandler = (e) => {
    console.log(e);
    e.preventDefault();
    if (file?.name !== undefined) {
      postSend();
      setFile([]);
    }
    console.log('여기까지 실행');

    if (message.msg !== '') {
      socket.emit('persnalchat', {
        roomkey: room,
        msg: message.msg,
        nickname: message.nickname,
        profile: message.url,
      });
      console.log('chatting', {
        roomkey: room,
        name: message.nickname,
        msg: message.msg,
        profile: message.url,
      });
      reset(initialState);
    }
  };

  //이미지 비디오 보내는 로직
  async function postSend() {
    const formData = new FormData();
    formData.append('chatImage', file);

    for (const key of formData.entries()) {
      console.log(key);
    }
    console.log(file);
    try {
      const name = JSON.parse(localStorage.getItem('nickname')).value;
      const { data } = await trainApi2.chattingForm(name, formData);
      console.log('잘받음', data);
      socket.emit('persnalchat', {
        profile: message.url,
        url: data?.url,
        nickname: data?.id,
        roomkey: room,
      });
    } catch (error) {
      console.log(error);
    }
  }

  socket.on('imgaeUP', (message) => {
    console.log(message);
  });
  const leaveHandler = () => {
    console.log('작동');
    socket.off('stop');
    socket.off('joinroom');
    socket.off('chat-bot');
    socket.emit('leaveRoom', roomkey);
    localStorage.removeItem('room');
    navigate('/subwaypage');
  };
  console.log(counter);

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
                  onClick={() => leaveHandler()}
                />
              </PointerBox>
              <ImgBox src={counter?.profile} margin="63px" />

              <MessageBox margin="6px">{counter?.fair}</MessageBox>
              <Chatbot margin="15px" src={chatbot} />
              <Ban src={ban} />
            </Header>
            <AllChatDiv>
              <ConversatonTime>
                <span>대화 시간</span>
                <Timer margin="80px" />
                <button>추가</button>
              </ConversatonTime>

              <ChatMainDiv ref={boxRef}>
                {isModal && (
                  <CounterProfileModal
                    gender={counterUser?.gender}
                    statusmessage={counterUser?.statusmessage}
                    nickname={counter?.fair}
                    representProfile={counter?.profile}
                    setCounterUser={setCounterUser}
                    couterUser={counterUser}
                    isModal={isModal}
                    setIsModal={setIsModal}
                  />
                )}
                <ChatBox>
                  {' '}
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
                              <Time>
                                {new Date().getHours() +
                                  ':' +
                                  String(new Date().getMinutes()).padStart(
                                    2,
                                    '0'
                                  )}
                              </Time>
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
                                  <Download href={item?.url}>다운로드</Download>
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
                                  <Download href={item?.url}>다운로드</Download>
                                </>

                                // <div>img</div>
                              )}
                            </ChatBoxTime>
                          </UserProfileDiv>
                        ) : // profile 이 없는 사람은 기본 프로필 설정 삼항 연산자

                        item.profile !== undefined ? (
                          <UserProfileDiv>
                            <UserProfileImg
                              onClick={(e) => CounterUserHandler(e)}
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
                                  <Download href={item?.url}>다운로드</Download>
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
                                  <Download href={item?.url}>다운로드</Download>
                                </>

                                // <div>img</div>
                              )}
                            </UserProfileNameChat>
                            <Time>
                              {new Date().getHours() +
                                ':' +
                                String(new Date().getMinutes()).padStart(
                                  2,
                                  '0'
                                )}
                            </Time>
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
                              ) : item.url?.split('.')[5] == 'mp4' ? (
                                <>
                                  <ChatVideo
                                    className={
                                      name === item.nickname && 'owner'
                                    }
                                    src={item?.url}
                                  />
                                  <Download href={item?.url}>다운로드</Download>
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
                                  <Download href={item?.url}>다운로드</Download>
                                </>

                                // <div>img</div>
                              )}
                            </UserProfileNameChat>
                            <Time>
                              {new Date().getHours() +
                                ':' +
                                String(new Date().getMinutes()).padStart(
                                  2,
                                  '0'
                                )}
                            </Time>
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
                  onChange={(e) => setFile(e.target.files[0])}
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
                  <ChatSendBtn
                    src={sendbtn}
                    onClick={(e) => SubmitHandler(e)}
                  />
                </InputSendBox>
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
  border: none;
  overflow-y: scroll;
  height: 551px;
  overflow-x: hidden;
`;
//프로필 이미지
const UserProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 22px;
  border: none;
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
  width: 309px;
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
  width: 300px;
  height: 300px;
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
