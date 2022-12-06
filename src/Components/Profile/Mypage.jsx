import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import useInput from "../../MyTools/Hooks/UseInput";
import { useRef } from "react";
import { CloseCircleFilled } from "@ant-design/icons";
import { Cookies } from "react-cookie";
import { trainApi2 } from "../../Redux/Modules/Instance";
import { useNavigate } from "react-router-dom";
import HomeMenu from "../HomeMenu/HomeMenu";
import FrontHeader from "../Header/FrontHeader";
const MyPage = () => {
  const [isModal, setIsModal] = useState(false);
  const inputRef = useRef();
  const [files, setFiles] = useState([]);
  const [representProfile, setRepresentProfile] = useState([]);
  const [preview, setPreview] = useState();
  const [form, setForm, OnChangeHandler] = useInput([]);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const navigate = useNavigate();

  const thURL = process.env.REACT_APP_TH_S_HOST;
  const [gender, setGender] = useState(null);
  console.log(representProfile);
  useEffect(() => {
    async function getProfile() {
      const { data } = await axios.get(`${thURL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);

      setForm(data.body);
    }
    getProfile();
  }, [representProfile]);

  // 저장
  async function imgSubmitHandler() {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("profileImage", files[i].file);
    }

    formData.append("representProfile", representProfile[0]?.file);
    formData.append("phoneNumber", form.phoneNumber);
    formData.append("nickname", form.nickname);
    formData.append("statusmessage", form.statusmessage);
    formData.append("gender", gender);

    if (
      representProfile[0]?.file === undefined ||
      !form?.phoneNumber ||
      !form?.nickname ||
      !form?.statusmessage
    ) {
      window.alert("비어있는 내용을 채워주세요");
    } else {
      for (var pair of formData.entries()) {
        console.log(pair);
      }
      await trainApi2
        .postProfile(formData)
        .then((res) => {
          console.log(res);
          alert(res.data.msg);
        })
        .catch((err) => {
          console.log(err);
          const errMsg = err.response.data.error;
          alert(errMsg);
        });
    }
  }

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

    if (temp.length > 5) {
      temp = temp.slice(0, 5);
    }
    setFiles(temp.concat(files));
  };

  //preview 이미지 함수
  const thumb = files.map((item, index) => {
    return (
      <div>
        <CloseCircleFilled
          onClick={() => removeProfile(item.url)}
          style={{
            position: "relative",
            top: "18px",
            zIndex: "999",
            right: "0px",
            cursor: "pointer",
          }}
        />
        <ThumbImg
          onClick={() =>
            setRepresentProfile([
              {
                file: item.file,
                url: item.url,
              },
            ])
          }
          key={index}
          src={item.url}
          alt="image"
        />
      </div>
    );
  });

  const removeProfile = (deleteUrl) => {
    setFiles(files.filter((item) => item.url !== deleteUrl));
  };

  const fileImagePreview = (fileBlob) => {
    console.log(fileBlob);
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

  const checkOnlyOne = (checkThis) => {
    const checkboxes = document.getElementsByName("gender");
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        checkboxes[i].checked = false;
      } else checkboxes[i].value === "1" ? setGender(true) : setGender(false);
    }
  };

  //컴포넌트로 할거면 다 컴포넌트로 할것.
  return (
    <>
      <Wrap>
        <FrontHeader msg="나의정보" />

        <TitleBox>
          <div>
            <p style={{ fontSize: "24px", fontWeight: "700" }}>프로필</p>
          </div>
        </TitleBox>

        <ProfileBox>
          <ImgWrap>
            {representProfile?.length > 0 ? (
              <ImgBox
                style={{ transform: "scale(1)", borderRadius: "10px" }}
                id="img-preview"
                src={preview}
              />
            ) : (
              <ImgBox
                style={{ transform: "scale(1)", borderRadius: "10px" }}
                id="img-preview"
                src={form?.representProfile}
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
            <ImgButton onClick={() => setIsModal(true)}>사진 첨부</ImgButton>
          </ImgWrap>
          <InfoWrap>
            <ul>
              <li>
                <span>휴대폰</span>
                <InputInfo
                  name="phoneNumber"
                  value={form?.phoneNumber}
                  onChange={OnChangeHandler}
                ></InputInfo>
              </li>
              <li>
                <span>닉네임</span>
                <InputInfo
                  onChange={OnChangeHandler}
                  name="nickname"
                  value={form?.nickname}
                ></InputInfo>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start" }}>
                {/* <span>성별</span> */}
                {/* <div style={{ width: "80%" }}>
                  <CheckGender
                    type="checkbox"
                    name="gender"
                    value="1"
                    onChange={(e) => checkOnlyOne(e.target)}
                  />
                  <span>여성</span>
                  <CheckGender
                    type="checkbox"
                    name="gender"
                    value="2"
                    onChange={(e) => checkOnlyOne(e.target)}
                  />
                  <span>남성</span>
                </div> */}
              </li>
              <li
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  boxShadow: "4px 4px 4px hsla(0, 0%, 0%, 0.25)",
                  margin: 0,
                  borderRadius: "10px",
                }}
              >
                <AreaTitle>상태 메세지</AreaTitle>
                <textarea
                  style={{ width: "100%", height: "40px" }}
                  onChange={OnChangeHandler}
                  name="statusmessage"
                  value={form?.statusmessage}
                ></textarea>
              </li>
            </ul>
          </InfoWrap>
        </ProfileBox>

        <div style={{ margin: "1rem", marginTop: "33px" }}>
          <BottomStyle type={"save"} onClick={() => imgSubmitHandler()}>
            저장
          </BottomStyle>
          <BottomStyle
            type={"cancle"}
            onClick={() => {
              navigate("/");
            }}
          >
            취소
          </BottomStyle>
        </div>
        <Customer>
          <button
            className="button-notice"
            onClick={() => {
              window.alert("서비스 준비중입니다.");
              navigate("/mypage");
            }}
          >
            고객유의사항
          </button>
          <button
            className="button-guide"
            onClick={() => {
              window.alert("서비스 준비중입니다.");
              navigate("/CustomerUserGuide");
            }}
          >
            고객이용가이드
          </button>
        </Customer>
        <div></div>
        {isModal ? (
          <ModalCtn>
            <ModalWrap>
              <ModalProfileDiv>{thumb}</ModalProfileDiv>
              <ProfileSetBtn onClick={() => PictureUpload()}>
                프로필 사진 바꾸기
              </ProfileSetBtn>
              <ProfileCloseBtn
                onClick={() => {
                  if (representProfile[0]?.file === undefined) {
                    setIsModal(!isModal);
                  } else {
                    fileImagePreview(representProfile[0]?.file);
                    setIsModal(!isModal);
                  }
                }}
              >
                저장 후 나가기
              </ProfileCloseBtn>
            </ModalWrap>
          </ModalCtn>
        ) : null}
      </Wrap>
      <HomeMenu />
    </>
  );
};
export default MyPage;

const Wrap = styled.div`
  margin: 0 auto;
  max-width: 412px;
  min-width: 375px;
  width: 100%;
  height: 100%;
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

const ProfileBox = styled.div`
  height: 200px;
  margin: 0 1rem 0 1rem;
  padding: 2rem;

  box-shadow: 4px 4px 4px hsla(0, 0%, 0%, 0.25);
  border-radius: 30px;
  display: flex;
  align-items: center;
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
  background: ${(props) => (props.type === "save" ? "#C3F4FF" : "#fff")};
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
  display: ${(isModal) => (isModal ? "block" : "none")};
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
