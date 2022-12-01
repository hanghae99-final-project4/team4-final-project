import React from "react";
import styled from "styled-components";

const ProfileModal = ({
  isModal,
  setIsModal,
  url,
  setUrl,
  inputRef,
  files,
  thumb,
}) => {
  const PictureUpload = () => {
    inputRef.current.click();
  };

  return (
    <ModalCtn>
      <ModalWrap>
        <ModalProfileDiv>{thumb}</ModalProfileDiv>

        <ProfileSetBtn onClick={() => PictureUpload()}>
          프로필 사진 바꾸기
        </ProfileSetBtn>
        <ProfileCloseBtn onClick={() => setIsModal(!isModal)}>
          저장 후 나가기
        </ProfileCloseBtn>
      </ModalWrap>
    </ModalCtn>
  );
};

export default ProfileModal;

// 프로필 프리뷰 5장 고르는 곳입니다.
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
  left: 300px;
  top: 200px;
  width: 800px;
  height: 500px;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

// 이미지 5장 움직 일 수 있는 곳입니다.
const ModalProfileDiv = styled.div`
  width: 800px;
  height: 300px;
  display: flex;
  gap: 20px;
  flex-direction: row;
  align-items: center;
  position: relative;
  right: -80px;
`;

// 저장 하기 버튼입니다.
const ProfileCloseBtn = styled.button`
  position: relative;
  bottom: -150px;
  width: 150px;
  height: 50px;
  border: 2px solid #71c9dd;
  border-radius: 30px;
  right: 500px;
  font-size: 14px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
const ProfileSetBtn = styled.button`
  width: 150px;
  height: 50px;
  position: relative;
  bottom: -150px;
  left: -100px;
  border: 2px solid #71c9dd;
  border-radius: 30px;
  font-size: 14px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
