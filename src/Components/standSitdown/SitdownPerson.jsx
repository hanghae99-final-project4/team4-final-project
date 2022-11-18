import React from "react";
import styled from "styled-components";
import ToggleSwitch from "./ToggleSwitch";

const SitdownPerson = ({ isSit, setIsSit, isModal, setIsModal }) => {
  console.log(isSit);
  return (
    <>
      <SitdownPage>
        🌝앉아있는 사람에게 보이는 화면을 만들어보자👻
        <ChattingDiv>
          안태퐝님께서 채팅을 요청하였습니다
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
          <ToggleSwitch isSit={isSit} setIsSit={setIsSit} />
        </ToggleSwitchDiv>
        <ShareDiv onClick={() => setIsModal(!isModal)}>
          나는 모범시민이기 때문에 자리를 공유하고 싶어요!
        </ShareDiv>
        <ShareModalDiv>
          <StationDiv>해당역</StationDiv>
          <StationDiv>내리는 역</StationDiv>
          <StationDiv>해당 역의 칸 번호</StationDiv>
          <StationDiv>인상 착의</StationDiv>

          <SetBtn>등록하기</SetBtn>
        </ShareModalDiv>
      </SitdownPage>
    </>
  );
};

export default SitdownPerson;

const SitdownPage = styled.div`
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
  width: 400px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0833d2;
  color: white;
  border-radius: 10px;
  cursor: pointer;
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
  margin-top: 25px;
  border-radius: 10px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 40px;
  background-color: #0833d2;
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
