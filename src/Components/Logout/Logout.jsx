import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import select from '../../Assets/Logout/selecticon.svg';
import check from '../../Assets/Logout/check.svg';
import { trainApi } from '../../apis/Instance';
import { useNavigate } from 'react-router-dom';
import { SmallToast } from '../Profile/Mypage';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const Logout = () => {
  const [isCheck, setIsCheck] = useState(false);
  const [reason, setReason] = useState('');
  const [password, setPassword] = useState('');
  const [isLocal, setIsLocal] = useState(false);
  const [isEtc, setIsEtc] = useState(false);
  const [text, setText] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  //yup schema
  const schema = yup.object().shape({
    password: yup
      .string() //문자열 체크

      .required('비밀번호를 입력해주세요'), // 빈칸인지 체크
    reason: yup
      .string() //문자열 체크

      .required('탈퇴 사유를 기입해주세요.'), // 빈칸인지 체크
    text: yup
      .string() //문자열 체크

      .required('탈퇴 사유를 기입해주세요.'), // 빈칸인지 체크
  });

  const getProfile = async () => {
    try {
      const id = localStorage.getItem('userId');
      const { data } = await trainApi.getConvers(id);
      if (data?.userInfo?.result?.account_type === 'local') {
        setIsLocal(true);
      }
    } catch (err) {}
  };
  const checkRef = useRef();
  //checkbox 핸들러
  const checkBoxHandler = () => {
    const isCheckd = checkRef.current.checked;
    if (checkRef.current.checked === isCheckd) {
      setIsCheck(isCheckd);
    } else {
      setIsCheck(!isCheckd);
    }
  };
  //select bar 핸들러

  const TextHandler = (e) => {
    const { value } = e.target;
    setText(value);
  };
  const selectItemHandler = (e) => {
    const { value } = e.target;
    setReason(value);
  };
  const passwordHandler = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  //회원탈퇴 핸들러
  const withDrawHandler = async () => {
    try {
      const id = localStorage.getItem('userId');

      // reason이 기타이면 text로 보내고 아니면 reason 으로 보내기!
      if (reason === '기타') {
        const { data } = await trainApi.withdraw(id, text, password);
        if (data.result) {
          setIsSuccess(true);
          setTimeout(() => navigate('/'), 3000);
        }
      } else {
        const { data } = await trainApi.withdraw(id, reason, password);
        if (data.result) {
          setIsSuccess(true);
          setTimeout(() => navigate('/'), 3000);
        }
      }
      return setIsEtc(!isEtc);
    } catch (err) {}
  };
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Wrap>
      {isSuccess && <SmallToast>탈퇴 되었습니다.</SmallToast>}
      <div>
        <Span className="main">회원탈퇴</Span>
        <Span>를 원하시나요?</Span>
      </div>
      <Span className="sub">환승시민 탈퇴 전, 확인하세요.</Span>
      <WarnBox>
        <div>
          <span>·매칭이력,닉네임,프로필 정보 등 모든 정보가 삭제 됩니다. </span>
          <span>·보유하신 혜택(포인트,쿠폰 등) 을 사용할 수 없습니다.</span>
        </div>
      </WarnBox>

      {isLocal && (
        <>
          <TexBox>
            <Text>비밀번호 입력</Text>
            <Text type="password" className="essential">
              (필수)
            </Text>
          </TexBox>
          <Input
            className={password.password === '' ? 'error' : ''}
            name="password"
            value={password.password}
            onChange={passwordHandler}
            type="password"
            placeholder="현재 비밀번호를 입력해주세요"
          />
        </>
      )}

      <TexBox>
        <Text>무엇이 불편하셨나요?</Text>
        <Text className="essential">(필수)</Text>
      </TexBox>
      <SelectBox>
        <Select onChange={selectItemHandler}>
          <option value="" disabled selected>
            선택해주세요
          </option>
          <option value="사용을 잘 안하게 돼요">사용을 잘 안하게 돼요</option>
          <option value="회원 혜택(이벤트,쿠폰)이 부족해요">
            회원 혜택(이벤트,쿠폰)이 부족해요
          </option>
          <option value="매칭이 잘 잡히지 않아요">
            매칭이 잘 잡히지 않아요
          </option>
          <option value="어플이 사용하기 어려워요">
            어플이 사용하기 어려워요
          </option>
          <option value="기타">기타</option>
        </Select>
      </SelectBox>
      {reason === '기타' ? (
        <TextArea
          name="reason"
          value={text}
          onChange={TextHandler}
          className={text === '' ? 'error' : 'etc'}
          placeholder="계정을 삭제하려는 이유를 알려주세요."
        />
      ) : (
        ''
      )}
      <CheckBox>
        {' '}
        <input
          onChange={checkBoxHandler}
          ref={checkRef}
          id="check"
          type="checkbox"
        />{' '}
        <label for="check">
          유의사항을 모두 확인 하였으며, 회원 탈퇴합니다.
        </label>
      </CheckBox>
      <Button
        className={reason && isCheck ? 'active' : ''}
        disabled={reason && isCheck ? false : true}
        onClick={withDrawHandler}
      >
        환승시민 탈퇴
      </Button>
    </Wrap>
  );
};

