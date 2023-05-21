import React from 'react';
import { Wrap } from '../Login/EmailPage';
import match from '../../Assets/Matching/matching.gif';
import styled from 'styled-components';
import { LoadingDiv } from '../../Components/Loading/Loading';
import progressbar from '../../Assets/Matching/progressbar.svg';
const MatchingPage = () => {
  return (
    <MatchWrap>
      <MatchDiv class="bounce">
        <div class=" box bounce">매칭중</div>
      </MatchDiv>

      <img src={progressbar} />
      <img src={match} />
      <div class="container">
        <div class="typed">사랑은 기회가 있을 때 잡으세요!</div>
      </div>
    </MatchWrap>
  );
};

export default MatchingPage;
const MatchWrap = styled.div`
  width: 375px;
  height: 812px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background-color: #fa3a45;
  div.container {
    display: inline-block;
    font-weight: 400;
    font-size: 16px;
    width: 220px;
    height: 19px;

    align-items: center;
    .typed {
      color: #ffffff;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      border-right: 2px solid;
      margin-right: 1px;

      width: 0;
      animation: typing 4s steps(30, end) infinite, blinking 1s infinite;
    }
    @keyframes typing {
      from {
        width: 0;
      }
      to {
        width: 100%;
      }
    }
    @keyframes blinking {
      0% {
        border-right-color: transparent;
      }
      50% {
        border-right-color: #ffffff;
      }
      100% {
        border-right-color: transparent;
      }
    }
  }
`;
const MatchDiv = styled.div`
  margin-bottom: 30px;
  font-weight: 500;
  font-size: 28px;
  color: #ffffff;

  /* .bounce {
    position: relative;
    animation: bounce 1s infinite linear;
  } */
  @keyframes bounce {
    0% {
      top: 0;
    }

    50% {
      top: -5px;
    }

    70% {
      top: -50px;
    }

    100% {
      top: 0;
    }
  }
`;
