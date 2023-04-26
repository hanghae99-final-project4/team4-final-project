import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Auth = () => {
  const navigate = useNavigate();
  const completeHandler = () => {
    navigate("/complete");
  };
  return (
    <Wrap>
      <TextBox>
        <AuthSpan>인증수단 선택</AuthSpan>
        <TextSpan>인증번호가 전송될 인증 수단을 선택해주세요</TextSpan>
      </TextBox>
      <AuthDiv>
        <Emailinput type="radio" id="email" checked />
        <AuthBox>
          <Authemail for="email">등록된 이메일주소로 인증</Authemail>
          <Email for="email">{"wyswhsl21@naver.com"}</Email>
        </AuthBox>
      </AuthDiv>

      <ConfirmButton onClick={completeHandler}>확인</ConfirmButton>
    </Wrap>
  );
};

export default Auth;
const Wrap = styled.div`
  margin-top: 98px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const AuthDiv = styled.label`
  margin-top: 33px;
  display: flex;
  margin-right: 155px;
  gap: 10px;
`;

const Emailinput = styled.input`
  width: 20px;
  height: 20px;
  vertical-align: middle;
  appearance: none;
  border: max(2px, 0.1em) solid #cfcfcf;
  border-radius: 50%;

  &:checked {
    background-color: white;
    border: 1px solid #cfcfcf;
  }
  &:checked::before {
    content: "";
    display: block;
    width: 12px;
    height: 12px;
    margin: 3px;
    background-color: #cfcfcf;
    border-radius: 50%;
  }
`;

const Passwordinput = styled.input`
  border-bottom: 1px solid #e3e3e3;
  width: 343px;
  height: 50px;
`;
const ConfirmButton = styled.button`
  margin-top: 56px;
  width: 343px;
  height: 50px;
  color: #ffffff;
  background-color: #fa3a45;
`;

const NoaccountBox = styled.div`
  margin-top: 240px;
  gap: 16.5px;
`;
const Noaccount = styled.span`
  color: #a0a0a0;
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
  width: 93px;
  height: 20px;
  font-family: Pretendard;
  font-weight: 600;
  font-size: 17px;
  text-align: center;
`;
const TextSpan = styled.span`
  width: 209px;
  height: 14px;
  font-family: Pretendard;
  font-weight: 500;
  font-size: 12px;
  text-align: center;
  color: #838383;
`;
const Authemail = styled.span`
  font-family: Pretendard;
  font-weight: 500;
  font-size: 14px;
  line-height: 16.71px;
`;
const Email = styled.span`
  font-family: Pretendard;
  font-weight: 400;
  font-size: 14px;
  line-height: 16.71px;
  color: #a0a0a0;
`;
const AuthBox = styled.div`
  display: flex;
  flex-direction: column;
`;
