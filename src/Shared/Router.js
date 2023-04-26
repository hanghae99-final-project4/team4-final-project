import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NaverLogin from "../Pages/NaverLogin";
import ChatPage from "../Pages/ChatPage";
import MainPage from "../Pages/MainPage";
import ProfilePic from "../Components/Profile/ProfilePic";
import Disclaimer from "../Components/Agreement/Disclaimer";
import ChattingPage from "../Pages/ChattingPage";
import SubwayPage from "../Pages/SubwayPage";
import { Suspense, lazy } from "react";
import CustomerUserGuide from "../Components/Profile/CustomerUserGuide";
import CustomerNotice from "../Components/Profile/CustomerNotice";
import SubSign from "../Pages/SubSign";
import KakaoLogin from "../Pages/KakaoLogin";
import GoogleLogin from "../Pages/GoogleLogin";
import ResetPage from "../Pages/Login/ResetPage";
import AuthPage from "../Pages/Login/AuthPage";
import CompletePage from "../Pages/Login/CompletePage";
import EmailPage from "../Pages/Login/EmailPage";
import AgreePage from "../Pages/Signup/AgreePage";
import SignupPage from "../Pages/Signup/SignupPage";
const LoginPage = lazy(() => import("../Pages/Login"));
const ConversPage = lazy(() => import("../Pages/ConversPage"));
const MyPage = lazy(() => import("../Components/Profile/Mypage"));

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/social/oauth/callback" element={<KakaoLogin />} />
          <Route path="/social/nauth/callback" element={<NaverLogin />} />
          <Route path="/social/gauth/callback" element={<GoogleLogin />} />
          {/* 로그인 라우터 */}
          <Route path="/email" element={<EmailPage />} />
          <Route path="/reset" element={<ResetPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/complete" element={<CompletePage />} />
          {/* 회원가입 라우터 */}
          <Route path="/agree" element={<AgreePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/subsign" element={<SubSign />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="profilepic" element={<ProfilePic />} />
          <Route path="/disclaimer" element={<Disclaimer />} />

          <Route path="/main" element={<MainPage />} />
          <Route path="/chatpage" element={<ChatPage />} />
          <Route path="/converspage" element={<ConversPage />} />
          <Route path="/chattingpage" element={<ChattingPage />} />
          <Route path="/subwaypage" element={<SubwayPage />} />
          <Route path="/customeruserguide" element={<CustomerUserGuide />} />
          <Route path="/customernotice" element={<CustomerNotice />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
