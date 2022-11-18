// import React, { useEffect } from "react";
// import { io } from "socket.io-client";
// import styled from "styled-components";
// import { useState } from "react";
// import useInput from "../../MyTools/Hooks/UseInput";
// import { useNavigate } from "react-router-dom";
// const socket = io("https://cheolsu.shop/");
// const ChatMain = () => {
//   const initialState = {
//     url: "https://anths3.s3.ap-northeast-2.amazonaws.com/myproject/1668428140925.jpg",
//     nickname: "윤지",
//     msg: "이거 봐봐",
//     gender: "여성",
//     train: 7143,
//     dropstation: "강남역",
//     from: false,
//   };
//   const navigate = useNavigate();
//   const [chatArr, setChatArr] = useState([initialState]);
//   const [message, onChangeHandler, reset] = useInput(initialState);
//   //localStorage 만료시간
//   function getItemWithExpireTime(keyName) {
//     // localStorage 값 읽기 (문자열)
//     const objString = window.localStorage.getItem(keyName);

//     // null 체크
//     if (!objString) {
//       return null;
//     }

//     // 문자열을 객체로 변환
//     const obj = JSON.parse(objString);

//     // 현재 시간과 localStorage의 expire 시간 비교
//     if (Date.now() > obj.expire) {
//       // 만료시간이 지난 item 삭제
//       window.localStorage.removeItem(keyName);
//       alert("만료시간 지남");
//       navigate("/converspage");

//       // null 리턴
//       return null;
//     }

//     // 만료기간이 남아있는 경우, value 값 리턴
//     return obj.value;
//   }
//   const SubmitHandler = () => {
//     socket.emit("randomchat", {
//       msg: message.msg,
//       nickname: message.nickname,
//       gender: message.gender,
//       train: message.train,
//       dropstation: message.dropstation,
//     });
//     console.log("chatting", {
//       name: message.nickname,
//       msg: message.msg,
//       gender: message.gender,
//       train: message.train,
//       drop: message.dropstation,
//     });
//     reset(initialState);
//   };

//   useEffect(() => {
//     // socket.emit("randomjoin", {
//     //   train: JSON.parse(localStorage.getItem("train")).value,
//     //   nickname: JSON.parse(localStorage.getItem("nickname")).value,
//     //   dropstation: JSON.parse(localStorage.getItem("dropstation")).value,
//     // });
//   }, []);
//   useEffect(() => {
//     socket.on("broadcast", (message) => {
//       console.log(message);
//       console.log(chatArr);
//       getItemWithExpireTime("train");
//       getItemWithExpireTime("nickname");
//       getItemWithExpireTime("dropstation");
//       setChatArr((chatArr) => [
//         ...chatArr,
//         { nickname: message.nickname, msg: message.msg },
//       ]);
//     });
//   }, []);
//   console.log(chatArr[0].url);
//   return (
//     <>
//       <SitdownHeader styled={{ fontSize: "16" }}>채팅방</SitdownHeader>
//       <ChatMainDiv>
//         {chatArr.map((item, index) => (
//           <UserChatDiv key={index}>
//             <UserProfileDiv>
//               <UserProfileImg src="https://ifh.cc/g/YOrnMQ.jpg" />
//               <div>{item.nickname}</div>
//             </UserProfileDiv>
//             {/* userChat이 mp4 파일이면 video 로 보여주고 아니면 img 로 보여주게 하기.  */}
//             <UserChat>
//               {item.url.split(".")[5] == "mp4" ? (
//                 <ChatVideo src={item.url} />
//               ) : (
//                 <ChatImg src={item.url} />
//               )}

//               <ChatDiv>{item.msg}</ChatDiv>
//             </UserChat>
//           </UserChatDiv>
//         ))}
//       </ChatMainDiv>
//       <FooterDiv>
//         <ChatInput
//           type="text"
//           value={message.msg}
//           name="msg"
//           onChange={onChangeHandler}
//         />
//         <ChatSendBtn onClick={() => SubmitHandler()}>전송</ChatSendBtn>
//       </FooterDiv>
//     </>
//   );
// };

// export default ChatMain;

// const ChatMainDiv = styled.div`
//   height: 700px;
//   overflow-y: scroll;
// `;
// const SitdownHeader = styled.div`
//   background-color: #d9d9d9;
//   height: 60px;
// `;
// const FooterDiv = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   position: relative;
//   bottom: -115px;
//   background-color: #d9d9d9;
//   height: 60px;
// `;
// const UserChatDiv = styled.div`
//   border: none;
//   width: 300px;
//   height: 100px;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-around;
// `;
// const UserProfileImg = styled.img`
//   width: 30px;
//   height: 30px;
//   border-radius: 5px;
// `;
// const UserProfileDiv = styled.div`
//   width: 100px;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
// `;
// const UserChat = styled.div`
//   height: 0px;
// `;
// const ChatDiv = styled.div`
//   width: 100px;
//   background-color: #e6e6e6;
// `;
// const ChatInput = styled.input`
//   outline: none;
//   border: none;
//   width: 500px;
//   height: 30px;
// `;
// const ChatSendBtn = styled.button`
//   background-color: #ffffff;
//   border-radius: 5px;
//   cursor: pointer;
//   border: none;
//   width: 45px;
//   height: 30px;
// `;
// const ChatImg = styled.img`
//   width: 300px;
//   height: 300px;
//   border-radius: 10%;
// `;
// const ChatVideo = styled.video`
//   width: 300px;
//   height: 300px;
//   border-radius: 10%;
// `;
