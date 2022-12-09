import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import useInput from "../../MyTools/Hooks/UseInput";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import _ from "lodash";
import HomeMenu from "../HomeMenu/HomeMenu";
import LoadingIcon from "../../Element/LoadingIcon";
import Header from "../Header/Header";
import ImageFormIcon from "../../Element/ImageFormIcon";
import CounterProfileModal from "../Modal/CounterProfileModal";
import { Cookies } from "react-cookie";
import { trainApi2 } from "../../Redux/Modules/Instance";
import FrontHeader from "../Header/FrontHeader";
import ChattingHome from "../HomeMenu/ChattingHome";

const socket = io(`${process.env.REACT_APP_SOCKET_URL}`);
const Chatting = () => {
  const name = JSON.parse(localStorage.getItem("nickname")).value;
  const profile = JSON.parse(localStorage.getItem("profile")).value;
  const roomkey = JSON.parse(localStorage?.getItem("roomkey"))?.value;
  const initialState = {
    url: profile,
    nickname: name,
    msg: "",
  };
  const [isModal, setIsModal] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [file, setFile] = useState([]);
  const [success, setSuccess] = useState(false);
  const [room, setRoom] = useState(null);
  const [chatArr, setChatArr] = useState([]);
  const [message, setMessage, onChangeHandler, reset] = useInput(initialState);
  const [scrollState, setScrollState] = useState(true);
  const [counter, setCounter] = useState([]);
  const [counterUser, setCounterUser] = useState([]);
  const navigate = useNavigate();

  const boxRef = useRef(null);
  const scrollRef = useRef();
  const inputRef = useRef();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const thURL = process.env.REACT_APP_TH_S_HOST;

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
  const scrollEvent = _.debounce(() => {
    console.log("scroll");
    const scrollTop = boxRef.current.scrollTop; //요소의 상단에서 맨 위에 표시 되는 콘텐츠까지의 거리를 측정한 것입니다.
    const clientHeight = boxRef.current.clientHeight; //뷰포트의 높이
    const scrollHeight = boxRef.current.scrollHeight; //뷰포트에 모든 콘텐츠를 맞추기 위해 요소에 필요한 최소 높이와 같습니다.

    //스크롤이 맨 아래에 있을때
    setScrollState(
      scrollTop + clientHeight >= scrollHeight - 100 ? true : false
    );
  }, 100);
  const scroll = React.useCallback(scrollEvent, []);

  //localStorage 만료시간
  function getItemWithExpireTime(keyName) {
    // localStorage 값 읽기 (문자열)
    const objString = window.localStorage.getItem(keyName);

    // null 체크
    if (!objString) {
      return null;
    }

    // 문자열을 객체로 변환
    const obj = JSON.parse(objString);

    // 현재 시간과 localStorage의 expire 시간 비교
    if (Date.now() > obj.expire) {
      // 만료시간이 지난 item 삭제
      window.localStorage.removeItem(keyName);
      alert("만료시간 지남");
      navigate("/converspage");

      // null 리턴
      return null;
    }

    // 만료기간이 남아있는 경우, value 값 리턴
    return obj.value;
  }

  //상대방 프로필
  const CounterUserHandler = (e) => {
    e.preventDefault();
    setIsModal(true);
    // console.log(counter);
    socket.emit("counteruser", {
      fair: counter.fair,
      ownself: counter.ownself,
    });
    socket.on(`${name}`, (message) => {
      // console.log(message);
      setCounterUser(message);
    });
    // console.log(counterUser);
  };

  ///매칭 순서대로 randomjoin => maching => name
  useEffect(() => {
    socket.emit("nickname", JSON.parse(localStorage.getItem("nickname")).value);
    if (roomkey !== undefined) {
      socket.emit("leaveRoom", roomkey);
      localStorage.removeItem("roomkey");
    }
    // console.log(roomkey);
    socket.emit("randomjoin", {
      train: JSON.parse(localStorage.getItem("train")).value,
      nickname: JSON.parse(localStorage.getItem("nickname")).value,
      dropstation: JSON.parse(localStorage.getItem("dropstation")).value,
      profile: JSON.parse(localStorage.getItem("profile")).value,
    });
    socket.on("maching", (message) => {
      console.log(message.msg);
    });

    socket.on(`${name}`, (message) => {
      // console.log(message, `${name}`);
      setCounter(message);
      //server 에 interval 돌아가는 코드를 강제로 종료 시킴 매칭 중복x
      socket.emit("end", "");
      socket.emit("joinFair", { roomkey: message.roomkey });
      setRoom(message.roomkey);
      setItemWithExpireTime("roomkey", message.roomkey, 3000000000);
      //roomkey 들어오면 success 값 true
      if (
        message.fail !== "매칭 가능한 상대방이 없습니다. 다시 시도해주세요." &&
        message.roomkey !== null
      ) {
        setSuccess(true);
        console.log("실행됨", success);
      } else {
        alert(message.fail);
      }
      console.log("success", success);

      //메시지 들어온대로 렌더 해주기
      socket.on("broadcast", (message) => {
        console.log(message);
        console.log(chatArr);
        getItemWithExpireTime("train");
        getItemWithExpireTime("nickname");
        getItemWithExpireTime("dropstation");
        setChatArr((chatArr) => [
          ...chatArr,
          {
            nickname: message.name,
            msg: message.msg,
            profile: message.profile,
            url: message.url,
          },
        ]);
      });
    });
  }, []);

  useEffect(() => {
    if (scrollState) {
      scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
      // scrollRef 의 element위치로 스크롤 이동 behavior는 전환 애니메이션의 정의
    }
  }, [chatArr]);
  useEffect(() => {
    boxRef?.current?.addEventListener("scroll", scroll);
  });

  //submithandler
  const SubmitHandler = (e) => {
    e.preventDefault();
    if (file?.name !== undefined) {
      postSend();
      setFile([]);
    }
    console.log("여기까지 실행");

    if (message.msg !== "") {
      socket.emit("persnalchat", {
        roomkey: room,
        msg: message.msg,
        nickname: message.nickname,
        profile: message.url,
      });
      console.log("chatting", {
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
    formData.append("image", file);
    formData.append("name", name);
    for (const key of formData.entries()) {
      console.log(key);
    }
    console.log(file);
    try {
      const { data } = await trainApi2.chattingForm(formData);
      console.log("잘받음", data);
      socket.emit("persnalchat", {
        url: data.img,
        nickname: data.name,
        roomkey: room,
      });

      setChatArr([...chatArr, { nickname: data.name, url: data.img }]);
    } catch (error) {
      console.log(error);
    }
  }

  socket.on("imgaeUP", (message) => {
    console.log(message);
  });
  const download = () => {
    window.location.assign();
  };
  console.log(chatArr?.url, chatArr?.nickname, chatArr);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {success ? (
        <FooterBox>
          <div style={{ height: "812px" }}>
            <FrontHeader msg={counterUser?.nickname} />
            <AllChatDiv>
              <ChatMainDiv ref={boxRef}>
                {isModal && (
                  <CounterProfileModal
                    gender={counterUser?.gender}
                    statusmessage={counterUser?.statusmessage}
                    nickname={counterUser?.nickname}
                    representProfile={counterUser?.representProfile}
                    setCounterUser={setCounterUser}
                    couterUser={counterUser}
                    isModal={isModal}
                    setIsModal={setIsModal}
                  />
                )}

                <ChatBox>
                  {" "}
                  {chatArr?.map((item, index) => (
                    <div
                      style={
                        name === item.nickname
                          ? {
                              width: "100%",
                              paddingLeft: "42%",

                              display: "flex",
                              justifyContent: "flex-end",
                            }
                          : {
                              width: "100%",
                            }
                      }
                    >
                      <UserChatDiv key={index}>
                        {/* 수신 발신 삼항 연산식 */}
                        {name === item.nickname ? (
                          <UserProfileDiv>
                            <UserProfileImg style={{ display: "none" }} />
                            <div style={{ display: "none" }}></div>
                          </UserProfileDiv>
                        ) : // profile 이 없는 사람은 기본 프로필 설정 삼항 연산자

                        item.profile !== undefined ? (
                          <UserProfileDiv>
                            <UserProfileImg
                              onClick={(e) => CounterUserHandler(e)}
                              src={item.profile}
                            />
                            <UserProfileName>{item.nickname}</UserProfileName>
                          </UserProfileDiv>
                        ) : (
                          <UserProfileDiv>
                            <UserProfileImg
                              onClick={(e) => CounterUserHandler(e)}
                              src={
                                "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/309/59932b0eb046f9fa3e063b8875032edd_crop.jpeg"
                              }
                            />
                            <UserProfileName>{item.nickname}</UserProfileName>
                          </UserProfileDiv>
                        )}

                        {/* 맨 처음에는 메시지가 없기때문에 문제가 되는군 */}
                        {/* 삼항연산자 중첩해서 사용하니, 코드가 가독성이 많이 떨어지는 것 같다 */}
                        {/* 차라리 이미지 확장자를 따로 변수에 넣어 &&연산자를 사용하는 것이 가장 좋을것 같다/ */}
                        {item.msg ? (
                          <ChatDiv
                            className={name === item.nickname && "owner"}
                          >
                            {item.msg}
                          </ChatDiv>
                        ) : item.url?.split(".")[5] == "mp4" ? (
                          <>
                            <ChatVideo
                              className={name === item.nickname && "owner"}
                              src={item?.url}
                            />
                            <Download href={item?.url}>다운로드</Download>
                          </>
                        ) : (
                          // <div>mp4</div>
                          <>
                            <ChatImg
                              className={name === item.nickname && "owner"}
                              imgurl={item?.url}
                            />
                            <Download href={item?.url}>다운로드</Download>
                          </>

                          // <div>img</div>
                        )}
                      </UserChatDiv>
                    </div>
                  ))}{" "}
                  <div ref={scrollRef} />
                </ChatBox>
              </ChatMainDiv>

              <FooterDiv>
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
                <ChatInput
                  placeholder="이미지 첨부는 이미지 첨부 후 전송 버튼 누르시오"
                  type="text"
                  value={message.msg}
                  name="msg"
                  onChange={onChangeHandler}
                />
                <ChatSendBtn onClick={(e) => SubmitHandler(e)}>
                  전송
                </ChatSendBtn>
              </FooterDiv>
            </AllChatDiv>
          </div>
          <ChattingHome />
        </FooterBox>
      ) : (
        <>
          <LoadingDiv>
            <LoadingIcon />
            {/* <PostDiv {...getRootProps()}>
              <PostPictureDiv className="preview">{thumb}</PostPictureDiv>
              <input
                {...getInputProps()}
                value={message.picture}
                name="picture"
                multiple="multiple"
                maxSize={300000000}
                accept="image/*,video/*"
                onChange={(e) => encodeFileToBase64(e.target.files[0])}
                type="file"
              />
            </PostDiv> */}
            {/* <button onClick={() => postSend()}>post 보내기</button>
            <input value={message.msg} onChange={onChangeHandler} name="msg" />
            <button onClick={() => sendHandler()}>제출</button> */}
            <ChattingHome />
          </LoadingDiv>
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
  height: 620px;
  width: 375px;
  padding: 0 16px;
`;
const SitdownHeader = styled.div`
  background-color: #f5f5f5;
  height: 60px;
`;
const FooterDiv = styled.form`
  display: flex;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-top: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
  bottom: -30px;
  background-color: #ffffff;
  height: 67px;
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
  width: 100%;
  height: 100%;
  overflow-x: hidden;
`;
//프로필 이미지
const UserProfileImg = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  border: none;
`;
//이름 + 프로필 이미지 div
const UserProfileDiv = styled.div`
  width: 200px;
  height: 50px;
  display: flex;

  flex-direction: row;
  justify-content: space-between;
`;

// 말풍선
const ChatDiv = styled.div`
  margin-top: 20px;
  padding: 10px 30px;
  width: 201px;
  min-height: 50px;
  position: relative;
  border-radius: 2em;
  font-size: 13px;
  border: none;
  background-color: #e6e6e6;
  //발신 메시지일때 말풍선 색깔
  &.owner {
    background-color: #dcf9ff;
    ::after {
      content: "";
      position: absolute;
      top: 0;

      left: 80%;
      width: 0;
      height: 0;
      border: 20px solid transparent;
      border-bottom-color: #dcf9ff;
      border-top: 0;
      border-right: 0;
      margin-left: -10px;
      margin-top: -20px;
    }
  }

  ::after {
    content: "";
    position: absolute;
    top: 0;
    left: 20%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-bottom-color: #eaeaea;
    border-top: 0;
    border-left: 0;
    margin-left: -10px;
    margin-top: -20px;
  }
`;
//채팅 칸
const ChatInput = styled.input`
  padding-left: 10px;
  font-size: 16px;
  outline: none;
  border: none;
  background-color: #eaeaea;
  border-radius: 30px;
  position: relative;
  left: 0%;
  width: 250px;
  height: 40px;
`;
//전송버튼
const ChatSendBtn = styled.button`
  background-color: #dcf9ff;
  margin-right: 13px;
  border-radius: 20px;
  cursor: pointer;
  border: none;
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
  width: 120px;
  height: 19px;
  border: none;
  position: relative;
  top: 35%;
  margin-right: 28px;
  font-size: 16px;
`;
//전체 채팅 화면
const AllChatDiv = styled.div`
  position: relative;
`;

const Download = styled.a`
  width: 88px;
  height: 38px;
  background-color: #c3f4ff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  font-family: "Noto Sans KR", sans-serif;
`;

const FooterBox = styled.div`
  height: 812px;
  position: relative;
`;
