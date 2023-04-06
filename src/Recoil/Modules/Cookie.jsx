import React from "react";
import { Cookies, useCookies } from "react-cookie";

const cookies = new Cookies();

export const getCookie = (token) => {
  return cookies.get(token);
};
