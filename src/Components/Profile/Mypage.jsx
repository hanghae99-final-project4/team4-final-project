import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useInput from '../../MyTools/Hooks/UseInput';
import { instance, trainApi } from '../../apis/Instance';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useInfoState } from '../../Recoil/userList';
import { Exit, InputDiv, Modal, Status } from '../Main/Subway';
import arrowimg from '../../Assets/Mypage/arrow.svg';
import { useCallback } from 'react';
import exit from '../../Assets/Modal/status.svg';
import ChattingModal, { BtnBox, PriBtn, SubBtn } from '../Modal/ChattingModal';
import exitimg from '../../Assets/ChattingModal/exit.svg';

const MyPage = () => {
  const [bottomSheet, setBottomSheet] = useState(false);

  const [form, setForm, OnChangeHandler] = useInput([]);
  const [status, setStatus] = useState('');
  const [warn, setWarn] = useState(false);
  const navigate = useNavigate();
  const [isOut, setIsOut] = useState(false);
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
  // 준비중 핸들러
  const warnHandler = () => {
    if (!warn) {
      setWarn(true);
    }

    setTimeout(() => setWarn(false), 4000);
  };
  
  // 로그아웃 핸들러
  const logoutHandler = async () => {
    const { data } = await instance.delete('/user/logout', {
      data: {
        account: form?.result?.account,
      },
    });
    if (data.result) {
      navigate('/');
    }
  };
  //탈퇴하기 핸들러
  const withDrawHandler = () => {};

  return (
    <Wrap>
      {warn && <SmallToast>준비중입니다</SmallToast>}
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
      <TextBox height="50px" margin="40px">
        프로필수정
      </TextBox>

      <TextBox height="50px" className="item">
        프로필 관리
        <img onClick={() => navigate('/changename')} src={arrowimg} />
      </TextBox>
      {local === 'local' && (
        <>
          <TextBox height="50px">마이페이지</TextBox>
          <TextBox
            height="50px"
            onClick={() => navigate('/changepw')}
            className="item"
          >
            비밀번호 변경
            <img src={arrowimg} />
          </TextBox>
        </>
      )}
      <TextBox height="60px">고객센터</TextBox>
      <TextBox height="50px" className="item">
        공지사항
        <img onClick={() => warnHandler()} src={arrowimg} />
      </TextBox>
      <TextBox height="50px" className="item">
        자주 묻는 질문
        <img onClick={() => warnHandler()} src={arrowimg} />
      </TextBox>
      <TextBox height="50px" className="item">
        신고하기
        <img onClick={() => warnHandler()} src={arrowimg} />
      </TextBox>
      <TextBox height="60px">기타</TextBox>
      <TextBox height="50px" className="item">
        로그아웃
        <img onClick={() => setIsOut(!isOut)} src={arrowimg} />
      </TextBox>
      <TextBox height="50px" className="item">
        탈퇴하기
        <img onClick={() => navigate('/logoutpage')} src={arrowimg} />
      </TextBox>
      {isOut && (
        <ChattingModal>
          <img src={exitimg} alt="exit" />
          <span margin="10px" className="exit">
            정말로 로그아웃 하시겠습니까? <br />
          </span>
          <BtnBox margin="40px">
            <SubBtn onClick={() => setIsOut(!isOut)}>취소</SubBtn>
            <PriBtn onClick={() => logoutHandler()}>로그아웃</PriBtn>
          </BtnBox>
        </ChattingModal>
      )}
    </Wrap>
  );
};
export default MyPage;

const Wrap = styled.div`
  max-width: 412px;
  min-width: 375px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const TextBox = styled.div`
  margin-top: ${(props) => props.margin};
  height: ${(props) => props.height};
  width: 343px;

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
export const SmallToast = styled.div`
  left: calc(50% - 240px / 2 - 0.5px);
  position: absolute;
  padding: 10px;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 240px;
  height: 37px;

  animation: fadeout 4s ease-in;
  background: rgba(24, 24, 24, 0.6);
  border-radius: 4px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  text-align: left;

  @keyframes fadeout {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;
