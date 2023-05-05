import React from 'react';
import styled from 'styled-components';
import camera from '../../Assets/SetProfile/camera.svg';
import { useRef } from 'react';
import { useRecoilState } from 'recoil';
import {
  useAgreeState,
  useInfoState,
  usePrimaryState,
} from '../../Recoil/userList';
import { useState } from 'react';
import { trainApi2 } from '../../apis/Instance';
import { CloseCircleFilled } from '@ant-design/icons';
import deleteimg from '../../Assets/SetProfile/close.svg';
import useInput from '../../MyTools/Hooks/UseInput';
import { useNavigate } from 'react-router-dom';

const PickProfile = () => {
  const navigate = useNavigate();

  const [image, setImage] = useRecoilState(useInfoState);
  const [profile, setProfile] = useRecoilState(usePrimaryState);
  const [files, setFiles] = useState([]);
  const [form, setForm, OnChangeHandler] = useInput([]);
  const [primaryImage, setPrimaryImage] = useState([]);
  const cameraref = useRef();
  const uploadHandler = () => {
    cameraref.current.click();
  };

  console.log(primaryImage[0]?.url);
  console.log(image);
  //사진 업로드 시 파일
  const formSubmit = (e) => {
    let temp = [...image];
    const photoList = e.target.files;
    for (let i = 0; i < photoList.length; i++) {
      temp.push({
        id: photoList[i]?.name,
        file: photoList?.[i],
        image_url: URL?.createObjectURL(photoList[i]),
      });
    }

    if (temp.length > 5) {
      temp = temp.slice(0, 5);
    }
    setImage(temp.concat(files));
  };

  //이미지 삭제하는 함수
  const removeProfile = async (deleteUrl) => {
    const Id = localStorage.getItem('userId');
    console.log(deleteUrl);
    try {
      setImage(image.filter((item) => item.image_url !== deleteUrl));
    } catch (error) {
      console.log(error);
    }
  };
  const cancelHandler = () => {
    if (window.confirm('사진 첨부를 취소하시겠어요?') === true) {
      setImage([]);
      setProfile([]);
      navigate(-1);
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
        {image?.map((item, index) => (
          <CameraBox
            className={item?.image_url === profile[0]?.url ? 'main' : null}
          >
            <DeleteImg
              onClick={() => removeProfile(item.image_url)}
              src={deleteimg}
              alt="delete"
            />
            <Profile
              onClick={() =>
                setProfile([{ file: item.file, url: item.image_url }])
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
        <CancelButton onClick={cancelHandler}>취소</CancelButton>
        <ApplyButton onClick={() => navigate('/setprofile')}>적용</ApplyButton>
      </ButtonBox>
    </Wrap>
  );
};

export default PickProfile;
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
`;
