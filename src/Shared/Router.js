import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/Login";
import NaverLogin from "../Pages/NaverLogin";
import ChatPage from "../Pages/ChatPage";
import MainPage from "../Pages/MainPage";
import MyPage from "../Components/Profile/Mypage";
import ProfilePic from "../Components/Profile/ProfilePic";
import Disclaimer from "../Components/Agreement/Disclaimer";
import ConversPage from "../Pages/ConversPage";
import ChattingPage from "../Pages/ChattingPage";
import SubwayPage from "../Pages/SubwayPage";
import AuthCode from "../Pages/AuthCode";
import AddInfo from "../Pages/AddInfo";
import SubSign from "../Pages/SubSign";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/subsign" element={<SubSign />} />
        <Route path="/authcode" element={<AuthCode />} />
        <Route path="/addinfo" element={<AddInfo />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="profilepic" element={<ProfilePic />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/auth/naver/callback" element={<NaverLogin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/chatpage" element={<ChatPage />} />
        <Route path="/converspage" element={<ConversPage />} />
        <Route path="/chattingpage" element={<ChattingPage />} />
        <Route path="/subwaypage" element={<SubwayPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
