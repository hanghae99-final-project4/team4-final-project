import React, { useState } from 'react';
import styled from 'styled-components';
import first from '../../Assets/Guide/first.svg';
import second from '../../Assets/Guide/second.svg';
import third from '../../Assets/Guide/third.svg';
import firstimg from '../../Assets/Guide/firstImg.svg';
import secondimg from '../../Assets/Guide/secondImg.svg';
import thirdimg from '../../Assets/Guide/thirdImg.svg';
import chattingimg from '../../Assets/Guide/chatting.svg';
const Guide = () => {
  const [guide, setguide] = useState('1');
  const guideList = [
    { id: '1', value: '매칭하기' },
    { id: '2', value: '채팅방이용' },
  ];
  const toggleHandler = (e) => {
    setguide((prev) => {
      return e.target.id;
    });
  };
  return (
    <Wrap>
      <ButtonBox>
        {guideList.map((item) => (
          <GuideButton
            id={item.id}
            value={item.value}
            onClick={toggleHandler}
            className={item.id === guide ? 'active' : ''}
          >
            {item.value}
          </GuideButton>
        ))}
      </ButtonBox>
      {guide === '1' ? (
        <>
          <TextBox margin="50px">
            <img src={first} alt="first" />
            <Text>{'도착역을 설정합니다.(출발역은 자동매칭)'}</Text>
          </TextBox>
          <ImgBox margin="20px">
            <img src={firstimg} />
          </ImgBox>
          <Subspan>
            ·위치 엑세스를 ‘허용’ 해주셔야 서비스 이용이 가능하십니다. 자세한
            방법은 {''}
            {''}
            {''}
            <a
              href="https://support.google.com/chrome/answer/142065?hl=ko&co=GENIE.Platform%3DAndroid&oco=0"
              target="_blank"
            >
              링크 클릭해주세요!
            </a>
          </Subspan>
          <TextBox margin="50px">
            <img src={second} alt="second" />
            <Text>{'매칭버튼을 눌러 매칭을 시작합니다.'}</Text>
          </TextBox>
          <ImgBox margin="20px">
            <img src={secondimg} />
          </ImgBox>
          <TextBox margin="50px">
            <img src={third} alt="third" />
            <Text>{"'매칭 중'화면이 뜨면 매칭이 되길 기다립니다."}</Text>
          </TextBox>
          <ImgBox margin="20px">
            <img src={thirdimg} />
          </ImgBox>
        </>
      ) : (
        <ImgBox>
          <img src={chattingimg} />
        </ImgBox>
      )}
    </Wrap>
  );
};

export default Guide;
const Wrap = styled.div`
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    height: 1%;
    background: #ccc;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
  }
`;
const ButtonBox = styled.div`
  margin-top: 42px;
  display: flex;
`;
const GuideButton = styled.button`
  height: 26px;
  width: 172px;
  border-radius: 0px;
  font-family: Pretendard;
  font-size: 17px;
  font-weight: 500;
  border-bottom: 2px solid #e9e9e9;
  color: #787878;
  &.active {
    border-bottom: 2px solid #fa3a45;
    color: #171717;
  }
`;
const TextBox = styled.div`
  margin-top: ${(props) => props.margin};
  display: flex;
  gap: 10px;
`;
const Text = styled.span`
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  color: #505050;
`;
const ImgBox = styled.div`
  margin-top: ${(props) => props.margin};
`;
const Subspan = styled.div`
  margin-top: 8px;
  font-family: Roboto;
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
  color: #797979;

  a {
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 300;
    line-height: 14px;
    letter-spacing: 0em;
    text-align: left;
  }
`;
