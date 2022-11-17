import axios from "axios";
import jwtDecode from "jwt-decode";

const token = document.cookie.replace("token=", "");
const accesstoken = token && jwtDecode(token);
const id = accesstoken.userId;

//instance 쓸 때는 headers값 안 넣어줘도 되지만,
//axios로 따로 써줄 경우는 header 매번 넣어줘야 함.
const instance = axios.create({
  //추가입력 정보는 일단 로컬로만
  baseURL: "http://13.209.17.182/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const trainSignApi = {
  postSignUps: (payload) => instance.post("/user", payload),
  //   postLogin: (payload) => instance.post("/auth/kakao/callback", payload),
  // mypage: (payload) => instance.get(`/mypages/${id}`),
  // personal: (payload) => instance.put(`/mypages/${id}/edit`, payload),

  // getMenubar: (payload) => instance.get(`/mypages/main/${id}`),
};