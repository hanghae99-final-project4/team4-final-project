import React from 'react';
import styled from 'styled-components';
import Loadinglogo from '../../Assets/Loading/Group 146.gif';

const Loading = () => {
  return (
    <Wrap>
      <LoadingDiv>
        <img src={Loadinglogo} alt="logo" />
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
const LoadingDiv = styled.div`
  width: 375px;
  height: 812px;
  align-items: center;
  justify-content: center;
  display: flex;
  margin: 0 auto;
  background-color: #fa3a45;
`;
