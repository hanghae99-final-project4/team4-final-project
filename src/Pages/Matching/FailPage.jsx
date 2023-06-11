import React from 'react';
import { MatchDiv, MatchWrap } from './MatchingPage';
import failimg from '../../Assets/Matching/fail.svg';
import styled from 'styled-components';
import recycleimg from '../../Assets/Matching/recycle.svg';
import { useNavigate } from 'react-router-dom';
import homeimg from '../../Assets/Matching/home.svg';
import { useRecoilState } from 'recoil';
import { useBotState } from '../../Recoil/userList';
import botimg from '../../Assets/Matching/bot.svg';
const FailPage = () => {
  const navigate = useNavigate();
  const naviHandler = () => {
    navigate('/chattingpage');
  };

  const [botMatching, setBotMatching] = useRecoilState(useBotState);
  const botHandler = () => {
    setBotMatching(true);
    navigate('/chattingpage');
  };
  return (
    <MatchWrap>
      <MatchDiv>매칭에 실패했습니다.</MatchDiv>
      <img src={failimg} alt="fail" />
      <Recycle>
        다시매칭
        <img onClick={naviHandler} src={recycleimg} alt="recycle" />
      </Recycle>
      <Recycle className="home">
        홈으로
        <img
          onClick={() => navigate('/subwaypage')}
          src={homeimg}
          alt="homeimg"
        />
      </Recycle>
      <Recycle className="bot">
        <span>매칭이 어렵다면?</span>
        <BotBox onClick={() => botHandler()}>
          봇과 테스트하기{' '}
          <img onClick={() => botHandler()} src={botimg} alt="botimg" />{' '}
        </BotBox>
      </Recycle>
    </MatchWrap>
  );
};

export default FailPage;
const Recycle = styled.div`
  display: flex;
  gap: 9.66px;
  font-size: 16px;
  font-weight: 400;
  color: #ffffff;
  img {
    cursor: pointer;
    width: 20px;
    height: 20px;
  }
  &.home {
    margin-top: 31px;
  }
  &.bot {
    gap: 22.5px;
    flex-direction: column;
    margin-top: 107px;
    span {
      font-family: Pretendard;
      font-size: 13px;
      font-weight: 400;

      text-align: center;
    }
  }
`;
const BotBox = styled.div`
  cursor: pointer;
  display: flex;
  gap: 11px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
`;
