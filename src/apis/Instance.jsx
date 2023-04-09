////src/Redux/Modules/Instance.js
import axios from "axios";
import { Cookies, useCookies } from "react-cookie";
import { getCookie, removeCookie, setCookie } from "../MyTools/Hooks/MyCookie";
import mem from "mem";
import { memoizedRefreshToken } from "./../Recoil/Modules/refreshToken";

//instance 불러 쓸 때 브라우저쪽에 headers 일일이 안 넣어줘도 되지만,
//axios로 따로 써줄 경우는 header 매번 넣어줘야 함.
//인스턴스 - api 전역관리
const yhURL = process.env.REACT_APP_TH_S_HOST;
const token = localStorage.getItem("token");
const Id = localStorage.getItem("userId");
//일반데이터 Instance
export const instance = axios.create({
  baseURL: `${yhURL}`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
//폼데이터 Instance
export const instanceF = axios.create({
  baseURL: `${yhURL}`,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
});

export const api = axios.create({
  baseURL: "https://kauth.kakao.com",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  },
});

export const trainApi2 = {
  //signup
  postProficForm: (payload) => instanceF.post("/user", payload),
  postProfile: (payload) => instanceF.post(`/user/upload/${Id}`, payload),
  chattingForm: (formData) => instanceF.post("/uploadFile", formData),
  deleteProfile: (deleteUrl) =>
    instance.delete(`user/images/${Id}`, { data: [{ url: deleteUrl }] }),
  patchProfile: (otherimage, primaryimage) =>
    instance.patch(`user/images/${Id}`, [primaryimage, otherimage]),
  editProfile: (nickname, introduction) =>
    instance.post(`user/edit/${Id}`, { nickname, introduction }),
};

export const trainApi = {
  kakaoLogin: (code) =>
    axios.post(`${yhURL}/social/oauth/callback`, { authorizationCode: code }),
  postName: (payload) => instance.post("/", payload),
  postAuthPhone: (payload) => instance.post("/auth2/phone", payload),
  postAuthCode: (payload) => instance.post("/auth2/compare", payload),

  getConvers: () => instance.get(`/user/${Id}`),

  postSubSign: (payload) => instance.post("/user/signup", payload),
  postUserId: (payload) => instance.post("/user/checkid", payload),
  postSignIn: (payload) => instance.post("/user/login", payload),
};
// 인터셉터
instance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    if (error.response.status === 401 && !config?.sent) {
      config.sent = true;
      const result = await memoizedRefreshToken();
      console.log(result?.acctoken);
      if (result) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${result?.acctoken}`,
        };
      }
      return instance(config);
    }
    return Promise.reject(error);
  }
);
