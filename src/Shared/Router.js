import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../Pages/MainPage";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/Login";
import GoogleLogin from "../Pages/GoogleLogin";
import KakaoLogin from "../Pages/KakaoLogin";
import NaverLogin from "../Pages/NaverLogin";
import ChatPage from "../Pages/ChatPage";
import MainPage from "../Pages/MainPage";
import ConversPage from "../Pages/ConversPage";
import ChattingPage from "../Pages/ChattingPage";

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
        <Route path="/chatpage" element={<ChatPage />} />
        <Route path="/converspage" element={<ConversPage />} />
        <Route path="/chattingpage" element={<ChattingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
