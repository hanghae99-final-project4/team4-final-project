import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as yup from 'yup';
import { Errormessage } from './EmailLogin';

const Resetpw = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('이메일을 입력해주세요')
      .matches(
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{3}$/,
        '올바른 이메일 형식으로 작성 해주세요.'
      ),
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const getFields = getValues();
  const navigate = useNavigate();
  const confirmHandler = () => {
    navigate('/auth');
  };
  return (
    <Wrap>
      <TextBox>
        <ResetSpan>비밀번호 재설정</ResetSpan>
        <TextSpan>회원가입 시 등록한 이메일 주소를 입력해 주세요.</TextSpan>
      </TextBox>
      <LoginForm>
        <Emailinput placeholder="이메일 주소" {...register('email')} />
        {errors?.email?.message && (
          <Errormessage>{errors?.email?.message}</Errormessage>
        )}
      </LoginForm>

      <ConfirmButton
        className={
          !errors?.email?.message && getFields.email !== '' ? 'active' : ''
        }
        onClick={confirmHandler}
      >
        확인
      </ConfirmButton>
    </Wrap>
  );
};

export default Resetpw;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LoginForm = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

const Emailinput = styled.input`
  border-bottom: 1px solid #e3e3e3;
  width: 343px;
  height: 50px;
  outline: none;
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
  &.active {
    background-color: #fa3a45;
  }
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
const ResetSpan = styled.span`
  width: 107px;
  height: 20px;
  font-family: Pretendard;
  font-weight: 600;
  font-size: 17px;
  text-align: center;
`;
const TextSpan = styled.span`
  width: 229px;
  height: 14px;
  font-family: Pretendard;
  font-weight: 500;
  font-size: 12px;
  text-align: center;
  color: #838383;
`;
