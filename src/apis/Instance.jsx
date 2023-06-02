////src/Redux/Modules/Instance.js
import axios from 'axios';
import { Cookies, useCookies } from 'react-cookie';
import { getCookie, removeCookie, setCookie } from '../MyTools/Hooks/MyCookie';
import mem from 'mem';
import { memoizedRefreshToken } from './../Recoil/Modules/refreshToken';

//instance 불러 쓸 때 브라우저쪽에 headers 일일이 안 넣어줘도 되지만,
//axios로 따로 써줄 경우는 header 매번 넣어줘야 함.
//인스턴스 - api 전역관리

const yhURL = process.env.REACT_APP_TH_S_HOST;
const token = localStorage.getItem('token');
console.log(token);
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
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${token}`,
  },
});

export const api = axios.create({
  baseURL: 'https://kauth.kakao.com',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  },
});
export const trainApi2 = {
  //signup
  postProficForm: (payload) => instanceF.post('/user', payload),
  postProfile: (Id, payload) => instanceF.post(`/user/upload/${Id}`, payload),
  chattingForm: (name, formData) => instanceF.post(`/images`, formData),
  deleteProfile: (Id, deleteUrl) =>
    instance.delete(`user/images/${Id}`, { data: [{ url: deleteUrl }] }),
  patchProfile: (Id, otherimage, primaryimage) =>
    instance.patch(`user/images/${Id}`, [primaryimage, otherimage]),
  editProfile: (Id, nickname, introduction) =>
    instance.post(`user/edit/${Id}`, { nickname, introduction }),
};

export const trainApi = {
  kakaoLogin: (code) =>
    axios.post(`${yhURL}/social/oauth/callback`, {
      authorizationCode: code,
    }),
  naverLogin: (code, state) =>
    axios.post(`${yhURL}/social/nauth/callback`, {
      authorizationCode: code,

      state: state,
    }),
  googleLogin: (code) =>
    axios.post(`${yhURL}/social/gauth/callback`, {
      authorizationCode: code,
    }),
  postName: (payload) => instance.post('/', payload),
  postProfile: (userId, payload) =>
    instance.post(`/user/edit/${userId}`, payload),
  getMatch: (userId) => instance.get(`/list/matched/${userId}`),
  getConvers: (userId) => instance.get(`/user/${userId}`),
  getStation: (keyword) => instance.get(`list/station/${keyword}`),
  postSubSign: (payload) => instance.post('/user/signup', payload),
  postUserId: (payload) => instance.post('/user/checkid', payload),
  postSignIn: (payload) => instance.post('/user/login', payload),
  resetPw: (payload) => instance.post('/user/resetpw', payload),
  patchreputation: (Id, payload) =>
    instance.patch(`/user/reputation/${Id}`, payload),
  postStatusmessage: (id, payload) =>
    instance.post(`/user/edit/${id}`, payload),
};
// 인터셉터
instance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
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

instanceF.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
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
      } else {
        window.location.href = '/';
      }
      return instance(config);
    }
    return Promise.reject(error);
  }
);

instanceF.interceptors.response.use(
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
      } else {
        window.location.href = '/';
      }
      return instance(config);
    }
    return Promise.reject(error);
  }
);