export default Logout;
const Wrap = styled.div`
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;
const Span = styled.span`
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 500;
  color: #2c2c2c;
  &.main {
    color: #fa3a45;
  }
  &.sub {
    margin-top: 10px;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 400;
    color: #717171;
  }
`;
const WarnBox = styled.div`
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  display: flex;
  border-radius: 4px;
  flex-direction: column;

  width: 343px;
  height: 80px;
  background-color: #f8f8f8;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 500;
  div {
    gap: 10px;
    display: flex;
    flex-direction: column;
  }
`;
const Text = styled.span`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  color: #2c2c2c;
  &.essential {
    color: #fa3a45;
  }
`;
const Input = styled.input`
  margin-top: 20px;
  height: 43px;
  width: 343px;
  border-radius: 4px;
  padding: 13px 10px 13px 10px;
  border: 1px solid rgba(120, 120, 120, 0.470588);
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  &.etc {
    margin-top: 10px;
    height: 71px;
    width: 343px;
    border: 1px solid rgba(120, 120, 120, 0.470588);
    border-radius: 4px;
  }
  &.error {
    border: 1px solid #fa3a45;
  }
`;
const TexBox = styled.div`
  margin-top: 41px;
`;
const SelectBox = styled.div`
  display: flex;

  img {
    margin-top: 2px;
    margin-left: -30px;
    align-self: center;
    width: 24px;
    height: 24px;
  }
`;
export const Select = styled.select`
  margin-top: 20px;
  height: 50px;
  width: 343px;
  border-radius: 4px;
  padding: 13px 10px 13px 10px;
  border: 1px solid rgba(120, 120, 120, 0.470588);
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: ${(props) =>
    `url(${props.background}) no-repeat right 24px center`};
`;
const CheckBox = styled.div`
  gap: 7px;
  margin-top: 142px;
  display: flex;
  input {
    width: 24px;
    height: 24px;
    appearance: none;
    border: 1px solid #2d2d2d;
    border-radius: 4px;
    &:checked {
      width: 24px;
      height: 24px;
      border: 1px solid #2d2d2d;
      border-radius: 4px;

      background-image: url("data:image/svg+xml,%3Csvg width='13' height='12' viewBox='0 0 13 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 5.5L5.14286 11L12 1' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");

      background-position: 50%;
      background-repeat: no-repeat;
    }
  }
`;
const Button = styled.button`
  margin-top: 30px;
  width: 343px;
  height: 50px;
  background: rgba(250, 58, 69, 0.3);
  border-radius: 4px;
  font-family: Pretendard;
  font-size: 17px;
  font-weight: 500;
  color: #ffffff;
  &.active {
    background-color: #fa3a45;
  }
`;
const TextArea = styled.textarea`
  outline: none;
  resize: none;
  &.etc {
    margin-top: 10px;
    height: 71px;
    width: 343px;
    border: 1px solid rgba(120, 120, 120, 0.470588);
    border-radius: 4px;
    padding: 13px 10px;
  }
  &.error {
    margin-top: 10px;
    height: 71px;
    width: 343px;
    border: 1px solid #fa3a45;
    border-radius: 4px;
    padding: 13px 10px;
  }
`;
