import React from "react";
import styled from "styled-components";
import ExitIcon from "../../Element/ExitIcon";

const CounterProfileModal = ({
  isModal,
  setIsModal,
  counterUser,
  setCounterUser,
  gender,
  statusmessage,
  nickname,
  representProfile,
}) => {
  console.log(counterUser);
  return (
    <ModalCtn>
      <ModalWrap>
        <CounterProfileImg src={representProfile} />
        <ExitIcon isModal={isModal} setIsModal={setIsModal} />
        <StationInfoDiv>
          <TagDiv>
            <NickNameTag>닉네임</NickNameTag>
            <Nickname>{nickname}</Nickname>
          </TagDiv>
          <TagDiv>
            <NickNameTag>성별</NickNameTag>
            <Nickname>{gender === true ? "여성" : "남성"}</Nickname>
          </TagDiv>
          <TagDiv>
            <NickNameTag>관심사</NickNameTag>
            <Nickname>#틱톡#연애</Nickname>
          </TagDiv>
          <TagDiv>
            <NickNameTag>취미</NickNameTag>
            <Nickname>#운동#테니스</Nickname>
          </TagDiv>
          <StatusTagDiv>
            <StatusTag>상태메시지</StatusTag>
            <StatusMessage>{statusmessage}</StatusMessage>
          </StatusTagDiv>
        </StationInfoDiv>
      </ModalWrap>
    </ModalCtn>
  );
};

export default CounterProfileModal;

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
