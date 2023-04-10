import React from "react";
import { trainApi } from "../apis/Instance";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    googleLogin();
  }, []);
  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);
  const googleLogin = async () => {
    try {
      const { data } = await trainApi.googleLogin(code);
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
  return <div>구글 소셜 로그인중....</div>;
};

export default GoogleLogin;
