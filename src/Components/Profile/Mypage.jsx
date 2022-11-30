import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import useInput from "../../MyTools/Hooks/UseInput";
import { useRef } from "react";
import ProfileModal from "../Modal/ProfileModal";
import { CloseCircleFilled } from "@ant-design/icons";
import { Cookies, useCookies } from "react-cookie";
import HomeMenu from "../HomeMenu/HomeMenu";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const [isModal, setIsModal] = useState(false);
  const inputRef = useRef();
  const [files, setFiles] = useState([]);
  const [check, setCheck] = useState(false);
  const [url, setUrl] = useState("");
  const [representProfile, setRepresentProfile] = useState([]);
  const [form, setForm, OnChangeHandler, reset] = useInput([]);
  const [, , removeCookie] = useCookies(["token"]);
  // const [, , removeCookie] = useCookies(["kakaoToken"]);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const navigator = useNavigate();

  // console.log(token);

  const thURl = process.env.REACT_APP_TH_S_HOST;

  useEffect(() => {
    async function getProfile() {
      const { data } = await axios.get(`${thURl}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setForm(data.body);
    }
    getProfile();
  }, [form?.representProfile]);

  async function imgSubmitHandler() {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("profileImage", files[i].file);
    }
    formData.append("representProfile", representProfile[0].file);
    formData.append("phoneNumber", form.phoneNumber);
    formData.append("nickname", form.nickname);
    formData.append("statusmessage", form.statusmessage);

    for (var pair of formData.entries()) {
      console.log(pair);
    }
    try {
      const { data } = await axios.post(`${thURl}/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
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
  const removeProfile = (deleteUrl) => {
    setFiles(files.filter((item) => item.url !== deleteUrl));
  };

  return (
    <Wrap>
      <MyinfoDiv>
        <div className="logoutbox">
          <span style={{ fontSize: "20" }}>나의정보</span>
          <LogoutBtn
            onClick={(e) => {
              e.preventDefault();
              removeCookie("token", { path: "/" });
              navigator("/");
              // removeCookie("kakaoToken", { path: "/" });
            }}
          >
            로그아웃
          </LogoutBtn>
        </div>
      </MyinfoDiv>
      <div className="profilebutton">프로필</div>
      <AttachPicture>
        <ProfileImgDiv>
          <div className="img-preview">
            <ImgPreview
              style={{ transform: "scale(1)", borderRadius: "10px" }}
              id="img-preview"
              src={form?.representProfile}
            />
          </div>

          <UploadImage
            maxSize={314572800}
            type="file"
            name="profile"
            ref={inputRef}
            value={form?.profile}
            accept="image/*"
            multiple
            onChange={(e) => formSubmit(e)}
          ></UploadImage>
          <RechangeImgBtn onClick={() => setIsModal(!isModal)}>
            사진 첨부
          </RechangeImgBtn>
        </ProfileImgDiv>

        <div className="information">
          <PhoneNumDiv>
            <span style={{ fontSize: "20", fontWeight: "600" }}>휴대폰</span>
            <input
              name="phoneNumber"
              value={form?.phoneNumber}
              onChange={OnChangeHandler}
            />
          </PhoneNumDiv>
          <NicknameDiv>
            <span style={{ fontSize: "20", fontWeight: "600" }}>닉네임</span>
            <input
              onChange={OnChangeHandler}
              name="nickname"
              value={form?.nickname}
            />
          </NicknameDiv>
          <GenderDiv>
            {form?.gender === true ? (
              //여자면 여자 그림 남자면 남자 그림 svg 코드 가져오기
              <>
                성별
                <input
                  type="checkbox"
                  name="gender"
                  checked={check}
                  value={form.gender}
                />
                여자
                <input
                  type="checkbox"
                  name="gender"
                  checked={check}
                  value={form.gender}
                />
                남자
              </>
            ) : (
              <>
                성별
                <input
                  type="checkbox"
                  name="gender"
                  checked={check}
                  value={form?.gender}
                />
                여자
                <input
                  type="checkbox"
                  name="gender"
                  checked={check}
                  value={form?.gender}
                />
                남자
              </>
            )}
          </GenderDiv>

          <CommentDiv>
            <CommentTextArea
              placeholder="상태메시지"
              onChange={OnChangeHandler}
              name="statusmessage"
              value={form?.statusmessage}
            ></CommentTextArea>
          </CommentDiv>
        </div>
      </AttachPicture>
      <div>
        <SaveBtn onClick={() => imgSubmitHandler()}>저장</SaveBtn>
      </div>

      <Customer>
        <button className="button1">고객유의사항</button>

        <button className="button2">고객이용가이드</button>
      </Customer>
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
      <HomeMenu />
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

  .profilebutton {
    border-radius: 30px;
    border: 2px solid #71c9dd;
    background-color: #e6e6e6;
  }
`;

const AttachPicture = styled.div`
  .information {
    width: 400px;
    border: none;
  }
  color: black;
  width: 700px;
  height: 350px;
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
  background: #71c9dd;
  border: none;
  border-radius: 10px;
  color: black;
  width: 90px;
  height: 40px;
`;

// 사진 첨부 프리뷰입니다.
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

// 나의정보, 로그아웃 최상단 버튼입니다.
const MyinfoDiv = styled.div``;

const PhoneNumDiv = styled.div`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  gap: 20px;
`;
const NicknameDiv = styled.div`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 20px;
  .input {
    border: 1px solid black;
    outline: 1px solid blue;
  }
`;
const GenderDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 20px;
`;
const CommentDiv = styled.div`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  gap: 20px;
`;
const CommentTextArea = styled.textarea`
  font-size: 20px;
  width: 350px;
  height: 111px;
`;
const SaveBtn = styled.button`
  background-color: #71c9dd;
  border-radius: 10px;
  border: none;
  width: 700px;
  height: 40px;
`;
const ProfileImgDiv = styled.div`
  input {
    display: none;
  }
`;

// 사진 첨부 버튼입니다.
const RechangeImgBtn = styled.button`
  width: 200px;
  height: 40px;
  margin-top: 20px;
  margin-right: 50px;
  background-color: #757575;
  color: white;
  border: none;
  border-radius: 30px;
`;
const Customer = styled.div`
  justify-content: space-between;
  margin-top: 30px;
  width: 700px;
  display: flex;
  .button1 {
    border: 2px solid #71c9dd;
    border-radius: 20px;
  }
  .button2 {
    border: 2px solid #71c9dd;
    border-radius: 20px;
  }
`;
export default MyPage;
