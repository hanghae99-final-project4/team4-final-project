import axios from "axios";
import jwtDecode from "jwt-decode";

const token = document.cookie.replace("token=", "");
const accesstoken = token && jwtDecode(token);
const id = accesstoken.userId;

const code = new URL(window.location.href).searchParams.get("code");
//instance 쓸 때는 headers값 안 넣어줘도 되지만,
//axios로 따로 써줄 경우는 header 매번 넣어줘야 함.
const instance = axios.create({
  baseURL: process.env.REACT_APP_YH_HOST,
  // baseURL: "http://localhost:3000",
  //용환님 서버 : process.env.REACT_APP_YH_S_HOST
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
