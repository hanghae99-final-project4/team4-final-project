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
          프로필 설정하기
        </ProfileSetBtn>
        <ProfileCloseBtn onClick={() => setIsModal(!isModal)}>
          나가기
        </ProfileCloseBtn>
      </ModalWrap>
    </ModalCtn>
  );
};

export default ProfileModal;

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
  left: 450px;
  top: 200px;

  width: 1100px;
  height: 500px;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const ModalProfileDiv = styled.div`
  width: 375px;
  height: 300px;
  display: flex;
  flex-direction: row;
  position: relative;
  right: 170px;
`;

const ProfileCloseBtn = styled.button`
  position: relative;
  bottom: -150px;
  width: 150px;
  height: 50px;
`;
const ProfileSetBtn = styled.button`
  width: 150px;
  height: 50px;
  position: relative;
  bottom: -150px;
  left: -100px;
`;
