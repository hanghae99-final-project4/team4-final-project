import React, { useEffect } from 'react';
import styled from 'styled-components';
import progress from '../../Assets/SetProfile/nextprogress.svg';
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
import camera from '../../Assets/SetProfile/camera.svg';
import imageCompression from 'browser-image-compression';
import deleteimg from '../../Assets/SetProfile/close.svg';
import disableimg from '../../Assets/SetProfile/nextbutton_disable.svg';

const ProfileSet = () => {
  // 프로필 정보 전역상태 // 이미지 담는 배열
  const [image, setImage] = useRecoilState(useInfoState);
  //이미지 컴프레션 상태

  // 메인 프로필 정보 전역상태

  const [isnick, setIsNick] = useState(false);
  // gender와 nickname 에 관한 전역상태
  const [gender, setGender] = useRecoilState(useUserState);
  const [form, setForm, OnChangeHandler] = useInput([]);
  const fileref = useRef();
  const navigate = useNavigate();
  const [toast, setToast] = useState(false);
  const [confirm, setConfirm] = useState(false);
  // pick 상태인지 set상태인지 구분
  const [isPick, setIsPick] = useState(false);

  //profile pic
  //프로필 정보 전역 state
  //이미지 컴프레션 상태
  //메인 프로필 전역 state
  const [profile, setProfile] = useRecoilState(usePrimaryState);
  const [files, setFiles] = useState([]);
  const [filecnt, setFileCnt] = useState(0);
  const cameraref = useRef();
  const profileuploadHandler = () => {
    setIsPick(true);
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
    if (image[0]?.image_url) {
      const formData = new FormData();
      for (let i = 0; i < image.length; i++) {
        if (image[i].file !== undefined)
          formData.append('otherImages', image[i].file);
      }
      if (
        image.filter((i, v) => i.isMainProfile === true)?.[0]?.file !==
        undefined
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
        await nickname();
        navigate('/subwaypage');
      } catch (error) {
        window.alert(
          '사진 파일은 5MB, 사진 확장자는.jpg, .jpeg, .png, .gif, heic, heif만 가능합니다.'
        );
      }
    } else {
      setConfirm(true);
      return setTimeout(() => setConfirm(false), 2000);
    }
  };

  const schema = yup.object().shape({
    nickname: yup
      .string()
      .required('닉네임을 입력해주세요.')
      .matches(
        /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,8}$/,
        '문자 혹은 숫자 포함 2~8글자 이하 입니다.'
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

  const duplicationConfirmHandler = async (data) => {
    try {
      const response = await trainApi.duplicationNickname({
        nickname: data.nickname,
      });
      if (response.data) {
        setIsNick(false);
        setToast(true);
      }
    } catch (err) {
      setIsNick(true);
      setToast(false);
    }
  };
  // profile pic 부분 핸들러
  const uploadHandler = () => {
    cameraref.current.click();
  };

  //사진 업로드 시 파일
  const formSubmit = async (e) => {
    let temp = [...image];

    const photoList = e.target.files;
    // 들어온 파일의 길이만큼 for loop 돌고 돌면서 image resizing 시키기
    for (let i = 0; i < photoList.length; i++) {
      // 이미지 리사이즈 함수 옵션
      const options = {
        maxSizeMB: 0.2, // 이미지 최대 용량
        maxWidthOrHeight: 1920, // 최대 넓이(혹은 높이)
        useWebWorker: true,
      };
      if (!(photoList[i] instanceof File || photoList[i] instanceof Blob)) {
        continue;
      }

      try {
        const compressedFile = await imageCompression(photoList[i], options);
        //Blob 형태의 데이터를 파일로 전환시키기
        const compressedFileAsFile = new File(
          [compressedFile],
          photoList[i].name,
          { type: image.type }
        );

        const imageUrl = URL.createObjectURL(compressedFileAsFile);

        const photo = {
          id: photoList[i]?.name,
          file: compressedFileAsFile,
          image_url: imageUrl,
        };
        temp.push(photo);
      } catch (err) {}
    }

    if (temp.length > 5) {
      temp = temp.slice(0, 5);
    }

    // 첫 번째 사진을 기본 프로필로 설정

    // 첫 번째 사진을 기본 프로필로 설정
    //처음 파일을 올릴때 한번만 배열의 첫번째 프로필 메인 프로필로 설정하고 프로필이 있을땐 동작하지 않게
    //수정
    if (filecnt < 1) {
      if (temp.length > 0) {
        setFileCnt((prev) => prev + 1);
        temp[0].isMainProfile = true;
        setProfile([{ file: temp[0].file, url: temp[0].image_url }]);
      }
    }

    setImage(temp.concat(files));
  };

  //이미지 삭제하는 함수
  const removeProfile = async (deleteUrl) => {
    // 삭제하고자 하는 이미지의 url과 다른 이미지들로 이루어진 새로운 배열을 만듦
    const newArray = await image.filter(
      (image) => image.image_url !== deleteUrl
    );

    setImage(newArray);
  };
  const cancelHandler = () => {
    if (window.confirm('사진 첨부를 취소하시겠어요?') === true) {
      setImage([]);
      setProfile([]);
      setIsPick(!isPick);
    }
  };
  useEffect(() => {
    setToast(false);
  }, [errors.nickname]);

  //사진 업로드

  const handleProfileClick = (item) => {
    const updatedImage = image.map((photo) => ({
      ...photo,
      isMainProfile: photo === item,
    }));
    setImage(updatedImage);
  };

  return (
    <>
      {isPick ? (
        <>
          <ProfileWrap>
            <ProfileSpanBox>
              <Select>사진선택</Select>
              <div>
                <Maximum>최대 5장의 사진을 선택 해주세요.</Maximum>
                <Maximum className="possible">
                  ( 5mb 미만의 이미지 , .jpg, .jpeg, .png 확장자만 가능합니다){' '}
                </Maximum>
              </div>
            </ProfileSpanBox>
            <ImgBox>
              <Camera onClick={uploadHandler} src={camera} alt="camera" />
              {image?.map((item, i) => (
                <CameraBox
                  key={item.id}
                  onClick={() => handleProfileClick(item)}
                  className={item?.isMainProfile ? 'main' : null}
                >
                  <DeleteImg
                    onClick={() => removeProfile(item.image_url)}
                    src={deleteimg}
                    alt="delete"
                  />
                  <ProfilePic
                    onClick={() =>
                      setProfile([{ file: item.file, url: item.image_url }])
                    }
                    src={item.image_url}
                    key={item.id}
                    alt="image"
                  />
                </CameraBox>
              ))}
              <Input
                ref={cameraref}
                type="file"
                name="profile"
                accept="image/*"
                value={form?.profile}
                multiple
                onChange={(e) => formSubmit(e)}
              />
            </ImgBox>
            <ProfileButtonBox>
              <CancelButton onClick={cancelHandler}>취소</CancelButton>
              <ApplyButton
                className={image && 'active'}
                onClick={() => setIsPick(!isPick)}
              >
                적용
              </ApplyButton>
            </ProfileButtonBox>
          </ProfileWrap>
        </>
      ) : (
        <>
          <Wrap>
            {confirm && (
              <ToastMessage>프로필 사진을 등록해 주세요.</ToastMessage>
            )}
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
                      image.filter((i, v) => i.isMainProfile === true)?.[0]
                        ?.image_url
                    }
                    alt="avatar"
                  />
                  <Upload
                    onClick={profileuploadHandler}
                    src={upload}
                    alt="upload"
                  />
                </>
              ) : (
                <>
                  <Avatar
                    onClick={profileuploadHandler}
                    src={avatar}
                    alt="avatar"
                  />
                  <Upload
                    onClick={profileuploadHandler}
                    src={upload}
                    alt="upload"
                  />
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
              ) : !errors?.nickname?.message && isnick ? (
                <Errormessage className="confirm">
                  {'중복된 닉네임 입니다.'}
                </Errormessage>
              ) : toast ? (
                <Errormessage className="useable">
                  {'사용 가능한 닉네임 입니다.'}
                </Errormessage>
              ) : (
                ''
              )}
            </ErrorMessageBox>

            {!errors.nickname?.message && image[0]?.image_url && toast ? (
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
                  <div onClick={uploadFile} className="disable">
                    <img src={disableimg} alt="next" />
                    <span>시작</span>
                  </div>
                </ButtonBox>
              </>
            )}
          </Wrap>
        </>
      )}
    </>
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
    &.disable {
      color: rgba(45, 45, 45, 0.4);
    }
    img {
      cursor: pointer;
    }
  }
