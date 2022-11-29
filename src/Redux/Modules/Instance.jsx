////src/Redux/Modules/Instance.js
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { removeCookie, setCookie } from "../../MyTools/Hooks/MyCookie";

const token = document.cookie.replace("token=", "");
const cookies = new Cookies();
// const token = cookies.get("token");
const code = new URL(window.location.href).searchParams.get("code");
// const navigator = useNavigate();
//instance 쓸 때는 headers값 안 넣어줘도 되지만,
//axios로 따로 써줄 경우는 header 매번 넣어줘야 함.
//인스턴스 - api 전역관리
const yhURL = process.env.REACT_APP_YH_HOST;

const instance = axios.create({
  baseURL: `${yhURL}`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const instanceF = axios.create({
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
  // getLogin: () => instance.get(`/auth/kakao/callback?code=${code}`),
  postAuthPhone: (payload) => instance.post(`/auth2/phone`, payload),
  postAuthCode: (payload) => instance.post(`/auth2/compare`, payload),
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
    console.log("응답인터셉터정보 77줄", config);
    const accessToken = cookies.get("token");
    console.log(accessToken); //현재 장착되어있는 토큰
    console.log(config); //200,201 값, 리프레쉬토큰 만료되면 200대 안 들어옴
    console.log(config.data); //백에서 보내준 body값: newToken
    console.log(config.config.headers); //현재토큰 Author~on: Bearer ~
    console.log(config.config.headers.Authorization); //현재 토큰 Bearer ~
    console.log(config.config.data); //백에 보내서 비음
    // const ok = config.config.data.ok;
    const newToken = config.data.newJwtToken;
    console.log(newToken);
    //위에 콘솔은 config.data.newJwtToken에 있어
    // 응답 데이터 가공.
    if (config.status === 200) {
      console.log("status 200번대");
    }
    if (config.status === 201) {
      //새토큰갈아끼우는곳
      console.log("성공 201찍혀 95줄");
      setCookie("token", newToken, { path: "/" }); //1.새토큰세팅하고
      return axios({
        ...config.config,
        headers: {
          Authorization: `Bearer ${newToken}`, //2.새토큰장착
        },
      }).then((res) => {
        console.log(newToken);

        // cookies.set("token", config.data.newJwtToken); 이건 필요하면 쓰고 아님 말규
      });
    } else {
      return config;
    }
  },
  (error) => {
    //일반요청에러 400대
    console.log("res 에러 처리 109줄");
    console.log(error); //400에러 지나감
    console.log(error.response.status); //status(400)에러
    console.log(error.response.data); //백에서보낸errorbody값
    console.log(error.response.data.error); //백에서보낸 errorbody키값
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
      window.location.replace("/");
    } else if (statusValue === 401 && ok === 6) {
      console.log("401에러");

      return axios
        .get(`${yhURL}/authbaby`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          console.log(res.data);
          console.log(res.headers);
          const newToken = res.response.data.newJwtToken;
          const msg = res.response.data.msg;
          console.log(newToken);
          console.log(msg);
          setCookie("token", newToken, { path: "/" });
          res.headers["Authorization"] = `Bearer ${newToken}`;
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return Promise.reject(error);
  }
);
//폼데이터 인터셉터
instanceF.interceptors.request.use(
  async (config) => {
    const token = cookies.get("token");
    // console.log(token);
    // 요청 성공 직전 수행할 일
    console.log("폼데이터 인터셉터정보 166줄", config); //여기부터 요청시작
    console.log(config.headers);
    console.log(config.headers.Authorization); //이건 Bearer만 찍히는 게 맞아.

    config.headers["Authorization"] = `Bearer ${token}`;
    console.log("토큰 여기까지 찍혀 171줄", token);
    // console.log("accTokenPm1155", token);

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
    // const navigator = useNavigate();
    console.log("폼데이터 res 인터셉터정보 184줄");
    const accessToken = cookies.get("token");
    console.log(accessToken); //현재 장착되어있는 토큰
    console.log("status(200)대 정보", config); //200,201 값, 리프레쉬토큰 만료되면 200대 안 들어옴
    console.log(config.data); //백에서 보내준 body값: newToken
    console.log(config.config.headers); //현재토큰 Author~on: Bearer ~
    console.log(config.config.headers.Authorization); //현재 토큰 Bearer ~
    console.log(config.config.data); //백에 보내서 비음
    // const ok = config.config.data.ok;
    const newToken = config.data.newJwtToken;
    console.log(newToken);
    //위에 콘솔은 config.data.newJwtToken에 있어
    // 응답 데이터 가공.
    if (config.status === 200) {
      console.log("status 200번대");
    }
    if (config.status === 201) {
      //새토큰갈아끼우는곳
      console.log("성공 201찍혀 95줄");
      setCookie("token", newToken, { path: "/" }); //1.새토큰세팅하고
      return axios({
        ...config.config,
        headers: {
          Authorization: `Bearer ${newToken}`, //2.새토큰장착
        },
      }).then((res) => {
        console.log(res);
        console.log(res.data.msg);
        const msg = res.data.msg;
        alert(msg);
        navigator("/subwaypage");
        // window.location.replace("/subwaypage");
        // cookies.set("token", config.data.newJwtToken); 이건 필요하면 쓰고 아님 말규
      });
    } else {
      return config;
    }
  },
  (error) => {
    /*
    http status가 401 경우 응답 에러 직전 호출.
    .catch() 으로 이어짐.
    */
    //폼데이터 response 400대 혹은 그 외 에러
    // const navigator = useNavigate();
    console.log("폼데이터 res 에러 처리 220줄");
    console.log(error); //400에러 지나감
    console.log(error.response.status); //status(400)에러
    console.log(error.response.data); //백에서보낸errorbody값
    //error.response.data.newJwtToken

    // console.log(error.config);
    // console.log(error.config.headers);//현재토큰
    console.log(error.response.status); //401
    // const token = cookies.get("token");
    const newToken = error.response.data.newJwtToken;
    const ok = error.response.data.ok;
    // const msg = error.response.data.message;

    const statusValue = error.response.status;
    if (statusValue === 401 && ok !== 6) {
      console.log("status 401찍혀 249줄");
      alert("비정상적인 활동이 감지되어 로그인 화면으로 이동합니다.");
      removeCookie("token", { path: "/" });
      // window.location.replace("/");
    } else if (statusValue === 401 && ok === 6) {
      console.log("401에러");
      //newToken발행하는 미들웨어로
      console.log(newToken);
      if (newToken) {
        setCookie("token", newToken);
        return axios({
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        }).then((res) => {
          console.log(res);
          cookies.set("token", newToken);
        });
      }

      // const newToken = res.data.newToken;
      // const msg = res.data.data.msg;
      // console.log(newToken);

      // setCookie("token", newToken, { path: "/" });
      // res.headers["Authorization"] = `Bearer ${newToken}`;
    }

    return Promise.reject(error);
  }
);
