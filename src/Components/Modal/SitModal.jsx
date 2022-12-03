import React from "react";
import styled from "styled-components";

const SitModal = ({ isModal, setIsModal }) => {
  return (
    <ModalCtn>
      <ModalWrap>
      
        <StationInfoDiv>
          <TheStDiv>해당 역</TheStDiv>
          <DropStationDiv>내리는 역</DropStationDiv>
          <DropStationDiv>해당 역의 칸 번호</DropStationDiv>
          <DropStationDiv>인상 착의</DropStationDiv>
        </StationInfoDiv>
        <ModalBtnDiv>
          <AppendBtn>등록하기</AppendBtn>
          <ExitBtn onClick={() => setIsModal(!isModal)}>닫기</ExitBtn>
        </ModalBtnDiv>
      </ModalWrap>
    </ModalCtn>
  );
};

export default SitModal;

const ModalCtn = styled.div`
  width: 100%;
  height: 100%;
  border: none;
  overflow: hidden;
  box-sizing: border-box;
  display: ${(isModal) => (isModal ? "block" : "none")};
  position: fixed;

  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;
const ModalWrap = styled.div`
  position: relative;
  border-radius: 5px;
  left: 600px;
  top: 300px;

  width: 700px;
  height: 500px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
const StationInfoDiv = styled.div`
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
const TheStDiv = styled.div`
  background-color: #e6e6e6;
  border-radius: 10px;
  width: 500px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const DropStationDiv = styled.div`
  width: 500px;
  height: 50px;
  border: 0.5px solid black;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const ModalBtnDiv = styled.div`
  margin-bottom: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 60px;
`;
const AppendBtn = styled.button`
  width: 100px;
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: #aff4c6;
  cursor: pointer;
`;
const ExitBtn = styled.button`
  width: 100px;
  border: none;
  height: 50px;
  border-radius: 10px;
  background-color: #aff4c6;
  cursor: pointer;
`;
