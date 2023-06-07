import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useInput from '../../MyTools/Hooks/UseInput';
import { useRef } from 'react';
import { CloseCircleFilled } from '@ant-design/icons';
import { Cookies } from 'react-cookie';
import { trainApi, trainApi2 } from '../../apis/Instance';
import { useNavigate } from 'react-router-dom';
import HomeMenu from '../HomeMenu/HomeMenu';
import MypageHeader from './MypageHeader';
import { useRecoilState } from 'recoil';
import { useInfoState } from '../../Recoil/userList';
import { ApplySet, Img, Nickname, NicknameBox, Profile } from '../Main/Subway';
import write from '../../Assets/Main/write.svg';
import arrowimg from '../../Assets/Mypage/arrow.svg';

const MyPage = () => {
  const [bottomSheet, setBottomSheet] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const inputRef = useRef();
  const [files, setFiles] = useState([]);
  const [primaryImage, setPrimaryImage] = useState([]);
  const [preview, setPreview] = useState();
  const [form, setForm, OnChangeHandler] = useInput([]);
  const cookies = new Cookies();

  const navigate = useNavigate();
  const [changeprofile, setChangeprofile] = useState([]);
  const [originprofile, setOriginprofile] = useState([]);
  const thURL = process.env.REACT_APP_TH_S_HOST;
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useRecoilState(useInfoState);
  const local = form?.result?.account_type;
  useEffect(() => {
    getProfile();
  }, []);
  //프로필 조회 함수
  async function getProfile() {
    const userId = localStorage.getItem('userId');
    const { data } = await trainApi.getConvers(userId);
    setImage(data.userInfo.images);
    setForm(data.userInfo);

    setChangeprofile(data.userInfo.images);
  }

  const profile = form?.images?.filter((item) => item?.is_primary === true)?.[0]
    ?.image_url;

  // 프로필 정보들 저장 핸들러
  async function imgSubmitHandler() {
    try {
      const Id = localStorage.getItem('userId');
      const { data } = await trainApi2.editProfile(
        Id,
        form.nickname,
        form.statusmessage
      );
      setIsEdit(!isEdit);
      getProfile();
    } catch (error) {
      return;
    }
  }
  //사진 업로드

  const uploadFile = async () => {
    const formData = new FormData();
    for (let i = 0; i < image.length; i++) {
      if (image[i].file !== undefined)
        formData.append('otherImages', image[i].file);
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
      setIsModal(!isModal);
      getProfile();
    } catch (error) {
      return;
    }
  };
  //대표 프로필 수정
  const patchProfile = async () => {
    //기존 대표 이미지
    const originProfile = changeprofile?.filter(
      (item) => item?.is_primary === true
    );

    //프로필 사진들
    const newProfile = [...changeprofile];
    //새로운 대표 이미지
    const changenewProfile = changeprofile?.filter(
      (item) => item.image_url === primaryImage[0].url
    );
    setChangeprofile(...changeprofile, changenewProfile);

    //기존의 있던 대표 이미지
    const changeProfile = changeprofile.filter(
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
      setIsModal(!isModal);
      getProfile();
    } catch (error) {
      return;
    }
  };

  //사진 업로드 시 파일 만들기
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

  //preview 이미지 함수
  const thumb = image.map((item, index) => {
    return (
      <div>
        <CloseCircleFilled
          onClick={() => removeProfile(item.image_url)}
          style={{
            position: 'relative',
            top: '18px',
            zIndex: '999',
            right: '0px',
            cursor: 'pointer',
          }}
        />
        <ThumbImg
          onClick={() =>
            setPrimaryImage([
              {
                file: item.file,
                url: item.image_url,
              },
            ])
          }
          key={index}
          src={item.image_url}
          alt="image"
        />
      </div>
    );
  });
  //이미지 삭제하는 함수
  const removeProfile = async (deleteUrl) => {
    const Id = localStorage.getItem('userId');
    try {
      const { data } = await trainApi2.deleteProfile(Id, deleteUrl);
      setImage(image.filter((item) => item.image_url !== deleteUrl));
    } catch (error) {
      return;
    }
  };

  const fileImagePreview = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);

    return new Promise((resolve) => {
      reader.onload = () => {
        setPreview(reader.result);
        resolve();
      };
    });
  };

  const PictureUpload = () => {
    inputRef.current.click();
  };

  //컴포넌트로 할거면 다 컴포넌트로 할것.
  return (
    <Wrap>
      <TextBox margin="0px">프로필수정</TextBox>
      <ProfileBox>
        <Profile>
          <Img>
            <img
              src={
                form?.images?.filter((item) => item?.is_primary === true)?.[0]
                  ?.image_url
              }
              alt="profile"
            />
          </Img>
          <NicknameBox>
            <Nickname>{form?.result?.nickname}</Nickname>
            <ApplySet>
              <img
                onClick={() => setBottomSheet(!bottomSheet)}
                src={write}
                alt="write"
              />

              <span>반갑습니다.프로필을 설정 해 주세요</span>
            </ApplySet>
          </NicknameBox>
        </Profile>
      </ProfileBox>
      <TextBox margin="30px">마이페이지</TextBox>
      <TextBox className="item">
        닉네임변경
        <img onClick={() => navigate('/changename')} src={arrowimg} />
      </TextBox>
      {local === 'local' && (
        <TextBox onClick={() => navigate('/changepw')} className="item">
          비밀번호 변경
          <img src={arrowimg} />
        </TextBox>
      )}
      <TextBox margin="20px">고객센터</TextBox>
      <TextBox margin="20px">
        공지사항
        <img src={arrowimg} />
      </TextBox>
      <TextBox margin="20px">
        자주 묻는 질문
        <img src={arrowimg} />
      </TextBox>
      <TextBox margin="20px">
        신고하기
        <img src={arrowimg} />
      </TextBox>

      {/* 수정 모드 / 저장 모드 바꾸기 */}

      {isModal ? (
        //

        <>
          <ImgWrap>
            {primaryImage?.length > 0 ? (
              <ImgBox
                style={{ transform: 'scale(1)', borderRadius: '10px' }}
                id="img-preview"
                src={primaryImage[0].url}
              />
            ) : (
              <ImgBox
                style={{ transform: 'scale(1)', borderRadius: '10px' }}
                id="img-preview"
                src={
                  form?.images?.filter((item) => item?.is_primary === true)?.[0]
                    ?.image_url
                }
              />
            )}

            <UploadImage
              maxSize={314572800}
              type="file"
              name="profile"
              ref={inputRef}
              value={form?.profile}
              accept="image/*"
              multiple
              onChange={(e) => formSubmit(e)}
            />
            <ImgButton onClick={() => setIsModal(!isModal)}>
              사진 업로드
            </ImgButton>
          </ImgWrap>
          //
          <ModalCtn>
            <ModalWrap>
              <ModalProfileDiv>{thumb}</ModalProfileDiv>
              <ProfileSetBtn onClick={() => PictureUpload()}>
                사진 업로드
              </ProfileSetBtn>
              <button onClick={() => uploadFile()}>저장</button>
              <button onClick={() => patchProfile()}>대표프로필 수정</button>
              <ProfileCloseBtn
                onClick={() => {
                  if (primaryImage[0]?.file === undefined) {
                    setIsModal(!isModal);
                  } else {
                    fileImagePreview(primaryImage[0]?.file);
                    setIsModal(!isModal);
                  }
                }}
              >
                나가기
              </ProfileCloseBtn>
            </ModalWrap>
          </ModalCtn>
        </>
      ) : null}
    </Wrap>
  );
};
export default MyPage;

