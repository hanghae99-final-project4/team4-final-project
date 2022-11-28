import axios from "axios";
import jwtDecode from "jwt-decode";
import { Cookies, useCookies } from "react-cookie";
// const token = document.cookie.replace("token=", "");
const cookies = new Cookies();
const token = cookies.get("token");
// export const setCookie = (name, value, option) => {
//   return cookies.set(name, value, { ...option });
// };
const code = new URL(window.location.href).searchParams.get("code");
//instance 쓸 때는 headers값 안 넣어줘도 되지만,
//axios로 따로 써줄 경우는 header 매번 넣어줘야 함.
//인스턴스 - api 전역관리
const instance = axios.create({
  baseURL: process.env.REACT_APP_YH_HOST,
  // baseURL: process.env.REACT_APP_TH_HOST,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const instanceF = axios.create({
  // baseURL: process.env.REACT_APP_YH_HOST,
  baseURL: process.env.REACT_APP_TH_HOST,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
});

export const trainApi2 = {
  //signup
  postForm: (payload) => instanceF.post(`/user`, payload),
};

export const trainApi = {
  getLogin: () => instance.get(`/auth/kakao/callback?code=${code}`),
  postAuthPhone: (payload) => instance.post(`/auth2/phone`, payload),
  postAuthCode: (paylode) => instance.post(`/auth2/compare`, paylode),
  // post: (payload) => instance.post("/url", payload),
  // get: () => instance.get("/url"),
  // get: () => instance.put("/url"),
  // delete: () => instance.delete("/url"),
};

//인터셉터로 갱신된 토큰 교환
instance.interceptors.request.use(
  async (config) => {
    // 요청 성공 직전 수행할 일
    console.log(config);
    console.log(config.headers);
    console.log(config.headers.Authorization);
    const cookies = new Cookies();
    const accessToken = cookies.get("token");
    config.headers.authorization = `Bearer ${accessToken}`;
    console.log("accTokenPm1155", accessToken);

    //token

    // config.headers["Authorization"] = `${token}` ? `${token}` : null;
    //browser token
    // const newToken = config.data.newToken;
    // const newActoken = Cookies.set("newToken");

    // config.headers["expireIn"] = expireTime ? `${expireTime}` : null;

    return config;
  },
  (error) => {
    console.log(error);
    // 요청 에러 직전 수행할 일.
    return Promise.reject(error);
  }
);
/*
  2. 응답 인터셉터 추가
  2개의 콜백 함수를 받음.
*/
instance.interceptors.response.use(
  //response 받기 전 가공
  (config) => {
    console.log(config);
    console.log(config.data);
    console.log(config.config.headers);
    console.log(config.config.headers.Authorization);
    console.log(config.config.data);
    // console.log(config.config.data.newJwtToken);
    const ok = config.config.data.ok;
    const newToken = config.config.data.newJwtToken;
    const cookies = new Cookies();
    const token = cookies.get("token");
    console.log(token);

    // config.headers.Authorization = `Bearer ${token}`;
    // 응답 데이터 가공.
    if (config.status === 201 && ok === true) {
      return axios({
        ...config.config,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        console.log(res);
        console.log(res.data.data);
        // cookies.remove("token", { path: "/" });
        cookies.set("token", newToken);
        // cookies.set("token", config.data.newToken);
      });
    } else {
      return config;
    }
    // return response;
  },
  (error) => {
    /*
    http status가 401 경우 응답 에러 직전 호출.
    .catch() 으로 이어짐.
    */
    // console.log(error);
    // console.log(error.config);
    // console.log(error.config.headers);
    // console.log(error.response.status);
    // console.log(error.response.data.errorMessage);
    // const cookies = new Cookies();
    // // const err = error.response.data.errorMessage;
    // const statusValue = error.response.status;
    // // const newToken = error.response;
    // if (statusValue === 401) {
    //   cookies.remove("token", { path: "/" });
    //   window.location.replace("/");
    //   // cookies.get("token");
    //   // cookies.set("token", error.data.newToken);
    //   // alert(`${err}`);
    // }

    return Promise.reject(error);
  }
);
