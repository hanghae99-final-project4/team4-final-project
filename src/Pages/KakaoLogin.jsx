import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  KAKAO_REDIRECT_URI,
  KAKAO_REST_API_KEY,
  KAKAO_CLIENT_SECRET,
} from "./Login/KakaoLoginData";
import { Cookies, useCookies } from "react-cookie";
import axios from "axios";
import { trainApi } from "../MyTools/Instance";
// import jwtDecode from "jwt-decode";

// const KakaoLogin = () => {
//instance 안 쓴다면 각 페이지별로 적어줘야함.
// const token = document.cookie.replace("token=", "");
// const accesstoken = token && jwtDecode(token);
// const id = accesstoken.userId;
//---------------------------------------

// const location = useLocation();
// const navigate = useNavigate();
//프론트에서 인가코드 받아서 서버에 넘겨줄 경우 -------
// const KAKAO_CODE = location.search.split("=")[1];
// console.log("인가코드:", KAKAO_CODE);
// const KAKAO_CODE = new URL(window.location.href).searchParams.get("code");
// console.log(KAKAO_CLIENT_ID);
// console.log("인가코드",KAKAO_CODE);
//------------------------------------------------------
// const cookies = new Cookies();
// const token = cookies.get("token");
//프론트에서 인가코드 받아서 서버에 넘겨줄 경우 -------

// const cookies = new Cookies();
// const token = cookies.get("token");
// console.log(token);
// const headers = {
//   Authorization: `${token}`,
// };
// console.log(headers);
//   console.log(token);

//token 저장
// const getKakaoToken = async () => {
//   const cookies = new Cookies();
//   const token = cookies.get("token");
//   const headers = {
//     Authorization: `Bearer ${token}`,
//   };
//카카오에서 인가코드 받고 서버에 토큰 전달
// await axios
//   .post(
//     // `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${KAKAO_CODE}`,
//     `http://15.164.250.6:3000/oauth/token?code=${KAKAO_CODE}`,
//     {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//     }
//   )
//   .then((res) => {
//     console.log(res);
//     // if (res.data.access_token) {
//     //   cookies.set("token", res.data.access_token);
//     //   // cookies.set("userId",res.data.userId);
//     //   alert("접속하셨습니다.");
//     //   window.loacation.replace("/");
//     // }
//     // console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//     alert("접속에 실패하셨습니다");
//     // navigate("/");
//   });

//서버에서 프론트로 토큰 전달해줄 때
// const getKakaoToken = async () => {
//   console.log("1");
// const headers = {
//   "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
// };

// const headers = {
//   Authorization: `${token}`,
// };
// const body = {
//   body: `grant_type=authorization_code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${KAKAO_CODE}`,
// };
//카카오에서 인가코드 받고 서버에 토큰 전달
// headers: {
//   Authorization: `Bearer ${kakaoToken}`,
// },
//   await axios
//     .get("http://15.164.250.6:3000/auth/kakao", {
//       // headers,
//       headers: {
//         //   // "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     .then((res) => {
//       console.log(res);
//       // if (data.data.access_token) {
//       //   cookies.set("token", data.data.access_token);
//       //   alert("접속하셨습니다.");
//       // navigate("/");
//       // }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
const KakaoLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tokens, setTokens, removeCookie] = useCookies(["token"]);

  const getKakaoToken = async (e) => {
    e.preventDefault();
    // console.log(token);
    // await axios
    //   .get("http://http://15.164.250.6:3000/auth/kakao/callback", {
    await trainApi
      // .postLogin({})
      .postLogin()
      .then((res) => {
        console.log(res);
        if (res.data.access_token) {
          setTokens("token", res.data.accessToken);
          setTokens("userId", res.data.userId);
          // cookies.set("token", res.data.access_token);
          alert("로그인이 되셨습니다.");
          // navigate("/main");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("다시 로그인 해 주셔유.");
      });
  };

  // useEffect(() => {
  //   if (!location.search) return;
  //   getKakaoToken();
  // }, []);

  return (
    <>
      <div>KakaoLogin</div>
      <button onClick={() => getKakaoToken()}>토큰</button>
    </>
  );
};

export default KakaoLogin;
