import React, { useEffect } from "react";
import styled from "styled-components";
import Kakaologo from "../Assets/Kakaologo.svg";
import Naverlogo from "../Assets/Naverlogo.svg";
import Googlelogo from "../Assets/Googlelogo.svg";
import logo from "../Assets/Logo.svg";

const Login = () => {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/auth/authorize?client_id=${process.env.REACT_APP_KAKAO_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_CALLBACK_URL}&response_type=code`;
  // const KAKAO_AUTH_URL = `https://kauth.kakao.com/auth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  // const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${Gprocess.env.REACT_APP_GOOGLE_REDIRECT_URI}`;
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?scope=email%20openid&response_type=code&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}`;
  // const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&state=randomState&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URI}`;
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&state=randomState&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URI}`;

  const kakoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const googleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  const naverLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  return (
    <Login1 className="p-[0px] flex flex-col justify-center items-center font-sans">
      <LoginBox className="relative flex-col items-center rounded-[10px]">
        <article className="py-[90px] justify-center items-center">
          <div className="w-[276px] h-[90px] leading-[33px] flex flex-col justify-center items-center mx-[auto] my-[0px]">
            <h2 className="w-[full] mx-[auto] my-[0px] font-[600] text-[1.3rem] text-center">
              {/* 지하철에서 <br />
              새로운 인연을 만나보아요. */}
              <p>지하철에서</p>
              <p>새로운 인연을 만나보아요</p>
            </h2>
            <p className="block text-center text-[0.6rem]">
              가입하신 정보를 바탕으로 자동 1:1매칭이 이루어집니다
            </p>
          </div>
          <div className="w-[340px] mt-[56px] mx-[auto] my-[0px] flex flex-col justify-center">
            {<img src={logo} alt="logo" className="mx-[auto] my-[0px]" />}
            <div>
              <div className="gap-[10px] flex flex-col justify-center items-center">
                {/* 카카오로그인 */}
                <button onClick={kakoLogin}>
                  <img src={Kakaologo} alt="kakao" />
                </button>
                {/* 구글로그인 */}
                <button onClick={googleLogin}>
                  <img src={Googlelogo} alt="snsGoogle" />
                </button>
                {/* 네이버로그인 */}
                <button onClick={naverLogin}>
                  <img src={Naverlogo} alt="snsNaver" />
                </button>
              </div>
            </div>
          </div>
        </article>
      </LoginBox>
    </Login1>
  );
};

export default Login;

const Login1 = styled.div`
  width: 100%;

  margin: 0 auto;
  padding: 0;
  outline: 0;
  border: 0;
  @media screen and (min-width: 320px) and (max-width: 375px) {
    font-size: 1.3rem;
  } ;
`;

const LoginBox = styled.div`
  width: 100%;
  height: 812px;
  @media screen and (min-width: 320px) and (max-width: 375px) {
    font-size: 1.3rem;
  } ;
`;