`;
export const ErrorMessageBox = styled.div`
  width: 350px;
`;
// 프로필 pic 부분
const ProfileWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const Select = styled.span`
  width: 70px;
  height: 24px;
  font-weight: 600;
  font-size: 20px;
  color: #2d2d2d;
`;
const Maximum = styled.span`
  font-family: Roboto;

  font-weight: 400;
  font-size: 14px;
  color: #535353;
  &.possible {
    font-family: Roboto;
    font-size: 12px;
    font-weight: 400;
    color: #79797979;
  }
`;
const ProfileSpanBox = styled.div`
  height: 67px;
  margin-left: 16px;
  margin-top: 30px;
  gap: 10px;

  display: flex;
  flex-direction: column;
  div {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
`;
const Camera = styled.img`
  width: 114px;
  height: 120px;
  cursor: pointer;
  position: relative;
  object-fit: cover;
`;
const ProfilePic = styled.img`
  width: 110px;
  height: 110px;
  cursor: pointer;
  position: relative;
  object-fit: cover;
`;
const Input = styled.input`
  display: none;
`;
const ImgBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 342px;
  height: 240px;
  margin-top: 20px;
`;
const ThumbImg = styled.img`
  width: 110px;
  height: 110px;
`;
const DeleteImg = styled.img`
  position: absolute;
  margin-left: 96px;
  margin-top: -4px;
  width: 18px;
  height: 18px;

  z-index: 999;
  cursor: pointer;
`;
const CameraBox = styled.div`
  position: relative;
  width: 110px;
  height: 110px;
  border: none;
  margin: 0 auto;

  &.main {
    border-radius: 4px;
    border: 2px solid #fa3a45;
    margin: 0 auto;
    width: 110px;
    height: 114px;
    position: relative;
  }
  &.main::before {
    content: '';
    position: absolute;
    width: 37px;
    height: 20px;
    z-index: 999;
    background-image: url("data:image/svg+xml,%3Csvg width='37' height='20' viewBox='0 0 37 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H37V18C37 19.1046 36.1046 20 35 20H0V0Z' fill='%23FA3A45'/%3E%3Cpath d='M11.091 11.484H8.64702V5.998H11.091V11.484ZM13.808 8.195H12.079V5.153H7.64602V12.329H12.079V9.079H13.808V14.877H14.822V4.061H13.808V8.195ZM16.122 3.801V15.449H17.136V3.801H16.122ZM28.757 3.814H27.691V12.329H28.757V3.814ZM20.502 7.48C20.502 6.349 21.36 5.543 22.491 5.543C23.648 5.543 24.506 6.349 24.506 7.48C24.506 8.637 23.648 9.443 22.491 9.443C21.36 9.443 20.502 8.637 20.502 7.48ZM25.546 7.48C25.546 5.803 24.233 4.62 22.491 4.62C20.762 4.62 19.462 5.803 19.462 7.48C19.462 9.17 20.762 10.366 22.491 10.366C24.233 10.366 25.546 9.17 25.546 7.48ZM22.322 14.331V11.458H21.256V15.202H29.108V14.331H22.322Z' fill='white'/%3E%3C/svg%3E%0A");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
  }
`;

const ProfileButtonBox = styled.div`
  display: flex;
  gap: 22px;
  margin-top: 180px;
  width: 342px;
  height: 50px;
  align-items: center;
  justify-content: center;
`;
const CancelButton = styled.button`
  width: 160px;
  height: 50px;
  border: 1px solid #bfbfbf;
  color: #bfbfbf;
  border-radius: 4px;
`;
const ApplyButton = styled.button`
  width: 160px;
  height: 50px;
  border-radius: 4px;
  background-color: rgba(250, 58, 69, 0.3);
  color: #ffffff;
  &.active {
    background-color: #fa3a45;
  }
`;
