import React, { useState } from 'react';
import styled from 'styled-components';
import useInput from '../../MyTools/Hooks/UseInput';
import { useNavigate } from 'react-router-dom';
import { trainApi } from '../../apis/Instance';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { useAgreeState } from '../../Recoil/userList';

const PasswordChange = () => {
  const navigator = useNavigate();

  //yup schema
  const schema = yup.object().shape({
    password: yup
      .string()
      .required('이메일을 입력해주세요')
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/,
        '영어+숫자를  8글자 이상 입력해주세요'
      ),

    newpassword: yup
      .string() //문자열 체크

      .required('비밀번호를 입력해주세요') // 빈칸인지 체크
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/,
        '영어+숫자를  8글자 이상 입력해주세요'
      ) // 정규식 체크 후
      .min(8, '비밀번호는 최소 8글자 이상입니다.') //비밀번호 최소 자리 체크
      .max(30, '비밀번호는 최대 30글자 이상입니다.'), // 비밀번호 최대 자리 체크
    passwordconfirm: yup
      .string()
      .oneOf([yup.ref('newpassword'), null], '비밀번호가 일치하지 않습니다.'),
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

  //확인버튼
  const onSignup = async (data) => {
    const Id = localStorage.getItem('userId');
    const password = data.password;
    const newPassword = data.newpassword;

    try {
      const { data } = await trainApi.patchPw(Id, password, newPassword);

      const msg = data.result;
      if (msg === '성공') {
        alert('비밀번호가 수정 되었습니다.');
        navigator('/mypage');
      }
    } catch (err) {
      window.alert(err.response.data.error);
    }
  };

  return (
    <Wrap>
      <SignForm onSubmit={handleSubmit(onSignup)}>
        <InfoBox>
          <Emailinput
            type="password"
            placeholder="기존 비밀번호"
            {...register('password')}
          />
          <Errormessage>{errors?.password?.message}</Errormessage>
        </InfoBox>
        <InfoBox>
          <Emailinput
            type="password"
            placeholder="새 비밀번호"
            {...register('newpassword')}
          />
          <Errormessage>{errors?.newpassword?.message}</Errormessage>
        </InfoBox>
        <InfoBox>
          <Emailinput
            type="password"
            placeholder="새 비밀번호 확인"
            {...register('passwordconfirm')}
          />
          <Errormessage>{errors?.passwordconfirm?.message}</Errormessage>
        </InfoBox>
        <SignupButton
          className={
            !errors?.password?.message &&
            !errors?.newpassword?.message &&
            !errors?.passwordconfirm?.message &&
            getFields.password !== '' &&
            getFields.newpassword !== '' &&
            getFields.passwordconfirm !== ''
              ? 'active'
              : ''
          }
          type="submit"
        >
          확인
        </SignupButton>
      </SignForm>
    </Wrap>
  );
};

export default PasswordChange;
// 에러 메세지
const Errormessage = styled.div`
  color: #d14343;
  height: 25px;
  font-weight: 500;
  margin-top: 3.33px;

  font-size: 14px;
`;
const InfoBox = styled.div`
  width: 343px;
  height: 76px;
  display: flex;
  flex-direction: column;
`;
const Emailinput = styled.input`
  border-bottom: 1px solid #e3e3e3;
  width: 343px;
  height: 50.67px;
  outline: none;
  color: #4d4d4d;
  font-size: 16px;
  font-weight: 400;
`;
const Wrap = styled.div`
  margin-top: 98px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const SignForm = styled.form`
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
  &.active {
    background-color: #fa3a45;
  }
`;
