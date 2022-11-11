import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  NAVER_CLIENT_SECRET,
  NAVER_REDIRECT_URI,
} from "./Login/NaverLoginData";
import { Cookies, useCookies } from "react-cookie";
import axios from "axios";

// const NaverLoginBtn = () => {
//   const code = new URL(window.location.href).searchParams.get("code"); // 현재 URL에서 코드만 추출
//   const [cookies, setCookie] = useCookies();
//   const navigate = useNavigate();

//   // 컴포넌트가 마운트되면 로그인 로직 실행
//   useEffect(() => {
//     const NaverRedirect = async () => {
//       const res = await axios.get(
//         NAVER_REDIRECT_URI +
//           `/api/member/login/naver?code=${code}&state=${NAVER_CLIENT_SECRET}`
//       ); // 이 부분은 서버 API에 따라 바뀔 수 있으니 API 명세서를 잘 확인하세요.
//       const ACCESS_TOKEN = res.headers["authorization"];
//       const REFRESH_TOKEN = res.headers["refresh-token"];
//       setCookie("accessToken", ACCESS_TOKEN);
//       setCookie("refreshToken", REFRESH_TOKEN);
//     };
//     NaverRedirect();
//     navigate("/", { replace: true }); // 로그인 완료시 메인으로 이동
//   }, []);

//   return;
// };

// export default NaverLoginBtn;
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
      .post(
        `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_CLIENT_SECRET}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => res.json())
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
