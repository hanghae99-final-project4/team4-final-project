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
import Header, { MessageBox, PointerBox } from '../Header/Header';
import HeaderIcon from '../../Element/HeaderIcon';
import { useRef } from 'react';
import { useEffect } from 'react';
import AuthTimer from '../Timer/AuthTimer';

const Signup = () => {
  const navigator = useNavigate();
  const [Info, setInfo, onChangeValue, reset] = useInput({
    account: '',
    password: '',
    confirmpassword: '',
    nickname: '',
  });
  const [auth, setAuth] = useState(false);
  const agreepi = useRecoilValue(useAgreeState);
  const inputRefs = useRef([]);
  // auth 잘못 치면 나오는 상태값
  const [missAuth, setMissAuth] = useState(false);
  //
  const [authCnt, setAuthCnt] = useState(0);
  //5번 이상 틀렸을 시
  const [authTime, setAuthTime] = useState(false);
  // retry 토스트 메시지
  const [retry, setRetry] = useState(false);
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
    passwordconfirm: yup
      .string()
      .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.'),
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
    const email = data.email;

    const password = data.password;
    const passwordconfirm = data.passwordconfirm;
    try {
      const { data } = await trainApi.postSubSign({
        account: email,
        password: password,
        password2: passwordconfirm,
        agreepi: agreepi,
      });

      const msg = data.msg;
      if (msg === '성공') {
        alert('회원가입이 되셨습니다.');
        navigator('/');
      }
    } catch (err) {
      window.alert(err.response.data.error);
    }
  };
  //이메일 인증 핸들러
  const authHandler = async () => {
    try {
      const { data } = await trainApi.authEmail({ email: getFields.email });
      if (getFields.email !== '' && getFields.email) {
        setAuth(!auth);
        console.log(getFields.email);
      }
    } catch (err) {}
  };
  const retryHandler = async () => {
    setRetry(!retry);
    try {
      const { data } = await trainApi.authEmail({ email: getFields.email });
      setRetry(true);
    } catch (err) {}
  };

  //
  const handleInputChange = (index, event) => {
    const { value } = event.target;
    if (value !== '') {
      const nextIndex = index + 1;
      if (nextIndex < inputRefs.current.length) {
        inputRefs.current[nextIndex].focus();
      } else {
        authCodeHandler();
      }
    }
  };
  //복사 핸들러
  const handlePaste = (index, event) => {
    const pastedValue = event.clipboardData.getData('text');
    const digits = pastedValue
      .split('')
      .filter((char) => !isNaN(parseInt(char, 10)));

    let currentInputIndex = index;
    let currentDigitIndex = 0;

    while (currentDigitIndex < digits.length) {
      if (currentInputIndex >= inputRefs.current.length) {
        break; // 더 이상 처리할 input이 없으면 종료
      }

      const currentInput = inputRefs.current[currentInputIndex];
      currentInput.value = digits[currentDigitIndex];
      handleInputChange(currentInputIndex, {
        target: { value: digits[currentDigitIndex] },
      });
      currentDigitIndex += 1;
      currentInputIndex += 1;
    }
  };
  console.log(
    inputRefs.current[0]?.value +
      inputRefs.current[1]?.value +
      inputRefs.current[2]?.value
  );
  console.log(inputRefs);
  const authCodeHandler = async () => {
    if (authCnt < 5) {
      try {
        const { data } = await trainApi.authCode({
          email: getFields.email,
          authcode:
            inputRefs.current[0]?.value +
            inputRefs.current[1]?.value +
            inputRefs.current[2]?.value,
        });
        setAuth(!auth);
        // auth code 잘못 기입 했을 시
      } catch (err) {
        setMissAuth(true);
      }
      // 잘못 입력했을 시 cnt 1증가
      setAuthCnt((prev) => prev + 1);
      if (authCnt === 4) {
        setAuthTime(true);
      }
    } else {
      setTimeout(() => setAuthCnt(0), 60000 * 5);
    }
  };

  return (
    <>
      {auth ? (
        <>
          <Header>
            <PointerBox>
              <HeaderIcon />
            </PointerBox>
            <MessageBox margin="94px">{'인증번호'}</MessageBox>
          </Header>
          <Wrap>
            <AuthCodeBox>
              <input
                type="text"
                ref={(ref) => (inputRefs.current[0] = ref)}
                onChange={(e) => handleInputChange(0, e)}
                onPaste={(e) => handlePaste(0, e)}
                maxLength={1}
              />

              <input
                type="text"
                ref={(ref) => (inputRefs.current[1] = ref)}
                onChange={(e) => handleInputChange(1, e)}
                onPaste={(e) => handlePaste(1, e)}
                maxLength={1}
              />

              <input
                type="text"
                ref={(ref) => (inputRefs.current[2] = ref)}
                onChange={(e) => handleInputChange(2, e)}
                onPaste={(e) => handlePaste(2, e)}
                maxLength={1}
              />
            </AuthCodeBox>
            {authTime ? <AuthTimer /> : ''}
            {missAuth ? (
              <>
                <MissSpan className={missAuth ? 'miss' : ''}>
                  인증번호를 잘못 입력하셨습니다. ({authCnt}/5)
                  <br />
                  다시 시도 해 주세요.
                </MissSpan>
              </>
            ) : (
              <>
                <MissSpan>
                  이메일로 인증번호를 발송했습니다.
                  <br />
                  받으신 인증번호를 시간 안에 입력해주세요.
                </MissSpan>
              </>
            )}
            <RetryBox>
              <span>이메일을 받지 못하셨나요?</span>
              <span onClick={retryHandler} className="retry">
                재전송
              </span>
            </RetryBox>
            {retry && (
              <ToastMessage>
                <span>재 발송 완료</span>
                <span className="email">
                  {getFields.email}로 재발송 되었습니다.
                </span>
              </ToastMessage>
            )}
          </Wrap>
        </>
      ) : (
        <>
          {' '}
          <Header>
            <PointerBox>
              <HeaderIcon />
            </PointerBox>
            <MessageBox margin="94px">{'가입하기'}</MessageBox>
          </Header>
          <Wrap>
            <SignForm onSubmit={handleSubmit(onSignup)}>
              <InfoBox className="email">
                <InputBox>
                  <input
                    type="text"
                    placeholder="이메일"
                    {...register('email')}
                  />
                  <span
                    className={
                      !errors?.email?.message &&
                      getFields.email !== '' &&
                      getFields.email
                        ? 'active'
                        : ''
                    }
                    onClick={authHandler}
                  >
                    인증
                  </span>
                </InputBox>

                <Errormessage>{errors?.email?.message}</Errormessage>
              </InfoBox>
              <InfoBox>
                <Emailinput
                  type="password"
                  placeholder="비밀번호"
                  {...register('password')}
                />
                <Errormessage>{errors?.password?.message}</Errormessage>
              </InfoBox>
              <InfoBox>
                <Emailinput
                  type="password"
                  placeholder="비밀번호 확인"
                  {...register('passwordconfirm')}
                />
                <Errormessage>{errors?.passwordconfirm?.message}</Errormessage>
              </InfoBox>
              <SignupButton
                className={
                  !errors?.email?.message &&
                  !errors?.password?.message &&
                  !errors?.passwordconfirm?.message &&
                  getFields.email !== '' &&
                  getFields.password !== '' &&
                  getFields.passwordconfirm !== ''
                    ? 'active'
                    : ''
                }
                type="submit"
              >
                다음
              </SignupButton>
            </SignForm>
          </Wrap>
        </>
      )}
    </>
  );
};

