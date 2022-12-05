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
import { trainApi, trainApi2 } from "../../Redux/Modules/instance";

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

  console.log(token);

  const thURL = process.env.REACT_APP_TH_S_HOST;

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
  }, [form?.representProfile]);
  console.log(representProfile);

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
  console.log(url);
  console.log(form);

  //컴포넌트로 할거면 다 컴포넌트로 할것.
  return (
    <>
      <MyinfoDiv>
        <div className="logoutbox">
          <span style={{ fontSize: "20" }}>나의 정보</span>
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
      <Wrap>
        <div className="profilebutton">
          <div className="profilename">프로필</div>
        </div>
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
              <PhoneNumberInput
                name="phoneNumber"
                value={form?.phoneNumber}
                // 폰넘버를 겟에서 받아온 그걸 적어라
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
          {/* <SaveBtn onClick={() => imgSubmitHandler()}>저장 버튼</SaveBtn>
      </div>
      <div></div>
      <div className="client">
        <button>고객유의사항</button>
        <button>고객이용가이드</button> */}
          <SaveBtn onClick={() => imgSubmitHandler()}>저장</SaveBtn>
        </div>
        <CancelBtn>취소</CancelBtn>
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
    </>
  );
};
const Wrap = styled.div`
  @media only screen and (min-width: 375px) {
    width: 375px;
    height: 812px;
  }
  justify-content: center;
  align-items: center;
  background-color: #e6e6e6;
  position: absolute;

  // 프로필 테두리
  .profilebutton {
    @media only screen and (min-width: 375px) {
      width: 114px;
      height: 44px;
    }
    align-items: center;
    justify-content: center;
    display: flex;

    // 👆 프로필 글씨체 중앙으로 바꾸는 코드
    box-sizing: border-box;
    width: 114px;
    height: 44px;
    left: 133px;
    top: 126px;
    border: 2px solid #71c9dd;
    border-radius: 30px;

    // 프로필 이름
    .profilename {
      width: 56px;
      height: 24px;
      left: 162px;
      top: 136px;

      font-family: "Inter";
      font-style: normal;
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
      color: #5b5b5b;
    }
  }
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

// 흰색 박스입니다.
const AttachPicture = styled.div`
  @media only screen and (min-width: 375px) {
    width: 343px;
    height: 194px;
  }

  .information {
    width: 343px;
    height: 194px;
    border: none;
    position: relative;
  }
  color: black;
  width: 700px;
  height: 350px;
  padding: 60px;
  border-radius: 100px;
  border: none;
  background-color: #ffffff;
  z-index: 999;
  margin: 40px;
  display: flex;
  flex-direction: row;
`;

// 맨위 나의정보 옆에 로그아웃 버튼입니다.
const LogoutBtn = styled.button`
  /* background: #71c9dd; */
  border: none;
  border-radius: 10px;
  color: black;
  width: 90px;
  /* height: 40px; */
  /* display: flex; */
  justify-content: end;
  // 이곳은 텍스트만 움직임
  // 건드리면 텍스만 바뀜
  /* text-align: right; */

  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
`;

// 사진 첨부 프리뷰입니다.
const ImgPreview = styled.img`
  @media only screen and (min-width: 375px) {
    width: 100px;
    height: 100px;
  }

  border-style: solid;
  border: none;
  width: 50px;
  height: 200px;
  margin-right: 50px;
  position: relative;
`;

const UploadImage = styled.input`
  height: 30px;
`;

const ViewImage = styled.button`
  /* height: 30px;
  position: absolute;
  //포지션 쓸때 잘 봐야함
  left: 50%; */
  right: 35%;
  margin-top: 350px;
`;
// 나의정보, 로그아웃 최상단 버튼입니다.
const MyinfoDiv = styled.div`
  background-color: #c3f4ff;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 400;
  line-height: 21.78px;
  width: 100vw;
`;

// 여기서부터 휴대폰, 닉네임, 성별, 상태메세지
const PhoneNumDiv = styled.div`
  @media only screen and (min-width: 375px) {
    width: 140px;
    height: 30px;
  }
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;

  gap: 20px;
`;
const NicknameDiv = styled.div`
  @media only screen and (min-width: 375px) {
    width: 140px;
    height: 30px;
  }
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
// 성별

//각각 갭 따로따로 넣어라
const GenderDiv = styled.div`
  @media only screen and (min-width: 375px) {
    width: 30px;
    height: 22px;
  }
  display: flex;
  justify-content: left;
  gap: 20px;
  margin-top: 20px;
`;
const CommentDiv = styled.div`
  @media only screen and (min-width: 375px) {
    width: 196px;
    height: 60px;
  }
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  gap: 20px;
  /* width: 95%; */
`;
const CommentTextArea = styled.textarea`
  @media only screen and (min-width: 375px) {
    width: 196px;
    height: 60px;
  }
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  gap: 20px;
  font-size: 20px;
  width: 350px;
  height: 111px;
`;

// 저장 버튼
const SaveBtn = styled.button`
  @media only screen and (min-width: 375px) {
    width: 320px;
    height: 48px;
  }
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: #71c9dd;
  border-radius: 10px;
  border: none;
  width: 700px;
  height: 40px;
`;

// 취소 버튼
const CancelBtn = styled.button`
  @media only screen and (min-width: 375px) {
    width: 320px;
    height: 48px;
  }
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-top: 20px;
  background-color: #f5f5f5;
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
// 사진 첨부 버튼을 줄여야 휴대폰, 닉네임 사이 갭이 줄여짐
const RechangeImgBtn = styled.button`
  @media only screen and (min-width: 375px) {
    width: 100px;
    height: 20px;
  }
  width: 200px;
  height: 40px;
  margin-top: 20px;
  margin-right: 10px;
  background-color: #757575;
  color: white;
  border: none;
  border-radius: 30px;
`;

//고객유의사항, 고객이용가이드입니다.
const Customer = styled.div`
  @media only screen and (min-width: 375px) {
    width: 300px;
    height: 30px;
  }
  justify-content: space-between;
  margin-top: 30px;
  width: 700px;
  display: flex;

  .button1 {
    @media only screen and (min-width: 375px) {
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
  .button2 {
    @media only screen and (min-width: 375px) {
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

export default MyPage;

const PhoneNumberInput = styled.div`
  width: 140px;
  height: 30px;
`;

//사진첨부마진 너무 먹고있다
// 부모 먼저 보고 타고타고 내려와야한다
