import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../Pages/MainPage";
import SitdownPage from "../Pages/SitdownPage";
import StandPage from "../Pages/StandPage";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/Login";
import GoogleLogin from "../Pages/GoogleLogin";
import KakaoLogin from "../Pages/KakaoLogin";
import NaverLogin from "../Pages/NaverLogin";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth/kakao/callback" element={<KakaoLogin />} />
        <Route path="/auth/google/callback" element={<GoogleLogin />} />
        <Route path="/auth/naver/callback" element={<NaverLogin />} />

        <Route path="/signup" element={<SignUp />} />

        <Route path="/main" element={<MainPage />} />
        <Route path="/sitdownpage" element={<SitdownPage />} />
        <Route path="/standpage" element={<StandPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
