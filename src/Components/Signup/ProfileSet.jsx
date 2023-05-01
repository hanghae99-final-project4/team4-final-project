import React from "react";
import styled from "styled-components";
import progress from "../../Assets/SetProfile/nextprogress.svg";
import pendingbutton from "../../Assets/SetProfile/pendingbutton.svg";
import startbutton from "../../Assets/SetProfile/startbutton.svg";
import { useNavigate } from "react-router-dom";
import avatar from "../../Assets/SetProfile/avatar.svg";
import upload from "../../Assets/SetProfile/profile.svg";
import { useRef } from "react";
import { useRecoilState } from "recoil";
import { usePrimaryState } from "../../Recoil/userList";
import useInput from "../../MyTools/Hooks/UseInput";
const ProfileSet = () => {
  const [profile, setProfile] = useRecoilState(usePrimaryState);
  const [form, setForm, OnChangeHandler] = useInput([]);
  const fileref = useRef();
  const navigate = useNavigate();

  const profileuploadHandler = () => {
    navigate("/pickprofile");
  };
  console.log(form);
  return (
    <Wrap>
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
        {profile[0]?.url && true ? (
          <>
            <Avatar
              onClick={profileuploadHandler}
              src={profile[0]?.url}
              alt="avatar"
            />
            <Upload src={upload} alt="upload" />
          </>
        ) : (
          <>
            <Avatar onClick={profileuploadHandler} src={avatar} alt="avatar" />
            <Upload src={upload} alt="upload" />
          </>
        )}
      </GifBox>
      <Nickname
        onChange={OnChangeHandler}
        value={form.nickname}
        name="nickname"
        placeholder="사용하실 닉네임"
      />
      {profile[0]?.url && true && form.nickname && true ? (
        <>
          <StartButton
            style={{ cursor: "pointer" }}
            src={startbutton}
            alt="startimg"
          />
        </>
      ) : (
        <>
          <StartButton src={pendingbutton} alt="startimg" />
        </>
      )}

      <StartSpan>시작</StartSpan>
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
const GifBox = styled.div`
  margin-top: 92px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 147px;
  height: 235px;
`;
const ProgressImg = styled.img`
  width: 26px;
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
const Avatar = styled.img`
  border-radius: 50%;
  cursor: pointer;
  margin-top: 29px;
  width: 100px;
  height: 100px;
`;
const Nickname = styled.input`
  border-radius: 4px;
  padding: 12px;
  margin-top: 40px;
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
const Upload = styled.img`
  margin-left: 79px;
  margin-top: -34px;
`;
