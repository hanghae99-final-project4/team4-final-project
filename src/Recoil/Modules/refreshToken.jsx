import mem from "mem";

import { instance } from "../../apis/Instance";
import {
  getCookie,
  removeCookie,
  setCookie,
} from "../../MyTools/Hooks/MyCookie";

const refreshTokenFn = async () => {
  const token = getCookie("token");

  try {
    const { data } = await instance.post("/newtoken", { token: token });

    const acctoken = data?.acctoken;
    console.log(acctoken);
    if (!acctoken) {
      removeCookie("token");
    }
    setCookie("token", acctoken);
    return data;
  } catch (error) {
    console.log(error);
    removeCookie("token");
  }
};
const maxAge = 10000;

export const memoizedRefreshToken = mem(refreshTokenFn, {
  maxAge,
});

// const refreshTokenF = async () => {
//   const token = getCookie("token");
//   try {
//     const { data } = await instance.post("/newtoken", { token: token });
//     const acctoken = data.acctoken;
//     if (!acctoken) {
//       removeCookie("token");
//     }
//     setCookie("token", acctoken);
//     return token;
//   } catch (error) {
//     removeCookie("token");
//   }
// };
// export const memoizedRefreshTokenF = mem(refreshTokenF, {
//   maxAge,
// });
