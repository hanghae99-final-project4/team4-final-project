import React from "react";
import styled from "styled-components";
import Kakaologin from "../Assets/Kakao_login.png";
import NaverLogin from "../Assets/Naver_login_long.png";
import GoogleLogin from "../Assets/Google_login_long.png";
import { KAKAO_REDIRECT_URI, KAKAO_REST_API_KEY } from "./Login/KakaoLoginData";
import { GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI } from "./Login/GoogleLoginData";
import {
  NAVER_CLIENT_ID,
  NAVER_REDIRECT_URI,
  NAVER_CLIENT_SECRET,
} from "./Login/NaverLoginData";
const Login3 = () => {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  // const KAKAO_AUTH_URL = `https://kauth.kakao.com/kakaoLogin`;
  // const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${GOOGLE_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${GOOGLE_REDIRECT_URI}`;
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?scope=email%20openid&response_type=code&redirect_uri=${GOOGLE_REDIRECT_URI}&client_id=${GOOGLE_CLIENT_ID}`;
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&response_type=code&redirect_uri=${NAVER_REDIRECT_URI}&state=${NAVER_CLIENT_SECRET}`;

  const kakoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const googleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  const naverLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  // const naverLogin = () => {
  //     window.location.href = NAVER_AUTH_URL;
  //   };

  return (
    <Login className="flex flex-col justify-center items-center">
      <div className="w-[500px] bg-black flex items-center">
        <div>하이하이</div>
        <article>
          {" "}
          모범시민
          <div className="flex flex-col">
            <div>
              <button onClick={kakoLogin}>
                <img src={Kakaologin} alt="kakao" />
              </button>
            </div>
            <div>
              <button onClick={naverLogin} className="w-[300px] h-[45px]">
                <img src={NaverLogin} alt="naver" className="w-[100%]" />
              </button>
              <button onClick={googleLogin} className="w-[300px]">
                <img
                  src={GoogleLogin}
                  alt="google"
                  className="w-[100%] h-full"
                />
              </button>
            </div>
            {/* <button onClick={googleLogin}>구글 로그인</b?utton> */}
            {/* <button onClick={naverLogin}>네이버 로그인</button> */}
          </div>
        </article>
      </div>
    </Login>
  );
};

export default Login3;

const Login = styled.div`
  width: 100%;
  height: 500px;
  margin: 0 auto;
`;
