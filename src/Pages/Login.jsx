import React, { useEffect } from "react";
import styled from "styled-components";
import Kakaologin from "../Assets/Kakao_login.png";
import data_naver from "../Assets/data_naver.svg";
import Naverlogo from "../Assets/Naverlogo.svg";
import GoogleLogin from "../Assets/Google_login_long.png";
import logo from "../Assets/logo.svg";
// import {
//   KAKAO_REDIRECT_URI,
//   KAKAO_REST_API_KEY,
// } from "./LoginData/KakaoLoginData";
// import {
//   GOOGLE_CLIENT_ID,
//   GOOGLE_REDIRECT_URI,
// } from "../Components/IntroMain/Oauth";
// import {
//   NAVER_CLIENT_ID,
//   NAVER_REDIRECT_URI,
//   NAVER_CLIENT_SECRET,
// } from "../Components/IntroMain/Oauth";
// import { Link } from "react-router-dom";
// import { KAKAO_CALLBACK_URL } from "../Components/IntroMain/Oauth";
// import { KAKAO_KEY } from "../Components/IntroMain/Oauth";

// import { NaverLogin } from "react-naver-login";
const Login = () => {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/auth/authorize?client_id=${process.env.REACT_APP_KAKAO_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_CALLBACK_URL}&response_type=code`;
  // const KAKAO_AUTH_URL = `https://kauth.kakao.com/auth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  // const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${GOOGLE_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${GOOGLE_REDIRECT_URI}`;
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?scope=email%20openid&response_type=code&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}`;
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&state=randomState&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URI}`;
  // const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=randomState&redirect_uri=${NAVER_REDIRECT_URI}`;

  // const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${NAVER_CLIENT_SECRET}&redirect_uri=CALLBACK_URL`;

  const kakoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const googleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  const naverLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  // const initializeNaverLogin = () => {
  //   const naverLoginBtn = new naver.LoginWithNaverId();
  //   ({
  //     loginButton: { color: "green", type: 1, height: 50 },
  //   });
  //   naverLoginBtn.init();
  // };

  return (
    <Login1 className=" flex flex-col justify-center items-center font-sans">
      <LoginBox className="py-[30px] px-[30px] flex-col items-center rounded-[10px] border ">
        <h1 className="hidden text-center text-[1.2rem] font-bold">환승시민</h1>
        <br />
        <article className="justify-center items-center">
          <div className="text-[1.5rem] flex flex-col justify-center items-center mx-[auto] my-[0px]">
            <h2 className="mx-[auto] my-[0px] text-center">
              지하철에서 <br />
              새로운 인연을 만나보아요.
            </h2>
            <p></p>
          </div>
          <div className="mt-[40px] flex flex-col justify-center">
            {<img src={logo} alt="logo" className="mx-[auto] my-[0px]" />}
            <div>
              <div className=" gap-[10px] flex flex-col justify-center items-center">
                <button onClick={kakoLogin} className="w-[250px]">
                  <img src={Kakaologin} alt="kakao" />
                </button>

                {/* <Link to={NAVER_REDIRECT_URI}>
                <button onClick={naverLogin} className=" h-[45px]">
                  <img
                    src={NaverLoginimg}
                    alt="naverlogin"
                    className="w-[100%] h-[100%]"
                  />
                </button>
              </Link> */}

                {/* <Link to={naverLogin}> */}
                <button
                  onClick={naverLogin}
                  className="w-[250px] h-[38px] text-[16px] rounded-[4px] bg-[#03C75A] text-[#fff] cursor-pointer font-sans"
                >
                  <div className="flex flex-row justify-center items-center">
                    <div className="flex justify-center items-center mx-[0] my-[auto]">
                      <div className="w-[45px] h-[38px] flex flex-row justify-center items-center">
                        <img
                          src={data_naver}
                          alt="snsNaver"
                          className="flex cursor-pointer"
                        />
                      </div>
                      <span className="text-center">네이버로 시작하기</span>
                    </div>
                  </div>
                </button>
                {/* </Link> */}
                {/* <div>이거뭐야</div> */}
                {/* <button id="naverIdLogin"></button> */}
                {/* <NaverLogin></NaverLogin> */}

                <button onClick={googleLogin} className="w-[250px]">
                  <img
                    src={GoogleLogin}
                    alt="google"
                    className="w-[full] h-[3rem]"
                  />
                </button>
              </div>

              {/* <button onClick={googleLogin}>구글 로그인</b?utton> */}
              {/* <button onClick={naverLogin}>네이버 로그인</button> */}
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
  height: 500px;
  margin: 0 auto;
`;

const LoginBox = styled.div`
  @media screen and (max-width: 375px) {
    font-size: 1rem;
  } ;
`;
