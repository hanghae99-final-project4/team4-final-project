////src/Redux/Modules/Instance.js
import axios from "axios";
import { Cookies, useCookies } from "react-cookie";
import { removeCookie, setCookie } from "../../MyTools/Hooks/MyCookie";

const token = document.cookie.replace("token=", "");
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
// /인터셉터로 갱신된 토큰 교환
instance.interceptors.request.use(
  async (config) => {
    const token = cookies.get("token");

    config.headers["Authorization"] = `Bearer ${token}`;

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
    console.log("res 인터셉터정보 87줄");

    return config;
  },
  (error) => {
    /*
http status가 401 경우 응답 에러 직전 호출.
.catch() 으로 이어짐.
*/

    const newToken = error.response.data.newJwtToken;
    const ok = error.response.data.ok;
    const statusValue = error.response.status;

    if (statusValue === 401 && ok !== 6) {
      alert("비정상적인 활동이 감지되어 로그인 화면으로 이동합니다.");
      removeCookie("token", { path: "/" });
      window.location.replace("/");
    } else if (statusValue === 401 && ok === 6) {
      //토큰 만료됐을 때

      setCookie("token", newToken, { path: "/" }); //1.새토큰세팅하고
      return axios({
        ...error.config,
        headers: {
          Authorization: `Bearer ${newToken}`, //2.새토큰장착
        },
      });
    }

    return Promise.reject(error);
  }
);

//폼데이터 인터셉터
instanceF.interceptors.request.use(
  async (config) => {
    const token = cookies.get("token");
    // 요청 성공 직전 수행할 일

    config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  (error) => {
    console.log(error);
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
    const token = cookies.get("token");
    // 요청 성공 직전 수행할 일

    config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  (error) => {
    /*
http status가 401 경우 응답 에러 직전 호출.
.catch() 으로 이어짐.
*/
    //폼데이터 response 400대 혹은 그 외 에러

    const newToken = error.response.data.newJwtToken;
    const ok = error.response.data.ok;
    const statusValue = error.response.status;

    if (statusValue === 401 && ok !== 6) {
      alert("비정상적인 활동이 감지되어 로그인 화면으로 이동합니다.");
      removeCookie("token", { path: "/" });
      // window.location.replace("/"); //이부분은 필요시 사용. useNavigate()대체함수
    } else if (statusValue === 401 && ok === 6) {
      //만료됐을 때
      setCookie("token", newToken, { path: "/" }); //1.새토큰세팅하고
      return axios({
        ...error.config,
        headers: {
          Authorization: `Bearer ${newToken}`, //2.새토큰장착
        },
      });
    }

    return Promise.reject(error);
  }
);
