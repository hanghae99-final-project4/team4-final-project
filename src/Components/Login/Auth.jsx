import React from "react";
import styled from "styled-components";

const Auth = () => {
  return (
    <Wrap>
      <TextBox>
        <AuthSpan>인증수단 선택</AuthSpan>
        <TextSpan>인증번호가 전송될 인증 수단을 선택해주세요</TextSpan>
      </TextBox>
      <AuthDiv>
        <Emailinput type="radio" id="email" />
        <AuthBox>
          <Authemail for="email">등록된 이메일주소로 인증</Authemail>
          <Email for="email">{"wyswhsl21@naver.com"}</Email>
        </AuthBox>
      </AuthDiv>

      <ConfirmButton>확인</ConfirmButton>
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
const AuthDiv = styled.div`
  margin-top: 33px;
  display: flex;
  margin-right: 155px;
  gap: 10px;
`;

const Emailinput = styled.input`
  border-bottom: 1px solid #e3e3e3;
  width: 24px;
  height: 24px;
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
  background-color: rgba(250, 58, 69, 0.3);
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
  width: 108px;
  height: 20px;
  font-family: Pretendard;
  font-weight: 600;
  font-size: 17px;
  text-align: center;
`;
const TextSpan = styled.span`
  width: 245px;
  height: 14px;
  font-family: Pretendard;
  font-weight: 500;
  font-size: 12px;
  text-align: center;
  color: #838383;
`;
const Authemail = styled.label`
  font-family: Pretendard;
  font-weight: 500;
  font-size: 14px;
  line-height: 16.71px;
`;
const Email = styled.label`
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
