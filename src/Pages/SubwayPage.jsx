import React from "react";
import Subway from "../Components/Chatting/Subway";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import styled from "styled-components";
import { trainApi } from "../apis/Instance";
import { getCookie } from "../MyTools/Hooks/MyCookie";

const SubwayPage = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  //쿼리 token 가져오기
  const Id = localStorage.getItem("userId");
  console.log(Id);
  const token = localStorage.getItem("token");
  console.log(token);

  //구글,카카오 로그인 할 경우 파라미터 값 가져와서 토큰 쿠키에 장착하기.

  return (
    <SubWayDiv>
      <Subway />
    </SubWayDiv>
  );
};

export default SubwayPage;
const SubWayDiv = styled.div`
  overflow: hidden;
`;
