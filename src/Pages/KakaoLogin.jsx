import axios from "axios";
import React, { useEffect } from "react";
import { trainApi } from "../apis/Instance";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../MyTools/Hooks/MyCookie";
const KakaoLogin = () => {
  const kakao_restapikey = `${process.env.REACT_APP_KAKAO_KEY}`;
  const REDIRECT_URI = `${process.env.REACT_APP_KAKAO_REDIRECT_URI}`;
  const code = new URL(window.location.href).searchParams.get("code");
  const after1m = new Date();
  const now = new Date();
  const navigate = useNavigate();
  useEffect(() => {
    kakaoLogin();
  }, []);

  const kakaoLogin = async () => {
    try {
      const { data } = await trainApi.kakaoLogin(code);
      console.log(data);
      const token = data.token;
      const userId = data.result[0].id;
      if (data.token) {
        localStorage.setItem("userId", userId);
        localStorage.setItem("token", token);
      }

      navigate("/subwaypage");
    } catch (error) {
      console.log(error);
    }
  };

  return <div>카카오 소셜 로그인 중...</div>;
};

export default KakaoLogin;
