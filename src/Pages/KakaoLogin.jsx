import axios from 'axios';
import React, { useEffect } from 'react';
import { trainApi } from '../apis/Instance';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../MyTools/Hooks/MyCookie';
import styled from 'styled-components';
import Loadinglogo from '../Assets/Loading/Group 146.gif';
const KakaoLogin = () => {
  const kakao_restapikey = `${process.env.REACT_APP_KAKAO_KEY}`;
  const REDIRECT_URI = `${process.env.REACT_APP_KAKAO_REDIRECT_URI}`;
  const code = new URL(window.location.href).searchParams.get('code');
  const after1m = new Date();
  const now = new Date();
  const navigate = useNavigate();
  useEffect(() => {
    kakaoLogin();
  }, []);

  const kakaoLogin = async () => {
    try {
      const { data } = await trainApi.kakaoLogin(code);

      const token = data.token;
      const userId = data.result[0].id;
      if (data.token) {
        localStorage.setItem('userId', userId);
        localStorage.setItem('token', token);
        data.result?.[0]?.nickname === null
          ? navigate('/setgender')
          : navigate('/subwaypage');
      }
    } catch (error) {
      return;
    }
  };

  return (
    <Wrap>
      <LoadingDiv>
        <img src={Loadinglogo} alt="logo" />
      </LoadingDiv>
    </Wrap>
  );
};

export default KakaoLogin;

const Wrap = styled.div`
  width: 375px;
  height: 100vh;

  margin: 0 auto;
  padding: 0;
  outline: 0;
  border: 0;

  @media screen and (min-width: 320px) and (max-width: 375px) {
    font-size: 1rem;
  } ;
`;
const LoadingDiv = styled.div`
  height: 812px;
  align-items: center;
  justify-content: center;
  display: flex;
  margin: 0 auto;
  background-color: #fa3a45;
`;
