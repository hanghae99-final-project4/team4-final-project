import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  REDIRECT_URI,
  REST_API_KEY,
  CLIENT_SECRET,
} from "./Login/KakaoLoginData";
import { Cookies } from "react-cookie";
import axios from "axios";

const KakaoLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const KAKAO_CODE = location.search.split("=")[1];
  console.log("인가코드:", KAKAO_CODE);
  const cookies = new Cookies();
  const token = cookies.get("token");
  //   console.log(token);

  //token 저장

  const getKakaoToken = async () => {
    // const headers = {
    //   "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    // };
    // const body = {
    //   body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
    // };
    //카카오에서 인가코드 받고 서버에 토큰 전달
    // await axios
    //   .post(
    //     `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
    //     {
    //       headers: {
    //         "Content-Type": "application/x-www-form-urlencoded",
    //       },
    //     }
    //   )
    //   .then((data) => {
    //     console.log(data);
    //     if (data.data.access_token) {
    //       cookies.set("token", data.data.access_token);

    //       alert("접속하셨습니다.");
    //       // navigate("/");
    //     }

    //     // console.log(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     alert("접속에 실패하셨습니다");
    //     // navigate("/");
    //   });
    //서버에서 프론트로 토큰 전달해줄 때
    // const getKakaoToken = async () => {
    // const headers = {
    //   "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    // };
    // const body = {
    //   body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
    // };
    //카카오에서 인가코드 받고 서버에 토큰 전달
    await axios
      .get(
        `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((data) => {
        console.log(data);
        if (data.data.access_token) {
          cookies.get("token", data.data.access_token);

          alert("접속하셨습니다.");
          // navigate("/");
        }

        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
        alert("접속에 실패하셨습니다");
        // navigate("/");
      });
  };
  //////////////////////////

  // fetch(`https://kauth.kakao.com/oauth/token`, {
  //   fetch(
  //     `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
  //     {
  //       method: "POST",
  //       header: {
  //         "Content-Type": "application/x-www-form-urlencoded;",
  //       },
  //       // body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
  //       //   body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}&client_secret=${CLIENT_SECRET}`,
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
  //     });

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
