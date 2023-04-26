import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Complete = () => {
  const navigate = useNavigate();
  const completeHandler = () => {
    navigate("/email");
  };
  return (
    <Wrap>
      <TextBox>
        <AuthSpan>발송 되었습니다.</AuthSpan>
        <TextSpan>
          인증번호가 전송되었습니다. 인증번호를 확인하시고 로그인 해 주세요.
        </TextSpan>
      </TextBox>

      <ConfirmButton onClick={completeHandler}>로그인 하기</ConfirmButton>
    </Wrap>
  );
};

export default Complete;
const Wrap = styled.div`
  margin-top: 98px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ConfirmButton = styled.button`
  margin-top: 151px;
  width: 343px;
  height: 50px;
  color: #ffffff;
  background-color: #fa3a45;
`;

const TextBox = styled.div`
  width: 229px;
  height: 44px;
  /* margin-top: 30px; */
  gap: 10px;
  display: flex;
  flex-direction: column;
  margin-right: 114px;
`;
const AuthSpan = styled.span`
  width: 112px;
  height: 20px;
  font-family: Pretendard;
  font-weight: 600;
  font-size: 17px;
  text-align: center;
`;
const TextSpan = styled.span`
  width: 325px;
  height: 14px;
  font-family: Pretendard;
  font-weight: 500;
  font-size: 12px;
  text-align: center;
  color: #838383;
`;
