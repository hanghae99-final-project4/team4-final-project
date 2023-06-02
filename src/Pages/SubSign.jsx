import React, { useState } from 'react';
import styled from 'styled-components';
import useInput from '../MyTools/Hooks/UseInput';
import FrontHeader from '../Components/Header/FrontHeader';
import { useCookies } from 'react-cookie';
import userid from '../Assets/SubSign/UserId.svg';
import pw from '../Assets/SubSign/Password.svg';
import pwConfirm from '../Assets/SubSign/PasswordConfirm.svg';
import norminfo from '../Assets/SubSign/NormInfo.svg';
import { useNavigate } from 'react-router-dom';
import { trainApi } from '../apis/Instance';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const SubSign = () => {
  const navigator = useNavigate();
  const [, , removeCookie] = useCookies(['token']);
  const [Info, setInfo, onChangeValue, reset] = useInput({
    account: '',
    password: '',
    confirmpassword: '',
    nickname: '',
  });
  //yup schema
  const schema = yup.object().shape({
    name: yup
      .string() //문자열 제일먼저 체크

      .required('이름을 입력해주세요.') //다음 빈칸인지 체크
      .matches(/^[가-힣]{2,20}$/, '2~20자로 입력해주세요.'), //다음 정규식 체크
    password: yup
      .string() //문자열 체크

      .required('비밀번호를 입력해주세요') // 빈칸인지 체크
      .matches(
        /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,30}$/,
        '비밀번호를 8~30자로 영문 대소문자, 숫자, 특수문자를 조합해서 사용하세요.'
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
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  return (
    <Wrap>
      <SignForm>
        <Emailinput type="text" placeholder="이름" />
        <Emailinput type="text" placeholder="이메일" />
        <Emailinput type="text" placeholder="비밀번호" />
        <Emailinput type="text" placeholder="비밀번호 확인" />
      </SignForm>
      <SignupButton>다음</SignupButton>
    </Wrap>
  );
};

export default SubSign;
// 에러 메세지
const ErrorMessage = styled.div`
  width: 291px;
  color: #808080;

  margin-top: 4px;
  font-family: 'MonoplexKR-Regular';
  font-size: 0.8rem;
`;

const Emailinput = styled.input`
  border-bottom: 1px solid #e3e3e3;
  width: 343px;
  height: 50px;
  outline: none;
`;
const Wrap = styled.div`
  margin-top: 98px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const SignForm = styled.form`
  gap: 26px;
  display: flex;
  flex-direction: column;
  font-family: Pretendard;
  font-weight: 400;
  font-size: 16px;
`;

const SignupButton = styled.button`
  margin-top: 56px;
  width: 343px;
  height: 50px;
  color: #ffffff;
  background-color: rgba(250, 58, 69, 0.3);
`;
