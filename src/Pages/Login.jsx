import React, { useEffect } from "react";
import styled from "styled-components";
import useInput from "../MyTools/Hooks/UseInput";
import { trainApi } from "../apis/Instance";
import Kakaologo from "../Assets/Kakaologo.svg";
import Naverlogo from "../Assets/Naverlogo.svg";
import Googlelogo from "../Assets/Googlelogo.svg";
import logo from "../Assets/Logo.svg";
import signmsg from "../Assets/SignIn/SignMsg.svg";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import signintext from "../Assets/SignIn/signinText.svg";
import axios from "axios";

//카카오 소셜 로그인

const Login = () => {
  const [cookie, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();

  //카카오 소셜 로그인
  const kakao_restapikey = `${process.env.REACT_APP_KAKAO_KEY}`;
  const REDIRECT_URI = `${process.env.REACT_APP_KAKAO_REDIRECT_URI}`;
  const google_restapikey = `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`;
  const GOOGLE_REDIRECT_URI = `${process.env.REACT_APP_GOOGLE_REDIRECT_URI}`;
  const naver_restapikey = `${process.env.REACT_APP_NAVER_CLIENT_ID}`;
  const NAVER_REDIRECT_URI = `${process.env.REACT_APP_NAVER_REDIRECT_URI}`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao_restapikey}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  //네이버 소셜 로그인
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naver_restapikey}&state=randomState&redirect_uri=${NAVER_REDIRECT_URI}`;

  //구글 소셜 로그인
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${google_restapikey}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;

  const [Info, setInfo, onChangeValue, reset] = useInput({
    account: "",
    password: "",
  });

  //가지고 있던 토큰 없애기
  useEffect(() => {
    localStorage.clear();
  }, []);

  // async function ymLogin() {
  //   try {
  //     for (let i = 100; i <= 150; i++) {
  //       const { data } = axios.post(
  //         `https://sniperfactory.com/sfac/http_assignment_${i}`,

  //         {},
  //         {
  //           headers: {
  //             "User-Agent": "SniperFactoryBrowser",
  //             Authorization: "Bearer ey",
  //           },
  //         }
  //       );
  //       console.log(data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  const kakoLogin = () => {
    window.location.assign(KAKAO_AUTH_URL);
  };

  const googleLogin = () => {
    window.location.assign(GOOGLE_AUTH_URL);
  };

  const naverLogin = () => {
    window.location.assign(NAVER_AUTH_URL);
  };

  //로그인버튼

  const onSignIn = async (e) => {
    try {
      console.log(Info.account, Info.password);
      e.preventDefault();
      const { data } = await trainApi.postSignIn({
        account: Info.account,
        password: Info.password,
      });
      console.log(data);
      const token = data.data.token;
      const userId = data?.data.rest?.user_id;

      if (token) {
        localStorage.setItem("userId", userId);
        localStorage.setItem("token", token);
      }

      navigate("/subwaypage");
      // }
    } catch (err) {
      console.log(err);
      const errMsg = err.response.data.message;
      alert(errMsg);
    }
  };

  const signUp = (e) => {
    e.preventDefault(e);
    navigate("/subsign");
  };

  return (
    <Login1 className="h-[812px] flex flex-col justify-center items-center">
      <LoginBox className="relative pt-[60px] flex-col items-center rounded-[10px]">
        <article className="items-center justify-center">
          <div className="w-[276px] h-[90px] mt-[30px] flex flex-col gap-[16px] justify-center items-center mx-[auto] my-[0px]">
            <h1 className="w-[full] mx-[auto] my-[0px] font-[600] text-[1.4rem] text-center">
              {/* 지하철에서 <br />
            새로운 인연을 만나보아요. */}
              <img src={signintext} alt="pretext" />
            </h1>
            <p className="block w-[275px] text-center text-[0.8rem]">
              <img src={signmsg} alt="machingInfo" />
            </p>
          </div>
          <div className="w-[340px] mt-[30px] mx-[auto] flex flex-col justify-center gap-[4px]">
            {<img src={logo} alt="logo" className="mx-[auto] my-[0px]" />}
            <div>
              <form className="w-[100%] mx-[auto] mb-[0px] flex flex-col items-center">
                <div className="w-[340px] h-[156px] mx-[auto] my-[0px] flex flex-col gap-[4px]">
                  <div className="flex flex-col items-center gap-[14px]">
                    <input
                      type="text"
                      name="account"
                      value={Info.account}
                      onChange={onChangeValue}
                      placeholder="아이디 입력"
                      className="w-[328px] p-[4px] text-[1rem] border-b-[1px] border-[rgba(0,0,0,0.5)]"
                    />

                    <input
                      type="password"
                      name="password"
                      value={Info.password}
                      onChange={onChangeValue}
                      placeholder="비밀번호 입력"
                      className="w-[328px] p-[4px] text-[1rem] border-b-[1px] border-[rgba(0,0,0,0.5)]"
                    />

                    <div className="w-[340px] flex flex-col items-center gap-[5px]">
                      <OkBtn onClick={(e) => onSignIn(e)}>로그인</OkBtn>
                    </div>
                    <div className="w-[340px] mt-[6px] flex justify-between">
                      <button
                        onClick={(e) => signUp(e)}
                        className="w-[168px] border-r-[1px] border-[rgba(0,0,0,0.5)] text-[rgba(0,0,0,0.5)]"
                      >
                        회원가입
                      </button>
                      <button
                        className="w-[168px] text-[rgba(0,0,0,0.5)]"
                        onClick={(e) => {
                          e.preventDefault();
                          alert("서비스준비중입니다.");
                        }}
                      >
                        아이디 찾기
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="absolute bottom-[40px] flex justify-center items-center">
              <div className="gap-[10px] mx-[auto] my-[0px] flex flex-col justify-center items-center">
                {/* 카카오로그인 */}
                <button
                  className="rounded-[12px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
                  onClick={kakoLogin}
                >
                  <img src={Kakaologo} alt="kakao" />
                </button>
                {/* 구글로그인 */}
                <button
                  className="rounded-[12px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
                  onClick={googleLogin}
                >
                  <img src={Googlelogo} alt="snsGoogle" />
                </button>
                {/* 네이버로그인 */}
                <button
                  className="rounded-[12px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
                  onClick={naverLogin}
                >
                  <img src={Naverlogo} alt="snsNaver" />
                </button>
              </div>
            </div>
            {/* <button onClick={() => ymLogin()}>클릭해봐</button> */}
          </div>
        </article>
      </LoginBox>
    </Login1>
  );
};

export default Login;

const Login1 = styled.div`
  /* width: 100%; */

  margin: 0 auto;
  padding: 0;
  outline: 0;
  border: 0;
  @media screen and (min-width: 320px) and (max-width: 375px) {
    font-size: 1rem;
  } ;
`;

const LoginBox = styled.div`
  width: 100%;
  height: 812px;
  @media screen and (min-width: 320px) and (max-width: 375px) {
    font-size: 1rem;
  } ;
`;

const OkBtn = styled.button`
  width: 100%;
  height: 48px;

  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  line-height: 27px;
  color: #5b5b5b;

  background-color: #c3f4ff;

  font-size: 1rem;
  font-weight: 700;
`;
