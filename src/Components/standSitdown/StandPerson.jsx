import React from "react";
import styled from "styled-components";
import ToggleSwitch from "./ToggleSwitch";

const StandPerson = () => {
  return (
    <>
      <StandPage>
        <ChattingDiv>
          <MessageDiv>
            잠시 후에 강남에서 내리는 유저가 있습니다.{" "}
            <p>메시지를 터치하여 해당 좌석을 확인해주세요!</p>
          </MessageDiv>

          <ChattButtonDiv>
            <ConfirmButton style={{ fontSize: "20px", fontWeight: "600" }}>
              확인
            </ConfirmButton>
            <CanselButton style={{ fontSize: "20px", fontWeight: "600" }}>
              접기
            </CanselButton>
          </ChattButtonDiv>
        </ChattingDiv>
        <ToggleSwitchDiv>
          <ToggleSwitch />
        </ToggleSwitchDiv>
        <ShareDiv>자리를 공유받고 싶어요!</ShareDiv>
        <ShareModalDiv>
          <StationDiv>해당 역</StationDiv>
          <StationDiv>내리는 역</StationDiv>
          <StationDiv>해당 역의 칸 번호</StationDiv>

          <SetBtn>등록하기</SetBtn>
        </ShareModalDiv>
      </StandPage>
    </>
  );
};

export default StandPerson;

const StandPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  background-color: #ffffff;
  text-align: center;
  width: 100%;
  height: 100vh;
`;

const ChattingDiv = styled.div`
  background-color: #ffffff;
  border: 2px solid black;
  border-radius: 10px;
  position: relative;
  top: -40px;
  width: 500px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ChattButtonDiv = styled.div`
  width: 300px;
  margin-top: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  button {
    cursor: pointer;
  }
`;
const ConfirmButton = styled.button`
  width: 500px;
  background-color: transparent;
  border: none;
  border-right: 1px solid #d9d9d9;
`;
const CanselButton = styled.button`
  border-radius: 5px;
  width: 500px;
  background-color: transparent;
  border: none;
`;
const ShareDiv = styled.div`
  width: 420px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #43bdfb;
  color: white;
  border-radius: 10px;
`;
const ToggleSwitchDiv = styled.div`
  width: 300px;
  position: relative;
  margin-bottom: 20px;
  right: -180px;
`;
const ShareModalDiv = styled.div`
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  width: 600px;
  height: 450px;
  background-color: #ececec;
`;
const SetBtn = styled.div`
  cursor: pointer;
  margin-top: 60px;
  border-radius: 10px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 40px;
  background-color: #43bdfb;
`;
const StationDiv = styled.div`
  margin-top: 30px;
  border-radius: 10px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d9d9d9;
  width: 500px;
  height: 50px;
`;
const MessageDiv = styled.div`
  width: auto;
  height: 20px;
  margin-top: 30px;
`;
