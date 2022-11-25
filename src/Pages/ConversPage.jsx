import React, { useCallback, useEffect } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import useInput from "../MyTools/Hooks/UseInput";
import styled from "styled-components";
import axios from "axios";
import { Cookies } from "react-cookie";
const cookies = new Cookies();
const socket = io(`${process.env.REACT_APP_SOCKET_URL}`);
const token = cookies.get("token");
console.log(token);
const ConversPage = () => {
  const initialState = {
    nickname: "",
    msg: "",
    gender: "",
    train: "",
    dropstation: "",
    from: false,
  };
  const navigate = useNavigate();
  const thURL = process.env.REACT_APP_TH_S_HOST;
  const [message, setMessage, onChangeHandler, reset] = useInput(initialState);
  console.log(message);
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
  const conversHandler = () => {
    setItemWithExpireTime("train", message.train, 3000000000);
    setItemWithExpireTime("profile", message.representProfile, 3000000000);
    setItemWithExpireTime("nickname", message.nickname, 30000000000);
    setItemWithExpireTime("dropstation", message.dropstation, 30000000000);
    reset("");
    navigate("/chattingpage");
  };
  useEffect(() => {
    async function getNickname() {
      const { data } = await axios.get(
        `${thURL}/profile`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data)
      setMessage(data.body);
    }
    getNickname();
  }, []);
  console.log(message);

  return (
    <CoversCtn>
      <ProfileBox>
        <ProfileImg src={message.representProfile} />
        <UserProfileInfoDiv>
          <NicknameDiv
            onChange={onChangeHandler}
            name="nickname"
            value={message.nickname}
            style={{ fontSize: "25px", fontWeight: "600" }}
          >
            닉네임:{message.nickname}
          </NicknameDiv>
          <GenderDiv
            value={message.gender}
            name="gender"
            onChange={onChangeHandler}
            style={{ fontSize: "25px", fontWeight: "600" }}
          >
            성별:{message.gender}
          </GenderDiv>
        </UserProfileInfoDiv>
      </ProfileBox>
      <div style={{ fontSize: "30px" }}>몇 호선 몇번 칸에 계신지 써주세요</div>
      <StationInfo
        value={message.train}
        name="train"
        onChange={onChangeHandler}
      />
      <div style={{ fontSize: "30px" }}>내리는 역을 써주세요</div>
      <DropStation
        value={message.dropstation}
        name="dropstation"
        onChange={onChangeHandler}
      />
      <div style={{ fontSize: "24px" }}>소중한 만남 시작하시겠습니까?</div>

      <StartCoversBtn onClick={conversHandler}>대화 시작</StartCoversBtn>
    </CoversCtn>
  );
};

export default ConversPage;
const CoversCtn = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #e6e6e6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
const ProfileBox = styled.div`
  width: 800px;
  height: 300px;
  border: none;
  display: flex;
  flex-direction: row;
`;
const ProfileImg = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 10px;
`;
const UserProfileInfoDiv = styled.div`
  border: none;
  width: 500px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
const NicknameDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 10px;
  background-color: white;
  width: 200px;
  height: 40px;
`;
const GenderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 10px;
  background-color: white;
  width: 200px;
  height: 40px;
`;
const StationInfo = styled.input`
  background-color: white;
  border-radius: 10px;
  width: 800px;
  height: 50px;
  border: none;
  outline: none;
  font-size: 24px;
`;
const DropStation = styled.input`
  background-color: white;
  border-radius: 10px;
  width: 800px;
  height: 50px;
  border: none;
  outline: none;
  font-size: 24px;
`;
const StartCoversBtn = styled.button`
  width: 300px;
  height: 45px;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  font-size: 20px;
  background-color: #aff4c6;
`;
