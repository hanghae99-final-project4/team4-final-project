import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const EmailLogin = () => {
  const navigate = useNavigate();
  const passwordMiss = () => {
    navigate("/reset");
  };
  return (
    <Wrap>
      <LoginForm>
        <Emailinput placeholder="이메일" />
        <Passwordinput placeholder="비밀번호"></Passwordinput>
      </LoginForm>

      <LoginButton>로그인</LoginButton>
      <PasswordMiss onClick={passwordMiss}>
        비밀번호가 생각나지 않으시나요?
      </PasswordMiss>
      <NoaccountBox>
        <Noaccount>계정이 없으신가요?</Noaccount>
        <div>이메일로 회원가입</div>
      </NoaccountBox>
    </Wrap>
  );
};

export default EmailLogin;

const Wrap = styled.div`
  margin-top: 98px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const LoginForm = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

const Emailinput = styled.input`
  border-bottom: 1px solid #e3e3e3;
  width: 343px;
  height: 50px;
`;

const Passwordinput = styled.input`
  border-bottom: 1px solid #e3e3e3;
  width: 343px;
  height: 50px;
`;
const LoginButton = styled.button`
  margin-top: 50px;
  width: 343px;
  height: 50px;
  color: #ffffff;
  background-color: rgba(250, 58, 69, 0.3);
`;
const PasswordMiss = styled.div`
  margin: 0 auto;
  margin-top: 30px;
  color: #696969;
  border-bottom: 1px solid #696969;
  align-items: center;
  width: 182px;
  height: 14px;
  font-size: 12px;
  font-weight: 500;
  line-height: 14.32px;
  font-family: Pretendard;
`;
const NoaccountBox = styled.div`
  margin-top: 240px;
  gap: 16.5px;
`;
const Noaccount = styled.span`
  color: #a0a0a0;
`;
const EmailSign = styled.span`
  color: #333333;
`;
