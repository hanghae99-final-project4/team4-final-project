import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Cookies, useCookies } from "react-cookie";
import FirstLogo from "../Assets/FirstLogo.svg";
import { trainApi } from "../apis/Instance";

const NaverLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    naverLogin();
  }, []);

  const code = new URL(window.location.href).searchParams.get("code");
  const state = new URL(window.location.href).searchParams.get("state");
  console.log(code, state);
  const naverLogin = async () => {
    try {
      const { data } = await trainApi.naverLogin(code, state);
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

  return (
    <div className="flex items-center justify-center min-h-screen">
      <img src={FirstLogo} alt="firstlogo" className="block m-[auto]" />
    </div>
  );
};
//네이버로그인
//
//
//
export default NaverLogin;
