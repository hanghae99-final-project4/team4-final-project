import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "../Pages/SignUp";
import NaverLogin from "../Pages/NaverLogin";
import ChatPage from "../Pages/ChatPage";
import MainPage from "../Pages/MainPage";
import ProfilePic from "../Components/Profile/ProfilePic";
import Disclaimer from "../Components/Agreement/Disclaimer";
import ConversPage from "../Pages/ConversPage";
import ChattingPage from "../Pages/ChattingPage";
import SubwayPage from "../Pages/SubwayPage";
import { Suspense, lazy } from "react";
import CustomerUserGuide from "../Components/Profile/CustomerUserGuide";
import CustomerNotice from "../Components/Profile/CustomerNotice";
import AgreePage from "../Components/Profile/AgreePage";
import AuthCode from "../Pages/AuthCode";
import AddInfo from "../Pages/AddInfo";
import SubSign from "../Pages/SubSign";

const LoginPage = lazy(() => import("../Pages/Login"));
const ConversPage =lazy(() => import("../Pages/ConversPage"));
const MyPage =lazy(() => import("../Components/Profile/Mypage"));

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
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
        <Route path="/customeruserguide" element={<CustomerUserGuide />} />
        <Route path="/customernotice" element={<CustomerNotice />} />

        <Route path="/agreepage" element={<AgreePage />} />
      </Routes>
     </Suspense>
    </BrowserRouter>
  );
};

export default Router;
