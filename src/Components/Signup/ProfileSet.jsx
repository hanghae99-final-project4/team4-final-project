import React, { useEffect } from 'react';
import styled from 'styled-components';
import progress from '../../Assets/SetProfile/nextprogress.svg';
import pendingbutton from '../../Assets/SetProfile/pendingbutton.svg';
import startbutton from '../../Assets/SetProfile/startbutton.svg';
import { useNavigate } from 'react-router-dom';
import avatar from '../../Assets/SetProfile/avatar.svg';
import upload from '../../Assets/SetProfile/profile.svg';
import { useRef } from 'react';
import { useRecoilState } from 'recoil';
import {
  useInfoState,
  usePrimaryState,
  useUserState,
} from '../../Recoil/userList';
import useInput from '../../MyTools/Hooks/UseInput';
import { trainApi, trainApi2 } from '../../apis/Instance';
import beforebutton from '../../Assets/SetProfile/beforebutton.svg';
import nextbutton from '../../Assets/SetProfile/nextbutton.svg';
import { useState } from 'react';
import { NicknameBox } from '../Profile/NameChange';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Errormessage } from '../Login/EmailLogin';
import { ToastMessage } from './Signup';
const ProfileSet = () => {
  // 프로필 정보 전역상태 // 이미지 담는 배열
  const [image, setImage] = useRecoilState(useInfoState);
  //이미지 컴프레션 상태

  // 메인 프로필 정보 전역상태

  const [primaryImage, setPrimaryImage] = useRecoilState(usePrimaryState);
  // gender와 nickname 에 관한 전역상태
  const [gender, setGender] = useRecoilState(useUserState);
  const [form, setForm, OnChangeHandler] = useInput([]);
  const fileref = useRef();
  const navigate = useNavigate();
  const [toast, setToast] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const profileuploadHandler = () => {
    navigate('/pickprofile');
  };
  async function nickname() {
    try {
      const userId = localStorage.getItem('userId');
      const { data } = await trainApi.postProfile(userId, {
        gender: gender.gender,
        age_group: gender.age,
        nickname: getFields.nickname,
      });
    } catch (err) {
      return;
    }
  }

  const beforeHandler = () => {
    navigate(-1);
  };
  // 프로필 업로더 핸들러
  const uploadFile = async () => {
    const formData = new FormData();
    for (let i = 0; i < image.length; i++) {
      if (image[i].file !== undefined)
        formData.append('otherImages', image[i].file);
    }
    if (
      image.filter((i, v) => i.isMainProfile === true)?.[0]?.file !== undefined
    )
      formData.append(
        'primaryImage',
        image.filter((i, v) => i.isMainProfile === true)?.[0]?.file
      );

    const form = formData.getAll('otherImages');
    formData.delete('otherImages');

    form
      .filter(
        (item) =>
          item.name !==
          image.filter((i, v) => i.isMainProfile === true)?.[0]?.file?.name
      )
      .forEach((item) => formData.append('otherImages', item));

    try {
      const Id = localStorage.getItem('userId');
      const { data } = await trainApi2.postProfile(Id, formData);
      nickname();
      navigate('/subwaypage');
    } catch (error) {
      window.alert(
        '사진 파일은 5MB, 사진 확장자는.jpg, .jpeg, .png, .gif, heic, heif만 가능합니다.'
      );
    }
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
  useEffect(() => {
    setTimeout(() => setConfirm(false), 3000);
  }, [confirm]);
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

  const duplicationConfirmHandler = async (data) => {
    setToast(false);
    setConfirm(false);
    try {
      const response = await trainApi.duplicationNickname({
        nickname: data.nickname,
      });
      if (response.data) {
        setToast(true);
        setConfirm(false);
      }
    } catch (err) {
      setConfirm(true);
    }
  };

  return (
    <Wrap>
      {toast && <ToastMessage>사용 가능한 닉네임 입니다.</ToastMessage>}
      <GifBox>
        <ProgressImg src={progress} alt="progress" />
        <SpanBox>
          <Profile>
            <Transfercitizen>환승시민</Transfercitizen>에서 사용하실
            <br />
            프로필을 설정해주세요.
          </Profile>
        </SpanBox>
        {/* primary image 가 있으면 ? */}
        {image[0]?.image_url && true ? (
          <>
            <Avatar
              onClick={profileuploadHandler}
              src={
                image.filter((i, v) => i.isMainProfile === true)?.[0]?.image_url
              }
              alt="avatar"
            />
            <Upload onClick={profileuploadHandler} src={upload} alt="upload" />
          </>
        ) : (
          <>
            <Avatar onClick={profileuploadHandler} src={avatar} alt="avatar" />
            <Upload onClick={profileuploadHandler} src={upload} alt="upload" />
          </>
        )}
      </GifBox>
      <NicknameBox onSubmit={handleSubmit(duplicationConfirmHandler)}>
        <Nickname
          name="nickname"
          placeholder="사용하실 닉네임"
          {...register('nickname')}
        />
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
      </NicknameBox>
      <ErrorMessageBox>
        {errors?.nickname?.message ? (
          <Errormessage>{errors?.nickname?.message}</Errormessage>
        ) : !errors?.nickname?.message && confirm ? (
          <Errormessage className="confirm">
            {'중복된 닉네임 입니다.'}
          </Errormessage>
        ) : (
          ''
        )}
      </ErrorMessageBox>

      {image[0]?.image_url && toast ? (
        <>
          <ButtonBox>
            <div onClick={beforeHandler}>
              <img src={beforebutton} alt="before" />
              <span>이전</span>
            </div>
            <div onClick={uploadFile}>
              <img src={nextbutton} alt="next" />
              <span>시작</span>
            </div>
          </ButtonBox>
        </>
      ) : (
        <>
          <ButtonBox>
            <div onClick={beforeHandler}>
              <img src={beforebutton} alt="before" />
              <span>이전</span>
            </div>
          </ButtonBox>
        </>
      )}
    </Wrap>
  );
};

export default ProfileSet;

const Wrap = styled.div`
  margin-top: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const GifBox = styled.div`
  margin-top: 92px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 147px;
`;
const ProgressImg = styled.img`
  width: 44px;
  height: 8px;
  margin-top: 10px;
`;
const SpanBox = styled.div`
  margin-top: 45px;
  width: 134px;
  height: 82px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Avatar = styled.img`
  border-radius: 100%;
  cursor: pointer;
  margin-top: 29px;
  width: 100px;
  height: 100px;
  object-fit: cover;
  transform: scale(1);
`;
export const Nickname = styled.input`
  border-radius: 4px;
  padding: 12px;
  margin-top: ${(props) => props.margin};
  width: 281px;
  height: 40px;
  border: 1px solid #bcbcbc;
  &::placeholder {
    color: #747474;
    opacity: 1;
  }
`;
const Profile = styled.span`
  width: 147px;
  height: 53px;
  font-size: 15px;
  font-weight: 400;

  text-align: center;
`;
const Transfercitizen = styled.span`
  font-weight: 500;
  font-size: 17px;
`;

const StartButton = styled.img`
  margin-top: 227px;
`;
const StartSpan = styled.span`
  margin-top: 10px;
`;
export const Upload = styled.img`
  margin-left: 79px;
  margin-top: -34px;
  z-index: 999;
  cursor: pointer;
`;
const ButtonBox = styled.div`
  margin-top: 203px;
  width: 343px;
  height: 67px;
  display: flex;
  justify-content: space-between;
  div {
    width: 40px;
    height: 67px;
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 10px;
    img {
      cursor: pointer;
    }
  }
`;
export const ErrorMessageBox = styled.div`
  width: 350px;
`;