const Wrap = styled.div`
  margin-left: 16px;
  max-width: 412px;
  min-width: 375px;
  width: 100%;
  height: 100%;
`;
const ProfileBox = styled.div`
  display: flex;
  justify-items: center;
  margin-top: 32px;

  width: 343px;
  height: 81px;
  align-items: center;
  background-color: #fefefe;
  border: 1px solid #f5f3f3;
  border-radius: 4px;
  stroke: solid #f5f3f3;
  box-shadow: 0px 1px 4px 1px #dcdcdc40;
`;
const Header = styled.div`
  height: 44px;
  background-color: #c3f4ff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 0 10px;
`;

const TitleBox = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  div {
    width: 114px;
    height: 44px;
    border: 2px solid #71c9dd;
    border-radius: 30px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ImgWrap = styled.div`
  display: flex;
  width: 60%;
  height: 140px;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const ImgBox = styled.img`
  border-radius: 20px;
  width: 100px;
  height: 100px;
`;

const ImgButton = styled.button`
  width: 100px;
  height: 20px;
  background-color: FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`;

const InfoWrap = styled.div`
  width: 100%;
  li {
    display: flex;
    align-items: center;
    margin-bottom: 6%;
    span {
      width: 50px;
      margin-right: 5%;
      font-size: 16px;
    }
  }
`;

const InputInfo = styled.input`
  width: 70%;
  height: 30px;
  box-shadow: 4px 4px 4px hsla(0, 0%, 0%, 0.25);
  border-radius: 10px;
`;

const CheckGender = styled.input`
  font-size: 12px;
  margin-right: 5px;
`;

const AreaTitle = styled.div`
  width: 100%;
  font-size: 14px;
`;

const BottomStyle = styled.button`
  width: 100%;
  height: 48px;
  box-shadow: 4px 4px 4px hsla(0, 0%, 0%, 0.25);
  background: ${(props) => (props.type === 'save' ? '#C3F4FF' : '#fff')};
  border-radius: 10px;
  margin-bottom: 16px;
`;

const ModalCtn = styled.div`
  position: absolute;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  border: none;
  overflow: hidden;
  box-sizing: border-box;
  display: ${(isModal) => (isModal ? 'block' : 'none')};
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;
const ModalWrap = styled.div`
  position: relative;
  border-radius: 5px;
  left: 30%;
  top: 20%;
  width: 800px;
  height: 500px;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 350px) and (max-width: 600px) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    display: flex;
    position: relative;
    width: 85%;
    height: 40%;
    left: 5%;
    top: 20%;
  }
`;

// 이미지 5장 움직 일 수 있는 곳입니다.
const ModalProfileDiv = styled.div`
  margin: 0 auto;
  width: 800px;
  height: 300px;
  display: flex;
  gap: 20px;
  flex-direction: row;
  align-items: center;
  position: relative;
  right: -80px;
  @media screen and (min-width: 320px) and (max-width: 650px) {
    margin: 0 auto;
    flex-direction: row;
    align-items: center;
    position: relative;
    right: -10%;
    gap: 20px;
  }
`;
//각각의 이미지
const ThumbImg = styled.img`
  cursor: pointer;
  transform: scale(1);
  width: 200px;
  height: 200px;
  @media screen and (min-width: 320px) and (max-width: 365px) {
    width: 30%;

    transform: scale(1);
  }
`;

// 저장 하기 버튼입니다.
const ProfileCloseBtn = styled.button`
  position: relative;
  bottom: -150px;
  width: 150px;
  height: 50px;
  border: 2px solid #71c9dd;
  border-radius: 30px;
  right: 500px;
  font-size: 14px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  @media screen and (min-width: 330px) and (max-width: 650px) {
    right: 20%;
    top: 40%;
    flex-direction: row;
    align-items: center;
    position: relative;
    width: 100%;
  }
`;
const ProfileSetBtn = styled.button`
  width: 150px;
  height: 50px;
  position: relative;
  bottom: -150px;
  left: -100px;
  border: 2px solid #71c9dd;
  border-radius: 30px;
  font-size: 14px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  @media screen and (min-width: 350px) and (max-width: 650px) {
    right: 20%;
    top: 40%;
    width: 100%;
  }
`;

const UploadImage = styled.input`
  display: none;
  height: 30px;
`;

const Customer = styled.div`
  @media only screen and (min-width: 375px) and (max-width: 650px) {
    margin-left: 2%;
    width: 350px;
    height: 30px;
  }
  justify-content: space-between;
  margin-top: 30px;
  width: 100%;
  display: flex;

  .button-notice {
    @media only screen and (max-width: 375px) {
      width: 110px;
      height: 30px;
    }
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    width: 110px;
    height: 30px;

    border: 2px solid #71c9dd;
    border-radius: 20px;

    font-size: 14px;
    line-height: 17px;
  }
  .button-guide {
    @media only screen and (max-width: 375px) {
      width: 110px;
      height: 30px;
    }
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    width: 110px;
    height: 30px;
    border: 2px solid #71c9dd;
    border-radius: 20px;
    font-size: 14px;
    line-height: 17px;
  }
`;
const TextBox = styled.div`
  margin-top: ${(props) => props.margin};
  height: 50px;
  width: 343px;
  left: 16px;
  top: 84px;
  border-radius: 0px;
  padding: 10px 0px 10px 0px;
  border: 1px solid #fcfcfc;

  font-size: 13px;
  font-weight: 400;
  color: #979797;
  &.item {
    font-size: 14px;
    font-weight: 400;

    text-align: left;
    color: #333333;
  }
  display: flex;
  justify-content: space-between;
  img {
    cursor: pointer;
  }
`;
