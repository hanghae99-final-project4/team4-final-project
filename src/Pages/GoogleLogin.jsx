import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI } from "./Login/GoogleLoginData";
import { Cookies } from "react-cookie";
import axios from "axios";

const GoogleLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  //프론트에서 인가코드 받아서 서버에 넘겨줄 경우 -------
  const GOOGLE_CODE = location.search.split("=")[1];
  console.log("인가코드:", GOOGLE_CODE);
  const cookies = new Cookies();
  const token = cookies.get("token");
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
  const getGoogleToken = async () => {
    //카카오에서 인가코드 받고 서버에 토큰 전달
    await axios
      .get(
        `https://accounts.google.com/o/oauth2/v2/auth?scope=email%20openid&response_type=code&redirect_uri=${GOOGLE_REDIRECT_URI}&client_id=${GOOGLE_CLIENT_ID}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.access_token) {
          cookies.set("token", res.data.access_token);
          // cookies.set("userId",res.data.userId);
          alert("접속하셨습니다.");
          // window.loacation.replace("/");
        }
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
        alert("접속에 실패하셨습니다");
        // navigate("/");
      });
    //서버에서 프론트로 토큰 전달해줄 때
    // const getKakaoToken = async () => {
    // const headers = {
    //   "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    // };
    // const body = {
    //   body: `grant_type=authorization_code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${KAKAO_CODE}`,
    // };
    //카카오에서 인가코드 받고 서버에 토큰 전달
    // headers: {
    //   Authorization: `Bearer ${kakaoToken}`,
    // },
    // await axios
    //   .get("서버주소/oauth/kakao/callback", {
    //     headers,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     // if (data.data.access_token) {
    //     //   cookies.set("token", data.data.access_token);
    //     //   alert("접속하셨습니다.");
    //     // navigate("/");
    //     // }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    //////////////////////////
    // fetch(`https://kauth.kakao.com/oauth/token`, {
    //   fetch(
    //     `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${KAKAO_CODE}`,
    //     {
    //       method: "POST",
    //       header: {
    //         "Content-Type": "application/x-www-form-urlencoded;",
    //       },
    //       // body: `grant_type=authorization_code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${KAKAO_CODE}`,
    //       //   body: `grant_type=authorization_code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${KAKAO_CODE}&client_secret=${CLIENT_SECRET}`,
    //     }
    //   )
    //     .then((res) => res.json())
    //     //   .then((res) => console.log(res))
    //     .then((data) => {
    //       console.log(data);
    //       if (data.access_token) {
    //         cookies.set("token", data.access_token);
    //       }
    //       //async / await
    //       // else {
    //       //   navigate("/");
    //       // }
  };

  // useEffect(() => {
  //   if (!location.search) return;
  //   getGoogleToken();
  // }, []);

  return (
    <>
      <div>GoogleLogin</div>
      <button onClick={() => getGoogleToken()}>토큰</button>
    </>
  );
};

export default GoogleLogin;
