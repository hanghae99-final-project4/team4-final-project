import React from 'react';
import styled from 'styled-components';
import Loadinglogo from '../../Assets/Loading/logo_gif 1.gif';
import textimg from '../../Assets/Loading/text.svg';
const Loading = () => {
  return (
    <Wrap>
      <LoadingDiv>
        <img src={Loadinglogo} alt="logo" />
        <img src={textimg} alt="text" />
      </LoadingDiv>
    </Wrap>
  );
};

export default Loading;
const Wrap = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 320px) and (max-width: 375px) {
    font-size: 1rem;
  } ;
`;
export const LoadingDiv = styled.div`
  width: 375px;
  height: 812px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background-color: #fa3a45;
  gap: 10px;
`;
