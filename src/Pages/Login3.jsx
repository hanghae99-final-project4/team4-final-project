import React from "react";
// import styled from "styled-components";
import Kakaologin from "../Assets/kakao_login.png";
import NaverLogin from "../Assets/Naver_login.png";
import {
  REDIRECT_URI,
  REST_API_KEY,
  CLIENT_SECRET,
} from "./Login/KakaoLoginData";

const Login3 = () => {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&client_secret=${CLIENT_SECRET}`;
  // const NAVER_
  const kakoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  // const naverLogin = () => {
  //     window.location.href = NAVER_AUTH_URL;
  //   };

  return (
    <div>
      <div>
        <div>하이하이</div>
        <article> 모범시민</article>
        <button onClick={kakoLogin}>
          <img src={Kakaologin} alt="kakao" />
        </button>
        <button>
          <img src={NaverLogin} alt="naver" />
        </button>
        <button onClick={kakoLogin}>
          <img src={Kakaologin} alt="kakao" />
        </button>
        {/* <button onClick={googleLogin}>구글 로그인</b?utton> */}
        {/* <button onClick={naverLogin}>네이버 로그인</button> */}
      </div>
    </div>
  );
};

export default Login3;
