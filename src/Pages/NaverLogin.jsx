import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NAVER_REDIRECT_URI } from "./Login/NaverLoginData";
import { Cookies } from "react-cookie";
import axios from "axios";

const NaverLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  //프론트에서 인가코드 받아서 서버에 넘겨줄 경우 -------
  const NAVER_CLIENT_ID = new URL(window.location.href).searchParams.get(
    "code"
  );
  const NAVER_CLIENT_SECRET = new URL(window.location.href).searchParams.get(
    "state"
  );
  //   console.log(searchParams);
  console.log("인가코드:", NAVER_CLIENT_ID, "시크릿코드", NAVER_CLIENT_SECRET);
  const cookies = new Cookies();
  const token = cookies.get("token");
  //프론트에서 인가코드 받아서 서버에 넘겨줄 경우 -------

  //서버에서 인가코드 받고 토큰 프론트로 넘겨줄 경우-------
  // const cookies = new Cookies();
  // const token = cookies.get("token");
  // console.log(token);
  // const headers = {
  //   Authorization: `${token}`,
  // };
  // console.log(headers);
  //   console.log(token);

  //token 저장
  const getNaverToken = async () => {
    //네이버에서 인가코드 받고 서버에 토큰 전달
    await axios
      .get(
        `https://nid.naver.com/naverLogin?client_id=${NAVER_CLIENT_ID}&response_type=code&redirect_uri=${NAVER_REDIRECT_URI}&state=${NAVER_CLIENT_SECRET}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        console.log(res);
        // if (res.data.access_token) {
        //   cookies.set("token", res.data.access_token);
        //   // cookies.set("userId",res.data.userId);
        //   alert("접속하셨습니다.");
        // window.loacation.replace("/");
        // }
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
        alert("접속에 실패하셨습니다");
        // navigate("/");
      });
    //서버에서 프론트로 토큰 전달받을 때
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
    //////////////////////////fetch로 쓰는 방법
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
      <div>NaverLogin</div>
      <button onClick={() => getNaverToken()}>토큰</button>
    </>
  );
};

export default NaverLogin;