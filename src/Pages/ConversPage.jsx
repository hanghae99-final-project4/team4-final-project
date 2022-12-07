import React, { useCallback, useEffect } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import useInput from "../MyTools/Hooks/UseInput";
import styled from "styled-components";
import axios from "axios";
import { Cookies } from "react-cookie";
import HomeMenu from "../Components/HomeMenu/HomeMenu";
import Header from "../Components/Header/Header";
import { trainApi } from "../Redux/Modules/Instance";
import FrontHeader from "../Components/Header/FrontHeader";
import { ReactComponent as HowIcon } from "../Assets/Convers/How.svg";
import { useState } from "react";
import HelpModal from "../Components/Modal/HelpModal";
const cookies = new Cookies();

const token = cookies.get("token");
const ConversPage = () => {
  const initialState = {
    nickname: "",
    msg: "",
    gender: "",
    train: "",
    dropstation: "",
    from: false,
  };
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const thURL = process.env.REACT_APP_TH_S_HOST;
  const [message, setMessage, onChangeHandler, reset] = useInput(initialState);
  console.log(message);
  const name = JSON.parse(localStorage?.getItem("nickname"))?.value;
  console.log(name);
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
  const CanselHandler = () => {
    navigate("/subwaypage");
  };
  useEffect(() => {
    async function getNickname() {
      const { data } = await trainApi.getConvers();
      console.log(data.body);
      setMessage(data.body);
    }
    getNickname();
  }, []);
  console.log(message);

  return (
    <>
      <FrontHeader msg="환승시민" />
      <CoversCtn>
        <ProfileBox>
          <InfoDiv style={{ fontSize: "30px" }}>
            <span style={{ fontWeight: "700", fontSize: "20px" }}>
              몇 호선, 몇번 칸에 계신가요!
            </span>
            <span
              style={{ color: "#828282", fontWeight: "300", fontSize: "12px" }}
            >
              기입하신 정보를 바탕으로 자동 1:1 매칭이 이루어집니다.
            </span>
          </InfoDiv>
          <StationDiv>
            <SquareInfo>
              <HowDiv>
                <span style={{ fontSize: "14px", fontWeight: "1000" }}>
                  칸 정보
                </span>
                <HowIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => setModal(!modal)}
                />
                {modal && <HelpModal modal={modal} setModal={setModal} />}
              </HowDiv>

              <StationInfo
                placeholder="칸 정보 입력"
                value={message?.train}
                name="train"
                onChange={onChangeHandler}
              />
            </SquareInfo>

            <DropStationInfo>
              <span style={{ fontSize: "14px", fontWeight: "1000" }}>
                내리는 역
              </span>
              <DropStation
                placeholder="내리는 역 입력"
                value={message?.dropstation}
                name="dropstation"
                onChange={onChangeHandler}
              />
            </DropStationInfo>
          </StationDiv>
          <SpanDiv>
            <span
              style={{ fontSize: "20px", fontWeight: "600", marginTop: "px" }}
            >
              소중한 만남을 시작하시겠습니까?
            </span>
          </SpanDiv>
          <ButtonDiv>
            <CanselBtn
              style={{ fontWeight: "700", fontSize: "20px", color: "#5B5B5B" }}
              onClick={CanselHandler}
            >
              취소
            </CanselBtn>
            <StartCoversBtn
              style={{ fontWeight: "700", fontSize: "20px", color: "#5B5B5B" }}
              onClick={conversHandler}
            >
              다음
            </StartCoversBtn>
          </ButtonDiv>
        </ProfileBox>
        <HomeMenu />
      </CoversCtn>
    </>
  );
};

export default ConversPage;
const CoversCtn = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin: auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  @media only screen and (min-width: 375px) {
    overflow-y: hidden;
    width: 375px;
    height: 812px;

    display: flex;
    flex-direction: column;
    align-items: center;
    /* margin-left: 15px; */
  }
`;
const ProfileBox = styled.div`
  width: 100%;
  height: 399px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  @media only screen and (min-width: 375px) {
    margin-left: 15px;
    height: 399px;
  }
`;

const StationInfo = styled.input`
  background-color: white;

  width: 325.5px;
  height: 50px;
  border-bottom: 1px solid #000000;
  outline: none;
  font-size: 16px;
`;
const DropStation = styled.input`
  background-color: white;

  width: 325.5px;
  height: 50px;
  border-bottom: 1px solid #000000;
  outline: none;
  font-size: 16px;
`;
const StartCoversBtn = styled.button`
  margin-top: 0px;
  width: 160px;
  height: 60px;
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  border: none;
  font-size: 20px;
  background-color: #c3f4ff;
`;
const CanselBtn = styled.button`
  margin-top: 0px;
  width: 160px;
  height: 60px;
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  border: none;
  font-size: 20px;
  background-color: white;
`;
const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 15px;
  gap: 10px;
  @media only screen and (min-width: 375px) {
    margin-left: 10px;
  }
`;
const MenuDiv = styled.div`
  display: flex;
  justify-content: center;
`;
const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 45px;
`;
const StationDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;
const SquareInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const DropStationInfo = styled.div`
  margin-top: 35px;
  display: flex;
  flex-direction: column;
`;
const SpanDiv = styled.div`
  margin-top: 71.5px;
  @media only screen and (min-width: 375px) {
    margin-left: 33px;
  }
`;
const HowDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 3%;
`;
