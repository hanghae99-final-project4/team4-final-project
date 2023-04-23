import React from "react";
import EmailLogin from "../Components/Login/EmailLogin";
import Header from "../Components/Header/Header";
import styled from "styled-components";

const EmailPage = () => {
  return (
    <Wrap>
      <Header msg={"이메일로 시작하기"} />
      <EmailLogin />
    </Wrap>
  );
};

export default EmailPage;

export const Wrap = styled.div`
  width: 375px;
  height: 812px;

  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
