import React from 'react';
import { MatchDiv, MatchWrap } from './MatchingPage';
import failimg from '../../Assets/Matching/fail.svg';
import styled from 'styled-components';
import recycleimg from '../../Assets/Matching/recycle.svg';
import { useNavigate } from 'react-router-dom';
import homeimg from '../../Assets/Matching/home.svg';
const FailPage = () => {
  const navigate = useNavigate();
  const naviHandler = () => {
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
`;
