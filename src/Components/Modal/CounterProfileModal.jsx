import React, { useState } from 'react';
import styled from 'styled-components';
import left from '../../Assets/Modal/left.svg';
import right from '../../Assets/Modal/right.svg';
import exit from '../../Assets/Chatting/Exit.svg';
import { useRef } from 'react';
import { useEffect } from 'react';
const CounterProfileModal = ({
  isModal,
  setIsModal,

  gender,
  statusmessage,
  nickname,
  representProfile,
}) => {
  const [image, setImage] = useState(false);
  //클릭하면 프로필 자세히보기
  const [current, setCurrent] = useState(0);
  const [profile, setProfile] = useState(representProfile?.[0]?.image_url);

  // 슬라이드 이동 만들기

  const [style, setStyle] = useState({
    marginLeft: `-${current}00%`,
  });

  const imgSize = useRef(representProfile?.length);

  // 슬라이드 버튼 이전 핸들러
  const handleSwipe = (direction) => {
    let next = current + direction;
    if (next < 0) next = imgSize.current - 1;
    else if (next >= imgSize.current) next = 0;

    setCurrent(next);
  };

  // 자동으로 찾기
  useEffect(() => {
    setStyle({ marginLeft: `-${current}00%` });
  }, [current]);

  //슬라이드 버튼 다음 핸들러
  //모달창 끄기 버튼
  const exitHandler = () => {
    setIsModal(!isModal);
  };

  const ImageHandler = (img) => {
    setImage(true);
    setProfile(img);
  };

  return (
    <ModalCtn className={image ? 'profile' : ''}>
      <ModalWrap background={profile} className={image ? 'profile' : ''}>
        <ImgWrap
          className={image ? 'profile' : ''}
          background={representProfile?.[current]?.image_url}
        >
          <img onClick={() => handleSwipe(-1)} src={left} />
          <div
            representProfile={representProfile?.[current]?.image_url}
            current={current}
            className="slider-track"
          >
            <div style={style} className="flex">
              {representProfile?.map((item, i) => (
                <CounterProfileImg
                  className={image ? 'profile' : ''}
                  onClick={() => ImageHandler(item?.image_url)}
                  src={item?.image_url}
                />
              ))}
            </div>
          </div>

          <img onClick={() => handleSwipe(1)} src={right} />
        </ImgWrap>
        <Nickname className={image ? 'profile' : ''}>
          {nickname && <NickNameTag>{nickname}</NickNameTag>}
          {!nickname && <NickNameTag>{'닉네임 설정을 해주세요'}</NickNameTag>}

          <Stick></Stick>
          {gender ? (
            <NickNameTag>{gender}</NickNameTag>
          ) : (
            <NickNameTag>{'성별이 없습니다'}</NickNameTag>
          )}
        </Nickname>
        <StatusTag className={image ? 'profile' : ''}>
          <StatusMessage>{statusmessage}</StatusMessage>
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
    background-size: cover;
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
  border-radius: 4px;

  display: flex;
  flex-direction: row;
  gap: 20px;
  &.profile {
    display: none;
  }
  img {
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
  }
  //
  div {
    transition: all 0.3s ease-in-out;
    &.slider-track {
      width: 100px;
      height: 100px;
      display: flex;
      overflow: hidden;
    }
    &.flex {
      display: flex;
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
  width: 100px;
  height: 100px;
  object-fit: cover;
  background-repeat: no-repeat;
  border-radius: 999px;
  cursor: pointer;
  flex: none;

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
