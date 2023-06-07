import { useCallback, useEffect, useState } from 'react';
import { Avatar, Nickname, Upload } from '../Signup/ProfileSet';
import { trainApi } from '../../apis/Instance';
import upload from '../../Assets/SetProfile/profile.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { usePatchState } from '../../Recoil/userList';
const NameChange = () => {
  const [profile, setProfile] = useState([]);
  const [nickname, setNickname] = useState([]);
  const [patch, setPatch] = useRecoilState(usePatchState);
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
      const { data } = trainApi.postStatusmessage(Id, {
        nickname: nickname.nickname,
      });
      alert('닉네임이 변경 되었습니다.');
      getProfile();
    } catch (err) {
      return;
    }
  };

  const changeprofileHandler = () => {
    navigate('/changeprofile');
  };

  return (
    <Wrap>
      {/* primary image 가 있으면 ? */}
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
      <NicknameBox>
        <Nickname
          onChange={OnChangeHandler}
          value={nickname.nickname}
          name="nickname"
          placeholder="사용하실 닉네임"
        />
        <button onClick={patchnameHandler}>중복확인</button>
      </NicknameBox>
    </Wrap>
  );
};

export default NameChange;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const NicknameBox = styled.div`
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

    background-color: #fa3a45;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    color: #ffffff;
  }
`;
const GifBox = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
