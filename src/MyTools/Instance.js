import axios from "axios";
import jwtDecode from "jwt-decode";

const token = document.cookie.replace("token=", "");
const accesstoken = token && jwtDecode(token);
const id = accesstoken.userId;

//instance 쓸 때는 headers값 안 넣어줘도 되지만,
//axios로 따로 써줄 경우는 header 매번 넣어줘야 함.
const instance = axios.create({
  baseURL: "http://15.164.250.6:3000//auth/kakao/callback",
  // baseURL: "http://localhost:3000",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const trainApi = {
  getLogin: (payload) => instance.get("/auth/kakao/callback"),
  // postSignUps: (payload) => instance.post("/signup", payload),
  // mypage: (payload) => instance.get(`/mypages/${id}`),
  // personal: (payload) => instance.put(`/mypages/${id}/edit`, payload),

  // getMenubar: (payload) => instance.get(`/mypages/main/${id}`),
};
