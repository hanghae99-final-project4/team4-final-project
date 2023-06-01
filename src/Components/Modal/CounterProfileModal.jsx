import React, { useState } from 'react';
import styled from 'styled-components';
import left from '../../Assets/Modal/left.svg';
import right from '../../Assets/Modal/right.svg';
import exit from '../../Assets/Chatting/Exit.svg';
const CounterProfileModal = ({
  isModal,
  setIsModal,

  gender,
  statusmessage,
  nickname,
  representProfile,
}) => {
  const [image, setImage] = useState(false);
  const exitHandler = () => {
    setIsModal(!isModal);
  };
  return (
    <ModalCtn className={image ? 'profile' : ''}>
      <ModalWrap
        background={representProfile}
        className={image ? 'profile' : ''}
      >
        <ImgWrap
          className={image ? 'profile' : ''}
          background={representProfile}
        >
          <img src={left} />
          <CounterProfileImg
            className={image ? 'profile' : ''}
            onClick={() => setImage(true)}
            src={representProfile}
          />
          <img src={right} />
        </ImgWrap>
        <Nickname className={image ? 'profile' : ''}>
          <NickNameTag>{nickname}</NickNameTag>

          <Stick></Stick>
          <NickNameTag>{'남자'}</NickNameTag>
        </Nickname>
        <StatusTag className={image ? 'profile' : ''}>
          <StatusMessage>
            {
              ' 내 나이를 물으신다면 대답 해 드리는게 인지상정 ! 나 로사, 나 로이 난 냐옹이다옹'
            }
          </StatusMessage>
        </StatusTag>
        <ExitBtn className={image ? 'profile' : ''} onClick={exitHandler}>
          닫기
        </ExitBtn>
        <ExitIcon
          onClick={() => setImage(!image)}
          src={exit}
          className={image ? 'profile' : ''}
        />
      </ModalWrap>
    </ModalCtn>
  );
};

export default CounterProfileModal;

export const ModalCtn = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);

  border: none;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  margin: 0 auto;
  z-index: 1000;
  &.profile {
    background: #383838;
  }
`;
//상대 프로필 전체 div
const ModalWrap = styled.div`
  border-radius: 5px;
  background: #ffffff;
  box-shadow: 0px 4px 4px 0px #6c6c6c40;

  width: 300px;
  height: 310px;

  display: flex;
  flex-direction: column;
  align-items: center;
  &.profile {
    width: 375px;
    height: 500px;
    display: flex;
    transform: scale(1);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: ${(props) => `url(${props.background})`};
  }
`;
const ImgWrap = styled.div`
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.3)
    ),
    ${(props) => `url(${props.background})`};
  background-repeat: no-repeat;
  background-size: cover;
  width: 300px;
  height: 162px;
  filter: blur(1.5px);
  display: flex;
  flex-direction: row;
  gap: 20px;
  &.profile {
    display: none;
  }
  img {
    .rdg-image {
      image-rendering: -moz-crisp-edges; /* Firefox */
      image-rendering: -o-crisp-edges; /* Opera */
      image-rendering: -webkit-optimize-contrast; /* Webkit 표준 X */
      image-rendering: crisp-edges;
      -ms-interpolation-mode: nearest-neighbor; /* IE 표준 X */
    }

    .rdg-image {
      -ms-transform: translateZ(0); // ie
      -moz-transform: translateZ(0); // firefox
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }
    .rdg-image {
      -moz-backface-visibility: hidden; // firefox
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
    }
  }
`;

const ExitIcon = styled.img`
  &.profile {
    cursor: pointer;
    position: absolute;
    top: 5px;
    right: 10px;
  }
`;
//닉네임 + 값
const ExitBtn = styled.button`
  height: 30px;
  width: 278px;
  border-radius: 4px;

  font-size: 12px;
  font-weight: 500;
  color: #8fb398;

  border: 1px solid #8fb3984d;
  &.profile {
    display: none;
  }
`;
//style + 값
const Stick = styled.div`
  width: 10px;
  height: 0px;

  border: 1px solid rgba(255, 255, 255, 0.8);
  transform: rotate(90deg);
  &.profile {
    display: none;
  }

  /* Inside auto layout */
`;
//닉네임 값
const Nickname = styled.div`
  height: 30px;
  width: 160px;
  position: relative;
  bottom: 15px;
  border-radius: 999px;
  padding: 10px;
  background-color: #8fb398;
  align-items: center;
  justify-content: center;
  display: flex;
  gap: 10px;
  &.profile {
    display: none;
  }
`;
//닉네임 태그
const NickNameTag = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #fff;
`;
//상대방 프로필 이미지
const CounterProfileImg = styled.img`
  transform: scale(1);
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 999px;
  cursor: pointer;

  .rdg-image {
    image-rendering: -moz-crisp-edges; /* Firefox */
    image-rendering: -o-crisp-edges; /* Opera */
    image-rendering: -webkit-optimize-contrast; /* Webkit 표준 X */
    image-rendering: crisp-edges;
    -ms-interpolation-mode: nearest-neighbor; /* IE 표준 X */
  }

  .rdg-image {
    -ms-transform: translateZ(0); // ie
    -moz-transform: translateZ(0); // firefox
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
  .rdg-image {
    -moz-backface-visibility: hidden; // firefox
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
`;
//상태메시지 태그
const StatusTag = styled.div`
  height: 70px;
  width: 278px;

  border-radius: 4px;
  padding: 10px;
  &.profile {
    display: none;
  }
`;

const StatusMessage = styled.span`
  font-size: 12px;
  font-weight: 400;
  text-align: left;
  color: #1f1f1f;
`;
