import axios from "axios";
import jwtDecode from "jwt-decode";
import { Cookies } from "react-cookie";

const token = document.cookie.replace("token=", "");

const code = new URL(window.location.href).searchParams.get("code");
//instance 쓸 때는 headers값 안 넣어줘도 되지만,
//axios로 따로 써줄 경우는 header 매번 넣어줘야 함.
const instance = axios.create({
  baseURL: process.env.REACT_APP_TH_HOST,
  headers: {
    Authorization: `${token}`,
  },
});

export const trainApi = {
  //인가코드 url로
  getLogin: () => instance.get(`/auth/kakao/callback?code=${code}`),
  //refresh token할 시
  // postRetoken: (payload) => instance.get("/auth/kakao/callback"),
  // postSignUps: (payload) => instance.post("/signup", payload),
  // mypage: (payload) => instance.get(`/mypages/${id}`),
  // personal: (payload) => instance.put(`/mypages/${id}/edit`, payload),
  // getMenubar: (payload) => instance.get(`/mypages/main/${id}`),
};

//인터셉터로 일반 토큰
instance.interceptors.request.use(
  async (config) => {
    // 요청 성공 직전 호출
    const accessToken = Cookies.get("token");
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    return config;
  },
  (error) => {
    // 요청 에러 직전 호출됩니다.
    return Promise.reject(error);
  }
);

/*
  2. 응답 인터셉터
  2개의 콜백 함수를 받습니다.
*/
instance.interceptors.response.use(
  (response) => {
    /*
      http status가 200인 경우
      응답 성공 직전 호출됩니다. 
      .then() 으로 이어짐.
  */
    return response;
  },
  async (error) => {
    /*
    http status가 200이 아닌 경우 응답 에러 직전 호출.
    .catch() 으로 이어짐.    
    */
    //originReq = originRequest
    const originReq = error.config;
    if (err.response.status === 401) return Promise.reject(error);
  }
);
