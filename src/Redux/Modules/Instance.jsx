////src/Redux/Modules/Instance.js
import axios from "axios";
import { Cookies, useCookies } from "react-cookie";
import { removeCookie, setCookie } from "../../MyTools/Hooks/MyCookie";

const token = cookies.getItem("token");
const cookies = new Cookies();
const code = new URL(window.location.href).searchParams.get("code");
//instance 불러 쓸 때 브라우저쪽에 headers 일일이 안 넣어줘도 되지만,
//axios로 따로 써줄 경우는 header 매번 넣어줘야 함.
//인스턴스 - api 전역관리
const yhURL = process.env.REACT_APP_TH_S_HOST;

//일반데이터 Instance
const instance = axios.create({
  baseURL: `${yhURL}`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
//폼데이터 Instance
const instanceF = axios.create({
  baseURL: `${yhURL}`,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
});

export const trainApi2 = {
  //signup
  postForm: (fd) => instanceF.post("/user", fd),
  postProficForm: (payload) => instanceF.post("/profile", payload),
  postProfile: (payload) => instanceF.post("/profile", payload),
  chattingForm: (formData) => instanceF.post("/uploadFile", formData),
};

export const trainApi = {
  // getLogin: () => instance.get(`/auth/kakao/callback?code=${code}`),
  postName: (payload) => instance.post("/", payload),
  postAuthPhone: (payload) => instance.post("/auth2/phone", payload),
  postAuthCode: (payload) => instance.post("/auth2/compare", payload),
  getConvers: () => instance.get("/profile"),
  postAuthName: (payload) => instance.post("/user/check", payload),

  postSubSign: (payload) => instance.post("/user/signup", payload),
  postUserId: (payload) => instance.post("/user/checkid", payload),
  postSignIn: (payload) => instance.post("/user/login", payload),
};
