import axios from "axios";

import { memoizedRefreshToken, memoizedRefreshTokenF } from "./refreshToken";
import { getCookie } from "../../MyTools/Hooks/MyCookie";
import { instance, instanceF } from "./Instance";

instanceF.interceptors.request.use(
  async (config) => {
    const token = getCookie("token");
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

instanceF.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    if (error.response.status === 401 && !config?.sent) {
      config.sent = true;
      const result = await memoizedRefreshToken();
      console.log(result);
      if (result?.acctoken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${result?.acctoken}`,
        };
      }
      return axios(config);
    }
    return Promise.reject(error);
  }
);
export const axiosPrivate = instanceF;
