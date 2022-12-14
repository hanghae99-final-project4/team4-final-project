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

// const socket = io(`${process.env.REACT_APP_SOCKET_URL}`);
const socket = io.connect(`${process.env.REACT_APP_SOCKET_URL}`, {
  path: "/socket.io",
  transports: ["websocket"],
});
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
  console.log(room);
  function setItemWithExpireTime(keyName, keyValue, tts) {
    // localStorage??? ????????? ??????
    const obj = {
      value: keyValue,
      expire: Date.now() + tts,
    };

    // ????????? JSON ???????????? ??????
    const objString = JSON.stringify(obj);

    // setItem
    window.localStorage.setItem(keyName, objString);
  }
  const scrollEvent = _.debounce(() => {
    console.log("scroll");
    const scrollTop = boxRef.current.scrollTop; //????????? ???????????? ??? ?????? ?????? ?????? ?????????????????? ????????? ????????? ????????????.
    const clientHeight = boxRef.current.clientHeight; //???????????? ??????
    const scrollHeight = boxRef.current.scrollHeight; //???????????? ?????? ???????????? ????????? ?????? ????????? ????????? ?????? ????????? ????????????.

    //???????????? ??? ????????? ?????????
    setScrollState(
      scrollTop + clientHeight >= scrollHeight - 100 ? true : false
    );
  }, 100);
  const scroll = React.useCallback(scrollEvent, []);

  //localStorage ????????????
  function getItemWithExpireTime(keyName) {
    // localStorage ??? ?????? (?????????)
    const objString = window.localStorage.getItem(keyName);

    // null ??????
    if (!objString) {
      return null;
    }

    // ???????????? ????????? ??????
    const obj = JSON.parse(objString);

    // ?????? ????????? localStorage??? expire ?????? ??????
    if (Date.now() > obj.expire) {
      // ??????????????? ?????? item ??????
      window.localStorage.removeItem(keyName);
      alert("???????????? ??????");
      navigate("/converspage");

      // null ??????
      return null;
    }

    // ??????????????? ???????????? ??????, value ??? ??????
    return obj.value;
  }

  //????????? ?????????
  const CounterUserHandler = () => {
    setIsModal(true);
    socket.emit("counteruser", {
      fair: counter.fair,
      ownself: counter.ownself,
    });
    socket.on(`${name}`, (message) => {
      console.log(message, "counteruser ????????? ??? ?????????");
      setItemWithExpireTime("roomkey", room, 3000000000);

      setCounterUser(message);
    });
    console.log(counterUser, "??? ????????? ?????? ");
  };

  ///?????? ???????????? randomjoin => maching => name
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
      //roomkey ??? ????????? ?????? ????????????
      if (message.roomkey !== undefined) {
        console.log(message, `?????? ??? ???????????? socket.on`);
        setCounter(message);

        //server ??? interval ???????????? ????????? ????????? ?????? ?????? ?????? ??????x
        socket.emit("end", "");
        socket.emit("joinFair", { roomkey: message.roomkey });
        console.log(message.roomkey);
        if (message.roomkey !== undefined) {
          setRoom(message.roomkey);
        }

        setItemWithExpireTime("roomkey", message.roomkey, 3000000000);
        //roomkey ???????????? success ??? true
        if (
          message.fail !==
            "?????? ????????? ???????????? ????????????. ?????? ??????????????????." &&
          message.roomkey !== undefined
        ) {
          setSuccess(true);
          console.log("?????????", success);
        } else {
          alert(message.fail);
          navigate("/converspage");
        }
        console.log("success", success);

        //????????? ??????????????? ?????? ?????????
        socket.on("broadcast", (message) => {
          console.log(message);
          console.log(chatArr);
          getItemWithExpireTime("train");
          getItemWithExpireTime("nickname");
          getItemWithExpireTime("dropstation");
          setChatArr((chatArr) => [
            ...chatArr,
            {
              roomkey: message.roomkey,
              nickname: message.name,
              msg: message.msg,
              profile: message.profile,
              url: message.url,
            },
          ]);
        });
      } else {
        setItemWithExpireTime("roomkey", room, 3000000000);
      }
    });
  }, []);

  useEffect(() => {
    if (scrollState) {
      scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
      // scrollRef ??? element????????? ????????? ?????? behavior??? ?????? ?????????????????? ??????
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
    console.log("???????????? ??????");

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

  //????????? ????????? ????????? ??????
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
      console.log("?????????", data);
      socket.emit("persnalchat", {
        url: data?.img,
        nickname: data?.name,
        roomkey: room,
      });
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
  // console.log(chatArr?.url, chatArr?.nickname, chatArr);

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
            <FrontHeader msg={counter?.fair} />
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
                        {/* ?????? ?????? ?????? ????????? */}
                        {name === item.nickname ? (
                          <UserProfileDiv>
                            <UserProfileImg style={{ display: "none" }} />
                            <div style={{ display: "none" }}></div>
                          </UserProfileDiv>
                        ) : // profile ??? ?????? ????????? ?????? ????????? ?????? ?????? ?????????

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

                        {/* ??? ???????????? ???????????? ??????????????? ????????? ????????? */}
                        {/* ??????????????? ???????????? ????????????, ????????? ???????????? ?????? ???????????? ??? ?????? */}
                        {/* ????????? ????????? ???????????? ?????? ????????? ?????? &&???????????? ???????????? ?????? ?????? ????????? ??????/ */}
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
                            <Download href={item?.url}>????????????</Download>
                          </>
                        ) : (
                          // <div>mp4</div>
                          <>
                            <ChatImg
                              className={name === item.nickname && "owner"}
                              imgurl={item?.url}
                            />
                            <Download href={item?.url}>????????????</Download>
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
                  placeholder="????????? ????????? ????????? ?????? ??? ?????? ?????? ????????????"
                  type="text"
                  value={message.msg}
                  name="msg"
                  onChange={onChangeHandler}
                />
                <ChatSendBtn onClick={(e) => SubmitHandler(e)}>
                  ??????
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
            {/* <button onClick={() => postSend()}>post ?????????</button>
            <input value={message.msg} onChange={onChangeHandler} name="msg" />
            <button onClick={() => sendHandler()}>??????</button> */}
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
//?????? ?????????
const ChatMainDiv = styled.div`
  overflow-y: hidden;
  height: 620px;
  width: 375px;
  padding: 0 0px;
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
//????????? + ????????? div
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
//?????? ?????????
const ChatBox = styled.div`
  border: none;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
`;
//????????? ?????????
const UserProfileImg = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  border: none;
`;
//?????? + ????????? ????????? div
const UserProfileDiv = styled.div`
  width: 200px;
  height: 50px;
  display: flex;

  flex-direction: row;
  justify-content: space-between;
`;

// ?????????
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
  //?????? ??????????????? ????????? ??????
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
//?????? ???
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
//????????????
const ChatSendBtn = styled.button`
  background-color: #dcf9ff;
  margin-right: 13px;
  border-radius: 20px;
  cursor: pointer;
  border: none;
  width: 52px;
  height: 40px;
`;
//????????? div
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
//?????? ?????? ??????
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
const ModalCtn = styled.div`
  width: 100%;
  height: 100%;
  border: none;
  overflow: hidden;
  box-sizing: border-box;
  display: ${(isModal) => (isModal ? "block" : "none")};
  position: absolute;

  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0;

  z-index: 1000;
`;
//?????? ????????? ?????? div
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
//????????? + ???
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
//style + ???
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
//????????? ???
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
//????????? ??????
const NickNameTag = styled.div`
  font-size: 16px;
  font-weight: 400;
  width: 50px;
  height: 19px;
`;
//????????? ????????? ?????????
const CounterProfileImg = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 20px;
  margin-left: 117px;
  margin-top: 18px;
`;
//??????????????? ??????
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
