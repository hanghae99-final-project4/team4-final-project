import React, { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import useInput from "../../MyTools/Hooks/UseInput";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import axios from "axios";
import _ from "lodash";
const socket = io(`${process.env.REACT_APP_SOCKET_URL}`);

const Chatting = () => {
  const name = JSON.parse(localStorage.getItem("nickname")).value;
  const initialState = {
    url: "https://anths3.s3.ap-northeast-2.amazonaws.com/myproject/1668428140925.jpg",
    nickname: `${name}`,
    msg: "",
  };

  const [imageSrc, setImageSrc] = useState("");
  const [file, setFile] = useState([]);
  const [success, setSuccess] = useState(false);
  const [room, setRoom] = useState(null);
  const [chatArr, setChatArr] = useState([]);
  const [message, setMessage, onChangeHandler, reset] = useInput(initialState);
  const [scrollState, setScrollState] = useState(true);
  const navigate = useNavigate();

  const boxRef = useRef(null);
  const scrollRef = useRef();
  console.log(name);
  console.log(room);
  console.log(message);

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

  //form data 로직
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);

    setFile(
      acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      )
    );
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });
  //encode
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        console.log(reader);
        resolve();
      };
    });
  };
  //preview!!
  const thumb = file?.map((file, index) => {
    return (
      <img
        key={index}
        style={{ width: "100%", height: "200px" }}
        src={file.preview}
        alt="preview-img"
      />
    );
  });

  ///매칭 순서대로 randomjoin => maching => name
  useEffect(() => {
    socket.emit("nickname", JSON.parse(localStorage.getItem("nickname")).value);
    socket.emit("randomjoin", {
      train: JSON.parse(localStorage.getItem("train")).value,
      nickname: JSON.parse(localStorage.getItem("nickname")).value,
      dropstation: JSON.parse(localStorage.getItem("dropstation")).value,
    });
    socket.on("maching", (message) => {
      console.log(message.msg);
    });

    socket.on(`${name}`, (message) => {
      console.log(message, `${name}`);
      //server 에 interval 돌아가는 코드를 강제로 종료 시킴 매칭 중복x
      socket.emit("end", "");
      socket.emit("joinFair", { roomkey: message.roomkey });
      setRoom(message.roomkey);
      //roomkey 들어오면 success 값 true
      if (room !== undefined) {
        setSuccess(true);
      } else {
        return;
      }
      console.log("success true");

      //메시지 들어온대로 렌더 해주기
      socket.on("broadcast", (message) => {
        console.log(message);
        console.log(chatArr);
        getItemWithExpireTime("train");
        getItemWithExpireTime("nickname");
        getItemWithExpireTime("dropstation");
        setChatArr((chatArr) => [
          ...chatArr,
          { nickname: message.name, msg: message.msg },
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
    socket.emit("persnalchat", {
      roomkey: room,
      msg: message.msg,
      nickname: message.nickname,
    });
    console.log("chatting", {
      roomkey: room,
      name: message.nickname,
      msg: message.msg,
    });
    reset(initialState);
  };
  //이미지 비디오 보내는 로직
  async function postSend() {
    const formData = new FormData();
    formData.append("image", file[0]);
    for (const key of formData.entries()) {
      console.log(key);
    }
    console.log(file);
    try {
      const { data } = await axios.post("", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("잘받음", data);
    } catch (error) {
      console.log(error);
    }
    socket.on("imgaeUP", (message) => {
      console.log(message);
    });
  }
  console.log(file[0]?.preview);
  const sendHandler = () => {
    //   const formData = new FormData();
    //   formData.append("image", postPicture[0]);
    //   for (const key of formData.entries()) {
    //     console.log(key);
    //   }
    //   socket.emit("imgaeUP", {
    //     image: postPicture[0]?.preview,
    //   });
    //   socket.on("imgaeUP", (message) => {
    //     console.log(message);
    //   });
  };
  //     socket.emit("randomchat", {
  //       msg: message.msg,
  //       roomkey: room,
  //     });
  // socket.on("broadcast", (message) => {
  //   console.log(message.msg);
  // });
  // };
  // };

  //   socket.emit("imagaeUP", {
  //     image: formData,
  //   });

  //   socket.on("broadcast", (message) => {
  //     console.log(message.msg);
  //   });
  // };
  //   socket.emit("randomchat", {
  //     msg: message.msg,
  //     roomkey: room,
  //   });

  //   socket.on("broadcast", (message) => {
  //     console.log(message.msg);
  //   });
  // };

  return (
    <div>
      {success ? (
        <>
          <SitdownHeader styled={{ fontSize: "16" }}>채팅방</SitdownHeader>
          <ChatMainDiv ref={boxRef}>
            <ChatBox>
              {" "}
              {chatArr?.map((item, index) => (
                <UserChatDiv
                  style={
                    name === item.nickname
                      ? {
                          position: "relative",
                          right: "-80%",
                        }
                      : { position: "relative", right: "0px" }
                  }
                  key={index}
                >
                  {name === item.nickname ? (
                    <UserProfileDiv>
                      <UserProfileImg style={{ display: "none" }} />
                      <div style={{ display: "none" }}></div>
                    </UserProfileDiv>
                  ) : (
                    <UserProfileDiv>
                      <UserProfileImg src="https://ifh.cc/g/YOrnMQ.jpg" />
                      <div>{item.nickname}</div>
                    </UserProfileDiv>
                  )}

                  <UserChat>
                    {/* 맨 처음에는 메시지가 없기때문에 문제가 되는군 */}
                    {/* 삼항연산자 중첩해서 사용하니, 코드가 가독성이 많이 떨어지는 것 같다 */}
                    {/* 차라리 이미지 확장자를 따로 변수에 넣어 &&연산자를 사용하는 것이 가장 좋을것 같다/ */}
                    {item.msg ? (
                      <ChatDiv>{item.msg}</ChatDiv>
                    ) : item.url?.split(".")[5] == "mp4" ? (
                      <ChatVideo src={item?.url} />
                    ) : (
                      // <div>mp4</div>
                      <ChatImg src={item?.url} />
                      // <div>img</div>
                    )}
                  </UserChat>
                </UserChatDiv>
              ))}{" "}
              <div ref={scrollRef} />
            </ChatBox>
          </ChatMainDiv>

          <FooterDiv>
            <ChatInput
              type="text"
              value={message.msg}
              name="msg"
              onChange={onChangeHandler}
            />
            <ChatSendBtn onClick={(e) => SubmitHandler(e)}>전송</ChatSendBtn>
          </FooterDiv>
        </>
      ) : (
        <div>
          Chatting
          <PostDiv {...getRootProps()}>
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
          </PostDiv>
          <button onClick={() => postSend()}>post 보내기</button>
          <input value={message.msg} onChange={onChangeHandler} name="msg" />
          <button onClick={() => sendHandler()}>제출</button>
        </div>
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
const ChatMainDiv = styled.div`
  height: 700px;
`;
const SitdownHeader = styled.div`
  background-color: #d9d9d9;
  height: 60px;
`;
const FooterDiv = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  bottom: -115px;
  background-color: #d9d9d9;
  height: 60px;
`;
const UserChatDiv = styled.div`
  border: none;
  width: 300px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border: none;
`;

const ChatBox = styled.div`
  border: none;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
`;
const UserProfileImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  border: none;
`;
const UserProfileDiv = styled.div`
  width: 100px;
  display: flex;
  border: none;
  flex-direction: row;
  justify-content: space-between;
`;
const UserChat = styled.div`
  height: 0px;
`;
const ChatDiv = styled.div`
  width: 100px;
  border: none;
  background-color: #e6e6e6;
`;
const ChatInput = styled.input`
  outline: none;
  border: none;
  width: 500px;
  height: 30px;
`;
const ChatSendBtn = styled.button`
  background-color: #ffffff;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  width: 45px;
  height: 30px;
`;
const ChatImg = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 10%;
  border: none;
`;
const ChatVideo = styled.video`
  width: 300px;
  height: 300px;
  border-radius: 10%;
  border: none;
`;
