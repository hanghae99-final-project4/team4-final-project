import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Cookies, useCookies } from "react-cookie";
import FirstLogo from "../Assets/FirstLogo.svg";

const NaverLogin = () => {
  const navigator = useNavigate();
  const cookies = new Cookies();
  const [tokens, setTokens] = useCookies(["token"]);

  const code = new URL(window.location.href).searchParams.get("code");
  const state = new URL(window.location.href).searchParams.get("state");

  const thURL = process.env.REACT_APP_TH_S_HOST;

  axios
    .get(`${thURL}/auth/naver/callback?code=${code}&state=${state}`)
    .then((res) => {

      const token = res.data.jwtToken;
      const msg = res.data.message;
      const doneInfo = res.data.doneAdditionalInfo;
      if (token) {
        setTokens("token", token, { path: "/" });
      }
      if (doneInfo === true) {
        navigator("/subwaypage");
      } else {
        navigator("/authcode");
      }
      alert(`${msg}`);
    });

  return (
    <div className="flex justify-center items-center min-h-screen">
      <img src={FirstLogo} alt="firstlogo" className="block m-[auto]" />
    </div>
  );
};

export default NaverLogin;