export default Signup;
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
const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 343px;
  height: 50.67px;
  border-bottom: 1px solid #e3e3e3;
  span {
    &.active {
      cursor: pointer;
      color: #fa3a45;
    }
  }
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
const AuthCodeBox = styled.div`
  height: 60px;
  width: 170px;
  gap: 10px;
  display: flex;
  border-radius: 4px;
  input {
    font-family: Pretendard;
    font-size: 24px;
    font-weight: 600;

    text-align: center;

    height: 60px;
    width: 50px;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    padding: 10px;
  }
`;
const MissSpan = styled.div`
  margin-top: 10px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  color: #555555;
  text-align: center;
  &.miss {
    color: #d14343;
  }
`;
const RetryBox = styled.div`
  margin-top: 70px;
  width: 201px;
  height: 17px;
  gap: 13px;
  display: flex;
  span {
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    color: #666666;
    text-align: center;
    &.retry {
      cursor: pointer;
      font-family: Pretendard;
      font-size: 14px;
      font-weight: 500;
      text-decoration-line: underline;
      color: #4293de;
      text-align: center;
    }
  }
`;
export const ToastMessage = styled.div`
  position: fixed;
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 14px;
  width: 300px;
  height: 80px;
  opacity: 0;
  background: rgba(24, 24, 24, 0.6);
  border-radius: 5px;
  color: #fff;
  animation: fadeOut 5s ease-in;
  span {
    font-family: Pretendard;
    font-size: 17px;
    font-weight: 500;

    text-align: center;
    &.email {
      font-family: Cairo;
      font-size: 13px;
      font-weight: 400;

      text-align: center;
    }
  }
  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;
