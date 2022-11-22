import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { trainApi } from "../MyTools/Instance";
import { Cookies, useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";

const KakaoLogin = () => {
  const navigator = useNavigate();
  const cookies = new Cookies();
  const [tokens, setTokens] = useCookies(["token"]);
  // const token = document.cookie.replace("token=", "");
  // const accesstoken = token && jwtDecode(token);
  // const setCookie = (name, value, option) => {
  //   return cookies.set(name, value, { ...option });
  // };

  useEffect(() => {
    //   const accesstoken = token && jwtDecode(token);
    //   const id = accesstoken.userId;

    // useEffect(() => {
    // 인가코드 확인하기
    const code = new URL(window.location.href).searchParams.get("code");
    console.log("인가코드", code);
    const yhURL = process.env.REACT_APP_YH_S_HOST;
    //1. url에 뜬 인가코드 추출한 것 토큰 get요청 할 때 url 쿼리로 보내기.
    // 2. 토큰(카카오토큰이든 자체 jwt토큰이든 )get으로 받기
    axios
      .get(
        `${yhURL}/auth/kakao/callback?code=${code}`
        //       {
        //   headers: {
        //     Authorization: `${token}`,
        //   },
        // }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        console.log(res.data.jwtToken);

        const token = res.data.jwtToken;
        if (token) {
          setTokens("token", token, { path: "/" });
          alert("로그인 하셨습니다");
        }

        navigator("/mypage");
        //이걸 라우트 설정하기
        //페이지 너무  빨라서  지우든가해야함
      });
  }, []);
  return <div>빠른로딩중..</div>;
};

export default KakaoLogin;
