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
import {
  ApplySet,
  Exit,
  Img,
  InputDiv,
  Modal,
  Nickname,
  NicknameBox,
  Profile,
  Status,
} from '../Main/Subway';
import write from '../../Assets/Main/write.svg';
import arrowimg from '../../Assets/Mypage/arrow.svg';
import { useCallback } from 'react';
import exit from '../../Assets/Modal/status.svg';

const MyPage = () => {
  const [bottomSheet, setBottomSheet] = useState(false);

  const [form, setForm, OnChangeHandler] = useInput([]);
  const [status, setStatus] = useState('');

  const navigate = useNavigate();
  const [changeprofile, setChangeprofile] = useState([]);

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

  // status Handler
  const statusHandler = useCallback(
    (e) => {
      const { name, value } = e.target;

      setStatus((status) => ({ ...status, [name]: value }));
    },
    [status.status]
  );
  // register Handler
  const registerHandler = async () => {
    try {
      const id = localStorage.getItem('userId');
      const { data } = await trainApi.postStatusmessage(id, {
        introduction: status.status,
      });
      getProfile();
      setBottomSheet(!bottomSheet);
    } catch (err) {
      return;
    }
  };

  return (
    <Wrap>
      {bottomSheet && <ModalCtn></ModalCtn>}
      <Modal className={bottomSheet ? 'open' : ''}>
        <Status>
          <span>상태 메시지 수정</span>
          <Exit onClick={() => setBottomSheet(!bottomSheet)} src={exit} />
        </Status>

        <InputDiv>
          <input
            maxLength={20}
            onChange={statusHandler}
            value={status.status}
            name="status"
            placeholder="안녕하세요 잘 부탁드려요!"
          />
          <span className="sub">
            {status?.status?.length}/{20}
          </span>
        </InputDiv>

        <button onClick={registerHandler}>확인</button>
      </Modal>
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

              <span onClick={() => setBottomSheet(!bottomSheet)}>
                {form?.result?.introduction !== null
                  ? form?.result?.introduction
                  : '반갑습니다. 프로필을 설정 해 주세요'}
              </span>
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
