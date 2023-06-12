import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import AgreePage from '../Pages/Signup/AgreePage';
import SignupPage from '../Pages/Signup/SignupPage';
import SetGenderPage from '../Pages/Signup/SetGenderPage';
import SetAgePage from '../Pages/Signup/SetAgePage';
import StationSelectPage from '../Pages/Main/StationSelectPage';
import Loading from '../Components/Loading/Loading';
import StationSearchPage from '../Pages/Main/StationSearchPage';
import FailPage from '../Pages/Matching/FailPage';
import SocialAgreePage from '../Pages/Signup/SocialAgreePage';
// 분기별로 잘 나눠야 ... 될거같다 ..
// 모든 페이지를 로딩 해버리니 로딩 뜨는게 너무 거슬린다.
const LoginPage = lazy(() => import('../Pages/Login'));
const SubwayPage = lazy(() => import('../Pages/Main/SubwayPage'));
const ChattingPage = lazy(() => import('../Pages/ChattingPage'));
const PickProfilePage = lazy(() => import('../Pages/Signup/PickProfilePage'));
const MypagePage = lazy(() => import('../Pages/Mypage/MypagePage'));
const GuidePage = lazy(() => import('../Pages/Guide/GuidePage'));
const ProfilePage = lazy(() => import('../Pages/Mypage/ProfilePage'));
const PasswordPage = lazy(() => import('../Pages/Mypage/PasswordPage'));
const LogoutPage = lazy(() => import('../Pages/Logout/LogoutPage'));
const NamePage = lazy(() => import('../Pages/Mypage/NamePage'));
const KakaoLogin = lazy(() => import('../Pages/KakaoLogin'));
const NaverLogin = lazy(() => import('../Pages/NaverLogin'));
const GoogleLogin = lazy(() => import('../Pages/GoogleLogin'));
const EmailPage = lazy(() => import('../Pages/Login/EmailPage'));
const ResetPage = lazy(() => import('../Pages/Login/ResetPage'));
const AuthPage = lazy(() => import('../Pages/Login/AuthPage'));
const SetProfilePage = lazy(() => import('../Pages/Signup/SetProfilePage'));

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/social/oauth/callback" element={<KakaoLogin />} />
          <Route path="/social/nauth/callback" element={<NaverLogin />} />
          <Route path="/social/gauth/callback" element={<GoogleLogin />} />
          {/* 로그인 라우터 */}
          <Route path="/email" element={<EmailPage />} />
          <Route path="/reset" element={<ResetPage />} />
          <Route path="/auth" element={<AuthPage />} />
          {/* 회원가입 라우터 */}
          <Route path="/agree" element={<AgreePage />} />
          <Route path="/socialagree" element={<SocialAgreePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/setgender" element={<SetGenderPage />} />
          <Route path="/setage" element={<SetAgePage />} />
          <Route path="/setprofile" element={<SetProfilePage />} />
          <Route path="/pickprofile" element={<PickProfilePage />} />
          <Route path="/mypage" element={<MypagePage />} />
          <Route path="/changename" element={<NamePage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/changeprofile" element={<ProfilePage />} />
          <Route path="changepw" element={<PasswordPage />} />
          {/* 메인페이지 라우터 */}
          <Route path="/subwaypage" element={<SubwayPage />} />
          <Route path="/stationselect" element={<StationSelectPage />} />
          <Route path="/stationsearch" element={<StationSearchPage />} />
          <Route path="/chattingpage" element={<ChattingPage />} />
          <Route path="/failpage" element={<FailPage />} />
          <Route path="/logoutpage" element={<LogoutPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
