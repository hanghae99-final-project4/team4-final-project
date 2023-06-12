import { useCallback, useEffect, useState } from 'react';
import {
  Avatar,
  ErrorMessageBox,
  Nickname,
  Upload,
} from '../Signup/ProfileSet';
import { trainApi } from '../../apis/Instance';
import upload from '../../Assets/SetProfile/profile.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { usePatchState } from '../../Recoil/userList';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Errormessage } from '../Login/EmailLogin';
import { ToastMessage } from '../Signup/Signup';

const NameChange = () => {
  const [profile, setProfile] = useState([]);
  const [nickname, setNickname] = useState([]);
  const [patch, setPatch] = useRecoilState(usePatchState);
  // 듀플 성공하면 Toast 진행
  const [duplicSuccess, setDuplicSuccess] = useState(false);
  const [toast, setToast] = useState(false);
  // 중복 검사 실패
  const [duplicFail, setDuplicFail] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const { data } = await trainApi.getConvers(userId);
      setProfile(data.userInfo);
      setPatch(data.userInfo.images);
    } catch (err) {
      return;
    }
  };

  const OnChangeHandler = useCallback(
    (e) => {
      const { name, value } = e.target;

      setNickname((nickname) => ({ ...nickname, [name]: value }));
    },
    [nickname.nickname]
  );

  const patchnameHandler = async () => {
    const Id = localStorage.getItem('userId');
    try {
      const { data } = await trainApi.patchnickname(Id, {
        nickname: getFields.nickname,
      });
      if (data) {
        setToast(true);
        setDuplicSuccess(false);
        getProfile();
      }
    } catch (err) {
      return;
    }
  };

  const changeprofileHandler = () => {
    navigate('/changeprofile');
  };
  const schema = yup.object().shape({
    nickname: yup
      .string()
      .required('닉네임을 입력해주세요.')
      .matches(
        /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/,
        '문자+숫자 포함 2글자 이상'
      ),
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
  const getValue = watch();

  const duplicationConfirmHandler = async (data) => {
    const nickname = data.nickname;
    try {
      const response = await trainApi.duplicationNickname({
        nickname: nickname,
      });

      if (response.data) {
        setToast(false);
        setDuplicFail(false);
        setDuplicSuccess(true);
      }
    } catch (err) {
      setDuplicFail(true);
    }
  };

  return (
    <Wrap>
      {/* primary image 가 있으면 ? */}
      {toast && <ToastMessage>닉네임이 변경 되었습니다.</ToastMessage>}
      <GifBox>
        <Avatar
          onClick={changeprofileHandler}
          src={
            profile?.images?.filter((item) => item?.is_primary === true)?.[0]
              ?.image_url
          }
          alt="avatar"
        />
        <Upload onClick={changeprofileHandler} src={upload} alt="upload" />
      </GifBox>
      <NicknameBox onSubmit={handleSubmit(duplicationConfirmHandler)}>
        <Nickname
          {...register('nickname')}
          name="nickname"
          placeholder="사용하실 닉네임"
        />
        <ButtonBox>
          <button
            disabled={
              getFields.nickname !== '' && !errors?.nickname?.message
                ? false
                : true
            }
            className={
              getFields.nickname !== '' && !errors?.nickname?.message
                ? 'active'
                : ''
            }
          >
            중복확인
          </button>
          {duplicSuccess && (
            <button onClick={patchnameHandler} className="change">
              변경
            </button>
          )}
        </ButtonBox>
      </NicknameBox>
      <ErrorMessageBox>
        {duplicFail ? (
          <Errormessage>닉네임이 중복 입니다.</Errormessage>
        ) : errors?.nickname?.message ? (
          <Errormessage>{errors?.nickname?.message}</Errormessage>
        ) : getFields.nickname !== '' && duplicSuccess === true ? (
          <Errormessage className="useable">
            사용가능한 닉네임 입니다.
          </Errormessage>
        ) : (
          ''
        )}
      </ErrorMessageBox>
    </Wrap>
  );
};

export default NameChange;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const NicknameBox = styled.form`
  margin-top: 40px;
  align-items: center;
  justify-content: center;
  display: flex;
  gap: 8px;
  button {
    height: 40px;
    width: 69px;

    border-radius: 4px;
    padding: 10px;

    background: rgba(250, 58, 69, 0.3);
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    color: #ffffff;
    &.active {
      background-color: #fa3a45;
    }
  }
`;
const GifBox = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ButtonBox = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  button {
    &.change {
      position: absolute;
      top: 330px;
      background-color: #fa3a45;
      transition: slider 1s ease-in;
      @keyframes slider {
        0% {
          transform: translateY(100%);
        }
        100% {
          transform: translateY(0);
        }
      }
    }
  }
`;
