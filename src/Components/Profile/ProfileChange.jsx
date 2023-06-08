import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import camera from '../../Assets/SetProfile/camera.svg';
import { useRef } from 'react';
import { useRecoilState } from 'recoil';
import { useInfoState, usePrimaryState } from '../../Recoil/userList';
import { useState } from 'react';
import { trainApi, trainApi2 } from '../../apis/Instance';
import { CloseCircleFilled } from '@ant-design/icons';
import deleteimg from '../../Assets/SetProfile/close.svg';
import useInput from '../../MyTools/Hooks/UseInput';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
const ProfileChange = () => {
  const navigate = useNavigate();

  const [image, setImage] = useRecoilState(useInfoState);
  const [primary, setPrimary] = useRecoilState(usePrimaryState);
  const [profile, setProfile] = useState([]);
  const [files, setFiles] = useState([]);
  const [form, setForm, OnChangeHandler] = useInput([]);
  const [primaryImage, setPrimaryImage] = useState([]);
  const [changeprofile, setChangeprofile] = useState([]);
  const [filecnt, setFileCnt] = useState(0);
  const cameraref = useRef();
  const uploadHandler = () => {
    cameraref.current.click();
  };

  useEffect(() => {
    getProfile();
  }, []);

  //사진 업로드 시 파일
  //사진 업로드 시 파일
  const formSubmit = async (e) => {
    let temp = [...profile];

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
    //처음 파일을 올릴때 한번만 배열의 첫번째 프로필 메인 프로필로 설정하고 프로필이 있을땐 동작하지 않게
    //수정
    if (filecnt < 1) {
      if (temp.length > 0) {
        setFileCnt((prev) => prev + 1);
        temp[0].isMainProfile = true;
        setPrimaryImage([{ file: temp[0].file, url: temp[0].image_url }]);
      }
    }

    setProfile(temp.concat(files));
  };

  //이미지 삭제하는 함수
  const removeProfile = async (deleteUrl) => {
    const Id = localStorage.getItem('userId');
    try {
      const { data } = await trainApi2.deleteProfile(Id, deleteUrl);
      setProfile(profile.filter((item) => item.image_url !== deleteUrl));
    } catch (error) {
      // 프로필 등록을 아직 안한 상태일땐 // 즉 프로필이 화면상에서만 보일땐 filter로 삭제해주게끔
      //수정!
      const remove = await profile.filter(
        (item) => item.image_url !== deleteUrl
      );
      setProfile(remove);
    }
  };

  //대표 프로필 수정
  const patchProfile = async () => {
    //기존 대표 이미지
    const originProfile = profile?.filter((item) => item?.is_primary === true);

    //프로필 사진들
    const newProfile = [...profile];
    //새로운 대표 이미지
    const changenewProfile = profile?.filter(
      (item) => item.image_url === primaryImage[0].url
    );
    setProfile(profile, changenewProfile);

    //기존의 있던 대표 이미지
    const changeProfile = profile.filter(
      (item) => item.image_url === originProfile
    );

    // setChangeprofile(
    const newArr = newProfile
      .map((item) =>
        item.image_url === changenewProfile[0].image_url
          ? { ...item, is_primary: true }
          : item
      )
      .filter((item) => item.image_url === changenewProfile[0].image_url);

    const origin = newProfile
      .map((item) =>
        item.image_url === originProfile[0].image_url
          ? { ...item, is_primary: false }
          : item
      )
      .filter((item) => item.image_url === originProfile[0].image_url);

    try {
      const Id = localStorage.getItem('userId');
      const { data } = await trainApi2.patchProfile(Id, newArr[0], origin[0]);
      if (data) {
        window.alert('대표프로필이 수정 되었습니다.');
      }

      getProfile();
    } catch (error) {
      return;
    }
  };

  const getProfile = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const { data } = await trainApi.getConvers(userId);

      setProfile(data.userInfo.images);
    } catch (err) {
      return;
    }
  };
  const cancelHandler = () => {
    setImage([]);
    setProfile([]);
    navigate(-1);
  };
  // 핸들클릭 이벤트
  const handleProfileClick = (item) => {
    const updatedImage = profile.map((photo) => ({
      ...photo,
      isMainProfile: photo === item,
    }));
    setProfile(updatedImage);
  };

  //저장 핸들러
  const uploadFile = async () => {
    const formData = new FormData();
    for (let i = 0; i < profile.length; i++) {
      if (profile[i].file !== undefined)
        formData.append('otherImages', profile[i].file);
    }
    if (primaryImage[0]?.file !== undefined)
      formData.append('primaryImage', primaryImage[0]?.file);

    const form = formData.getAll('otherImages');
    formData.delete('otherImages');

    form
      .filter((item) => item.name !== primaryImage[0]?.file?.name)
      .forEach((item) => formData.append('otherImages', item));

    try {
      const Id = localStorage.getItem('userId');

      const { data } = await trainApi2.postProfile(Id, formData);
      if (data?.msg?.length !== 0) {
        window.alert('프로필이 등록 되었습니다.');
        navigate('/changename');
      }
      // 배열 &&  빈배열일때 빈배열 == 변경 값이 없을땐 patch

      await patchProfile();
      navigate('/changename');
    } catch (error) {
      return;
    }
  };

  return (
    <Wrap>
      <SpanBox>
        <Select>사진선택</Select>
        <Maximum>최대 5장의 사진을 선택 해주세요.</Maximum>
      </SpanBox>
      <ImgBox>
        <Camera onClick={uploadHandler} src={camera} alt="camera" />
        {profile?.map((item, index) => (
          <CameraBox
            onClick={() => handleProfileClick(item)}
            className={item?.isMainProfile ? 'main' : null}
          >
            <DeleteImg
              onClick={() => removeProfile(item.image_url)}
              src={deleteimg}
              alt="delete"
            />
            <Profile
              onClick={() =>
                setPrimaryImage([{ file: item.file, url: item.image_url }])
              }
              src={item.image_url}
              key={index}
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
      <ButtonBox>
        <CancelButton onClick={cancelHandler}>나가기</CancelButton>
        <ApplyButton onClick={() => uploadFile()}>적용</ApplyButton>
      </ButtonBox>
    </Wrap>
  );
};

export default ProfileChange;
const Wrap = styled.div`
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
  margin-left: -1px;
  font-family: Roboto;
  width: 208px;
  height: 16px;
  font-weight: 400;
  font-size: 14px;
  color: #535353;
`;
const SpanBox = styled.div`
  margin-left: 16px;
  margin-top: 30px;
  gap: 10px;
  width: 194px;
  height: 50px;
  display: flex;
  flex-direction: column;
`;
const Camera = styled.img`
  width: 114px;
  height: 120px;
  cursor: pointer;
  position: relative;
  object-fit: cover;
`;
const Profile = styled.img`
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

const ButtonBox = styled.div`
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
  transition: 0.1s background-color;
  &:hover {
    background-color: #fa3a45;
  }
`;
