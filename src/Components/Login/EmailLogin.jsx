import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { trainApi } from '../../apis/Instance';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const EmailLogin = () => {
  const navigate = useNavigate();
  const passwordMiss = () => {
    navigate('/reset');
  };
  const signinHandler = () => {
    navigate('/agree');
  };
  const loginHandler = async (data) => {
    const email = data.email;
    const password = data.password;
    try {
      const { data } = await trainApi.postSignIn({
        account: email,
        password: password,
      });
      const userId = data?.data.rest?.user_id;
      const token = data?.data.token;
      localStorage.setItem('userId', userId);
      localStorage.setItem('token', token);
      data?.data.rest?.nickname === null
        ? navigate('/setgender')
        : navigate('/subwaypage');
    } catch (err) {
      window.alert(err.response.data.error);
    }
  };

  //yup schema
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('이메일을 입력해주세요')
      .matches(
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{3}$/,
        '올바른 이메일 형식으로 작성 해주세요.'
      ),

    password: yup
      .string() //문자열 체크

      .required('비밀번호를 입력해주세요') // 빈칸인지 체크
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/,
        '영어+숫자를  8글자 이상 입력해주세요'
      ) // 정규식 체크 후
      .min(8, '비밀번호는 최소 8글자 이상입니다.') //비밀번호 최소 자리 체크
      .max(30, '비밀번호는 최대 30글자 이상입니다.'), // 비밀번호 최대 자리 체크
  });

  //react-hook-form
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

  return (
    <Wrap>
      <LoginForm onSubmit={handleSubmit(loginHandler)}>
        <Emailinput type="text" placeholder="이메일" {...register('email')} />
        <Errormessage>{errors?.email?.message}</Errormessage>
        <Passwordinput
          type="password"
          placeholder="비밀번호"
          {...register('password')}
        ></Passwordinput>
        <Errormessage>{errors?.password?.message}</Errormessage>
        <LoginButton
          className={
            !errors?.email?.message &&
            !errors?.password?.message &&
            getFields !== '' &&
            getFields.password !== ''
              ? 'active'
              : ''
          }
          type="submit"
        >
          로그인
        </LoginButton>
      </LoginForm>

      <PasswordMiss onClick={passwordMiss}>
        비밀번호가 생각나지 않으시나요?
      </PasswordMiss>
      <NoaccountBox>
        <Noaccount>계정이 없으신가요?</Noaccount>
        <EmailSign onClick={signinHandler}>이메일로 회원가입</EmailSign>
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
  &.active {
    background-color: #fa3a45;
  }
`;
const PasswordMiss = styled.div`
  cursor: pointer;
  margin: 0 auto;
  margin-top: 30px;
  color: #696969;
  border-bottom: 1px solid #696969;
  align-items: center;
  width: 158px;
  height: 14px;
  font-size: 12px;
  font-weight: 500;
  line-height: 14.32px;
  font-family: Pretendard;
`;
const NoaccountBox = styled.div`
  margin-top: 100px;
  gap: 16.5px;
  display: flex;
  flex-direction: column;
`;
const Noaccount = styled.span`
  color: #a0a0a0;
`;
const EmailSign = styled.span`
  color: #333333;
  cursor: pointer;
`;
export const Errormessage = styled.div`
  color: #d14343;
  height: 17px;
  font-weight: 500;
  margin-top: 3.33px;

  font-size: 14px;
  &.useable {
    color: #8fb398;
  }
  &.confirm {
    opacity: 0;
    animation: fadeout 2s ease-in;

    @keyframes fadeout {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  }
`;
