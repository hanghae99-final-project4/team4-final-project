import React from "react";
import Subway from "../Components/Chatting/Subway";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import styled from "styled-components";

const SubwayPage = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  //쿼리 token 가져오기
  let getParameter = (key) => {
    return new URLSearchParams(window.location.search).get(key);
  };
  const code = getParameter("sexybaby");

  //구글,카카오 로그인 할 경우 파라미터 값 가져와서 토큰 쿠키에 장착하기.
  useEffect(() => {
    if (code !== null) {
      removeCookie("token");
      setCookie("token", code, { path: "/" });
    }
  }, []);

  return (
    <SubWayDiv>
      <Subway />;
    </SubWayDiv>
  );
};

export default SubwayPage;
const SubWayDiv = styled.div`
  overflow: hidden;
`;
