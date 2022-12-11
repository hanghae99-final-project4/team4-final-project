import React from "react";
import styled from "styled-components";
import { ReactComponent as HelpModalIcon } from "../../Assets/Convers/Convers.svg";
import GuideExit from "../../Element/GuideExit";

const HelpModal = ({ modal, setModal }) => {
  console.log();
  return (
    <ModalCtn>
      <ModalWrap>
        <HelpModalIcon style={{ postition: "relative", margin: "0 auto" }} />
        <GuideExit isModal={modal} setIsModal={setModal} />
      </ModalWrap>
    </ModalCtn>
  );
};

export default HelpModal;

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
//상대 프로필 전체 div
const ModalWrap = styled.div`
  position: relative;
  border-radius: 5px;
  left: 40.7%;
  top: 20%;

  width: 307px;
  height: 370px;

  border-radius: 20px;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 320px) and (max-width: 600px) {
    position: relative;
    left: 2%;
    top: 22%;
  }
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
