import mem from 'mem';

import { instance } from '../../apis/Instance';

const refreshTokenFn = async () => {
  const token = localStorage.getItem('token');

  try {
    const { data } = await instance.post('/newtoken', { token: token });

    const acctoken = data?.acctoken;

    if (!acctoken || acctoken.error) {
      alert('로그인이 만료되었습니다.');
      window.location.href = '/';
    }

    localStorage.setItem('token', acctoken);
    return data;
  } catch (error) {
    localStorage.removeItem('token');
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
