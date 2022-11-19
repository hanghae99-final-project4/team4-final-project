import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { trainApi } from "../MyTools/Instance";
import { Cookies, useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";

const NaverLogin = () => {
  const navigator = useNavigate();
  const cookies = new Cookies();
  const [tokens, setTokens] = useCookies(["token"]);
  // const token = document.cookie.replace("token=", "");
  // const accesstoken = token && jwtDecode(token);
  // const setCookie = (name, value, option) => {
  //   return cookies.set(name, value, { ...option });
  // };

  useEffect(() => {
    //   setCookie("jwtToken", 123);
    // }, []);
    //   const accesstoken = token && jwtDecode(token);
    //   const id = accesstoken.userId;

    // useEffect(() => {
    // 인가코드 확인하기
    const code = new URL(window.location.href).searchParams.get("code");
    const state = new URL(window.location.href).searchParams.get("state");
    console.log("인가코드", code);

    //1. url에 뜬 인가코드 추출한 것 토큰 get요청 할 때 url 쿼리로 보내기.
    // 2. 토큰(카카오토큰이든 자체 jwt토큰이든 )get으로 받기
    //이중 axios or 연속 axios
    //   console.log(1);
    //   try {
    //     console.log(1);
    // useEffect(() => {
    //   // cookies.set("token", 1);
    //   setCookie("token", 1);
    // }, []);

    // useEffect(() => {
    //   getToken();
    // }, []);

    // const getToken = async () => {
    //   try {
    //     const data = await axios.get(
    //       `http://15.164.250.6:3000/auth/kakao/callback?code=${code}`
    //     );
    //     console.log(data);
    //     console.log(data.data);
    //     console.log(data.data.jwtToken);
    //     setCookie("token", 1);
    //     setCookie("tok32132en", 14324324);
    //     setCookie("to", data.data.jwtToken);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // setCookie("123", 123);
    axios
      .get(
        `http://15.164.250.6:3000/auth/naver/callback?code=${code}&state=${state}`

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
        // console.log(accesstoken);

        // const setCookie = (name, value, option) => {
        //   return cookies.set(name, value, { ...option });
        // };

        const token = res.data.jwtToken;
        // const accessToken = res.data.jwtToken;
        // localStorage.setItem("token", token);
        setTokens("token", token);
        // setCookie("token", token);

        // setCookie("token", accessToken);
        // console.log(accessToken);
        // cookies.set("token", accessToken);
        // console.log(accessToken);
        // if (res.data.accessToken) {
        // cookies.set("token", res.data.accessToken);
        // cookies.set("userId",res.data.userId);

        // }
        //   console.log(accessToken);
        //   //refresh 토큰할 시,
        //   //const refreshToken = res.data.refrush_Token
        //   // if (accessToken) {

        alert("로그인!");

        // } else {
        //   return <></>;
        // }
        //     //     // window.location.replace("/main");
        //     //     //     } else {
        //     //     //       alert("로그인 실패");
        //     //     //     }
        //     //     //   ? window.location.replace("/main")
        //     //     //   : alert("로그인 실패");

        //     //     //   refresh토큰 오면
        //     //     //   cookies.set('reToken', refreshToken)
        //     //   })
        //     //   // );
        //     //   .catch((err) => {
        //     //     console.log(err);
        // window.location.replace("/main");
      });
    //refresh 토큰 시
    //   const refreshToken = cookies.set('token', refreshToken);
    // trainApi.postRetoken({refreshToken}).then((res)=> {
    //   console.log(res)  });

    //   navigator("/main")
    // window.location.replace("/main");
  }, []);
  return <div>빠른로딩중..</div>;
};

export default NaverLogin;
