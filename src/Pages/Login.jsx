import React, { useEffect } from 'react';
import styled from 'styled-components';
import useInput from '../MyTools/Hooks/UseInput';
import { trainApi } from '../apis/Instance';
import Kakaologo from '../Assets/Kakaologo.svg';
import Naverlogo from '../Assets/Naverlogo.svg';
import Googlelogo from '../Assets/Googlelogo.svg';
import Emaillogo from '../Assets/Email.svg';
import logo from '../Assets/Logo.svg';
import signmsg from '../Assets/SignIn/SignMsg.svg';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import signintext from '../Assets/SignIn/signinText.svg';
import axios from 'axios';

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
    account: '',
    password: '',
  });

  //가지고 있던 토큰 없애기
  useEffect(() => {
    localStorage.clear();
  }, []);

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
      e.preventDefault();
      const { data } = await trainApi.postSignIn({
        account: Info.account,
        password: Info.password,
      });

      const token = data.data.token;
      const userId = data?.data.rest?.user_id;

      if (token) {
        localStorage.setItem('userId', userId);
        localStorage.setItem('token', token);
      }

      navigate('/subwaypage');
      // }
    } catch (err) {
      const errMsg = err.response.data.message;
      alert(errMsg);
    }
  };

  const emailLogin = () => {
    navigate('/email');
  };

  return (
    <Wrap>
      <LoginBox>
        <div className="w-[340px] mt-[148px] mx-[auto] flex flex-col justify-center gap-[4px]">
          {<img src={logo} alt="logo" className="mx-[auto] my-[0px]" />}
          <Signbox>
            <Grayline />
            <TitleSpan>3초 만에 가입하기</TitleSpan> <Grayline2 />
          </Signbox>
          <SocialBox>
            {/* 네이버로그인 */}
            <button className="rounded-[4px] " onClick={naverLogin}>
              <img src={Naverlogo} alt="snsNaver" />
            </button>
            {/* 카카오로그인 */}
            <button className="rounded-[4px] " onClick={kakoLogin}>
              <img src={Kakaologo} alt="kakao" />
            </button>
            {/* 구글로그인 */}
            <button className="rounded-[4px] " onClick={googleLogin}>
              <img src={Googlelogo} alt="snsGoogle" />
            </button>

            {/* 이메일로그인 */}
            <button onClick={emailLogin}>
              <img src={Emaillogo} alt="Email" />
            </button>
          </SocialBox>
        </div>
      </LoginBox>
    </Wrap>
  );
};

export default Login;

const Wrap = styled.div`
  /* width: 100%; */
  height: 812px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  position: relative;
  top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: 320px) and (max-width: 375px) {
    font-size: 1rem;
  } ;
`;
const Signbox = styled.div`
  width: 300px;
  height: 19px;
  margin-top: 70px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SocialBox = styled.div`
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 20px;
`;
const TitleSpan = styled.span`
  color: #b0b0b0;
  width: 160px;
`;
const Grayline = styled.div`
  width: 79px;
  border: 1px solid #dcdcdc;
  margin-right: 18px;
`;
const Grayline2 = styled.div`
  width: 82px;
  border: 1px solid #dcdcdc;
  margin-left: 15px;
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
