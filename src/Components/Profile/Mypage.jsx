import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import useInput from "../../MyTools/Hooks/UseInput";
import { useRef } from "react";
import ProfileModal from "../Modal/ProfileModal";
import { CloseCircleFilled } from "@ant-design/icons";

const MyPage = () => {
  const [isModal, setIsModal] = useState(false);
  const inputRef = useRef();
  const [files, setFiles] = useState([]);
  const [check, setCheck] = useState(false);
  const [url, setUrl] = useState("");
  const [representProfile, setRepresentProfile] = useState([]);
  const [form, OnChangeHandler, reset] = useInput([]);
  // console.log(files[0].file);
  console.log(url);
  console.log(representProfile);

  async function imgSubmitHandler() {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("profileImage", files[i].file);
    }
    formData.append("representProfile", representProfile[0].file);

    formData.append("phoneNumber", form.phoneNumber);
    formData.append("gender", true);
    formData.append("nickname", form.nickname);
    formData.append("statusmessage", form.statusmessage);
    for (var pair of formData.entries()) {
      console.log(pair);
    }
    try {
      const { data } = await axios.post("http://54.180.149.56/user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  //photo 집어넣으면 생성 되게끔 최대 5개 제한
  const formSubmit = (e) => {
    let temp = [];
    const photoList = e.target.files;
    for (let i = 0; i < photoList.length; i++) {
      temp.push({
        id: photoList[i]?.name,
        file: photoList?.[i],
        url: URL?.createObjectURL(photoList[i]),
      });
    }
    //포스팅한 포스트의 개수 제한!
    if (temp.length > 5) {
      temp = temp.slice(0, 5);
    }
    setFiles(temp.concat(files));

    console.log(e.target);
  };
  //preview 이미지 함수
  const thumb = files.map((item, index) => {
    return (
      <div>
        <CloseCircleFilled
          onClick={() => removeProfile(item.url)}
          style={{
            position: "relative",
            top: "20px",
            zIndex: "999",
            right: "-90px",
            cursor: "pointer",
          }}
        />
        <img
          onClick={() =>
            setRepresentProfile([
              {
                file: item.file,
                url: item.url,
              },
            ])
          }
          key={index}
          style={{
            cursor: "pointer",
            transform: "scale(1)",
            width: "200px",
            height: "200px",
          }}
          src={item.url}
        />
      </div>
    );
  });
  /// profile x 누르면 삭제 기능
  const removeProfile = (deleteUrl) => {
    setFiles(files.filter((item) => item.url !== deleteUrl));
  };
  console.log(url);
  console.log(form);

  return (
    <Wrap>
      <MyinfoDiv>
        <div className="logoutbox">
          <span style={{ fontSize: "20" }}>나의 정보</span>
          <LogoutBtn>로그아웃</LogoutBtn>
        </div>
      </MyinfoDiv>

      <AttachPicture>
        <ProfileImgDiv>
          <div className="img-preview">
            <ImgPreview
              style={{ transform: "scale(1)", borderRadius: "10px" }}
              id="img-preview"
              src={representProfile[0]?.url}
            />
          </div>
          <UploadImage
            type="file"
            name="profile"
            ref={inputRef}
            value={form.profile}
            accept="image/*"
            multiple
            onChange={(e) => formSubmit(e)}
          ></UploadImage>
          <RechangeImgBtn onClick={() => setIsModal(!isModal)}>
            프로필 선택
          </RechangeImgBtn>
        </ProfileImgDiv>

        <div className="information">
          <PhoneNumDiv>
            <span style={{ fontSize: "20", fontWeight: "600" }}>
              휴대전화 번호
            </span>
            <input
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={OnChangeHandler}
            />
          </PhoneNumDiv>
          <NicnameDiv>
            <span style={{ fontSize: "20", fontWeight: "600" }}>닉네임</span>
            <input
              onChange={OnChangeHandler}
              name="nickname"
              value={form.nickname}
            />
          </NicnameDiv>
          <GenderDiv>
            성별
            <input
              type="checkbox"
              name="gender"
              checked={check}
              value={form.gender}
              onChange={() => setCheck(true)}
            />
            여자
            <input
              type="checkbox"
              name="gender"
              checked={check}
              value={form.gender}
              onChange={() => setCheck(false)}
            />
            남자
          </GenderDiv>

          <CommentDiv>
            <CommentTextArea
              placeholder="상태 메시지"
              onChange={OnChangeHandler}
              name="statusmessage"
              value={form.statusmessage}
            ></CommentTextArea>
          </CommentDiv>
        </div>
      </AttachPicture>
      <div>
        <SaveBtn onClick={() => imgSubmitHandler()}>저장 버튼</SaveBtn>
      </div>
      <div className="client">
        <button>고객유의사항</button>
        <button>고객이용가이드</button>
      </div>
      {isModal && (
        <ProfileModal
          isModal={isModal}
          setIsModal={setIsModal}
          url={url}
          setUrl={setUrl}
          inputRef={inputRef}
          files={files}
          thumb={thumb}
        />
      )}
    </Wrap>
  );
};
const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  text-align: center;
  .logoutbox {
    border: none;
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
  }
  .client > button {
    margin-top: 100px;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #e6e6e6;
`;

const AttachPicture = styled.div`
  .information {
    width: 400px;
    border: none;
  }
  color: black;
  width: 700px;
  height: 300px;
  padding: 60px;
  border-radius: 10px;
  border: none;
  background-color: #ffffff;
  z-index: 999;
  margin: 40px;
  display: flex;
  flex-direction: row;
`;

const LogoutBtn = styled.button`
  background: #ffcd29;
  border: none;
  border-radius: 10px;
  color: black;
  width: 90px;
  height: 40px;
`;

const ImgPreview = styled.img`
  border-style: solid;
  border: none;
  width: 200px;
  height: 200px;
  margin-right: 50px;
`;

const UploadImage = styled.input`
  height: 30px;
`;

const ViewImage = styled.button`
  height: 30px;
  position: absolute;
  left: 50%;
  right: 35%;
  margin-top: 350px;
`;
const MyinfoDiv = styled.div``;
const PhoneNumDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;
const NicnameDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 72px;
  margin-top: 20px;
`;
const GenderDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 20px;
`;
const CommentDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;
const CommentTextArea = styled.textarea`
  font-size: 20px;
  width: 350px;
  height: 180px;
`;
const SaveBtn = styled.button`
  background-color: #ffcd29;
  border-radius: 10px;
  border: none;
  width: 100px;
  height: 40px;
`;
const ProfileImgDiv = styled.div`
  input {
    display: none;
  }
`;
const RechangeImgBtn = styled.button`
  width: 200px;
  height: 40px;
  margin-top: 20px;
  margin-right: 50px;
  background-color: #757575;
  color: white;
  border: none;
`;

export default MyPage;
