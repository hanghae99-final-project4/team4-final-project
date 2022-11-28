import axios from "axios";
import jwtDecode from "jwt-decode";
import { Cookies, useCookies } from "react-cookie";
import { setCookie } from "../../MyTools/Hooks/MyCookie";
const token = document.cookie.replace("token=", "");
const cookies = new Cookies();
// const token = cookies.get("token");
const code = new URL(window.location.href).searchParams.get("code");

//instance 쓸 때는 headers값 안 넣어줘도 되지만,
//axios로 따로 써줄 경우는 header 매번 넣어줘야 함.
//인스턴스 - api 전역관리
const yhURL = process.env.REACT_APP_YH_HOST;

const instance = axios.create({
  baseURL: `${yhURL}`,
  // baseURL: process.env.REACT_APP_TH_HOST,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const instanceF = axios.create({
  // baseURL: process.env.REACT_APP_YH_HOST,
  baseURL: `${yhURL}`,
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
// const token = cookies.get("token", token);
//인터셉터로 갱신된 토큰 교환
// const cookies = new Cookies();

instance.interceptors.request.use(
  async (config) => {
    const token = cookies.get("token");
    // console.log(token);
    // 요청 성공 직전 수행할 일
    console.log("인터셉터정보 55줄", config); //여기부터 요청시작
    console.log(config.headers);
    console.log(config.headers.Authorization); //이건 Bearer만 찍히는 게 맞아.

    config.headers["Authorization"] = `Bearer ${token}`;
    console.log("토큰 여기까지 찍혀 60줄", token);
    // console.log("accTokenPm1155", token);

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
/*
  2. 응답 인터셉터 추가 2개의 콜백 함수를 받음.
*/
instance.interceptors.response.use(
  //response 받기 전 가공해서 넘기는 거 맞아
  (config) => {
    console.log("응답인터셉터정보 76줄");
    const accessToken = cookies.get("token");
    console.log(accessToken);
    //status(200),인증되었습니다 response지나감
    console.log(config); //status(200) 지나감.
    console.log(config.data); //msg: 인증되었..body값들어옴.
    console.log(config.config.headers); //토큰 Bearer 어쩌구전부 들어옴
    console.log(config.config.headers.Authorization); //"Bearer "만 찍히는 게 정상.
    console.log(config.config.data); //post로 보내는 data값을 나타내.
    // const ok = config.config.data.ok;
    console.log(token);
    // 응답 데이터 가공.
    if (config.status === 201) {
      console.log("성공 201찍혀 89줄");
      console.log(config.config.data.newJwtToken);
      const newToken = config.config.data.newJwtToken;
      console.log(newToken);
      setCookie("token", newToken);
      return axios({
        ...config.config,
        headers: {
          accessToken: `Bearer ${newToken}`,
        },
      }).then((res) => {
        console.log(res);
        console.log(res.data.data);
        // cookies.set("token", config.data.newJwtToken);
      });
    } else {
      return config;
    }
    // return response;
  },
  (error) => {
    console.log("res 에러 처리 109줄");
    console.log(error);
    /*
    http status가 401 경우 응답 에러 직전 호출.
    .catch() 으로 이어짐.
    */
    console.log(error.config);
    console.log(error.config.headers);
    console.log(error.response.status);
    const ok = error.response.data.ok;
    const statusValue = error.response.status;
    if (statusValue === 401 && ok === 1) {
      console.log("status 401찍혀 122줄");
      cookies.remove("token", { path: "/" });
      // window.location.replace("/")
      //   // alert(`${err}`);
    }
    // else if (statusValue === 401 && ok === 2) {
    //   alert("로그인 후 이용 가능한 기능입니다")
    // }

    return Promise.reject(error);
  }
);

instanceF.interceptors.request.use(
  async (config) => {
    //여기 config는 위에거 복붙하면 됨 신경노노
    const accessToken = cookies.get("token");
    console.log(accessToken);
    // 요청 성공 직전 수행할 일
    console.log(config);
    console.log(config.headers);
    console.log(config.headers.Authorization);
    // const cookies = new Cookies();
    // const accessToken = cookies.get("token");

    // config.headers.Authorization = `Bearer ${accessToken}`;
    config.headers.Authorization = `Bearer ${cookies.get("token")}`;

    console.log("accTokenPm1155", token); //이건 무의미.신경노노

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
*/ //참고로 instanceF는 FormData용
instanceF.interceptors.response.use(
  //response 받기 전 가공해서 response로 내보내는 게 맞음

  (config) => {
    const accessToken = cookies.get("token");
    console.log(accessToken); //현재 장착되어있는 토큰
    console.log(config); //201 지나감
    console.log(config.data); //백에서 보내준 body값: newToken
    console.log(config.config.headers); //현재토큰 Author~on: Bearer ~
    console.log(config.config.headers.Authorization); //현재 토큰 Bearer ~
    console.log(config.config.data); //백에 보내서 비음
    // const ok = config.config.data.ok;
    const newToken = config.config.data.newJwtToken;
    console.log(newToken); //당연히 안 뜸
    //위에 콘솔은 당연히 안 뜸 config.data.newJwtToken에 있어서
    // 응답 데이터 가공.
    if (config.status === 201) {
      setCookie("token", newToken);
      return axios({
        ...config.config,
        headers: {
          Authorization: `Bearer ${newToken}`,
        },
      }).then((res) => {
        console.log(newToken);

        console.log(res);
        console.log(res.data.data);
        cookies.set("token", config.data.newJwtToken);
      });
    } else {
      return config;
    }
    // return response;
  },
  (error) => {
    console.log(error);
    /*
    http status가 401 경우 응답 에러 직전 호출.
    .catch() 으로 이어짐.
    */
    // console.log(error.config);
    // console.log(error.config.headers);
    // console.log(error.response.status);
    // console.log(error.response.data.errorMessage);
    // const statusValue = error.response.status;
    if (error.response.status === 401) {
      cookies.remove("token", { path: "/" });
      // window.location.replace("/");
      //   // cookies.get("token");
      //   // cookies.set("token", error.data.newToken);
      //   // alert(`${err}`);
    }

    return Promise.reject(error);
  }
);
