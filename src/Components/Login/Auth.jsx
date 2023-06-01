import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { useEmailState } from '../../Recoil/userList';

const Auth = () => {
  const email = useRecoilValue(useEmailState);
  const navigate = useNavigate();
  const completeHandler = () => {
    navigate('/email');
  };

  return (
    <Wrap>
      <TextBox>
        <AuthSpan>비밀번호를 전송했어요.</AuthSpan>
        <TextSpan>
          비밀번호 재설정을 위한 이메일을 전송했어요.
          <br />
          이메일이 오지 않았다면, 이메일이 맞는지 확인해주세요.
        </TextSpan>
      </TextBox>
      <AuthDiv>{email}</AuthDiv>

      <ConfirmButton onClick={completeHandler}>로그인 하기</ConfirmButton>
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
  margin-top: 50px;
  display: flex;

  justify-content: center;
  height: 50px;
  width: 343px;
  border-radius: 4px;
  padding: 10px;
  background-color: #f9f9f9;

  font-size: 16px;
  font-weight: 500;
  color: #2d2d2d;
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
    content: '';
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
  width: 260px;
  height: 67px;

  gap: 14px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const AuthSpan = styled.span`
  font-family: Pretendard;
  font-size: 17px;
  font-weight: 600;
  color: #2d2d2d;
`;
const TextSpan = styled.span`
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
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
