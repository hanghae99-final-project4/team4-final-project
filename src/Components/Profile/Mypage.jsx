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

  console.log(token);

  const thURl = process.env.REACT_APP_YJ_HOST;

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
  }, []);

  // const onGetInfo = async () => {
  //   try {
  //     //headers에 토큰넣어서 get하면 해당 토큰에 대한 정보들 받아올 수 있음.
  //     const { data } = await axios.get(`${thURl}/profile`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     //get한 data
  //     console.log(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  //get(name, [options])

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
  console.log(url);
  console.log(form);

  return (
    <Wrap>
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

      <AttachPicture>
        <ProfileImgDiv>
          <div className="img-preview">
            <ImgPreview
              style={{ transform: "scale(1)", borderRadius: "10px" }}
              id="img-preview"
              src={form.representProfile}
            />
          </div>
          <UploadImage
            maxSize={314572800}
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
              // 폰넘버를 겟에서 받아온 그걸 적어라
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
      <div></div>
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

//악시오스를 써라 //리퀘스트로 뭘 보내라\
// 악시오스 겟을 쓰는게 더 났다 겟할때 요청url말고 보낼수있는 인자
// 인증토큰(엑세스토큰) 어디다 저장하기로했나? 이걸 물어보기
// 리프레시토큰 엑세스 토큰 소셜로그인 사용하면...
// 로그인될때 어디 저장되는지 알아야함
// 세션이나 로컬에 저장이 될거임
// getItemtoken? 토큰 가져오는 코드 한줄 쓰고
// 악시오스 겟 할때 데이터에 실어서 보낼거다
// 어싱크 어웨이트

// 물어볼것
// 로컷 스토리지에 토큰이 있냐? 어디에 존재하냐?
// 어떤 키값으로 되어있냐? 여쭤보기
// 구글링할때 어디에 존재하는 토큰을 가져올때 검색해보기
// 리턴 밑에 잘 분배해서 뿌려주면된다

// useEffect(() => {
//   const requestOptions = {
//     method: "GET",
//     redirect: "follow",
//   };
//   axios(`${process.env.REACT_APP_YJ_HOST}/user`, requestOptions)
//     .then((response) => response.json())

//     // []
//     // setRepresentProfile([]) 배열로 들어오면 이걸 그대로 써라
//     // 셋리프레젠트프리필에 넣어주라
//     // 셋 이미지
//     .then((result) => setPhotos(result))
//     .catch((error) => console.log("error".error));
// }, []);

// get 리스폰즈값을 받으면 배열에 저장해서 그 배열을 맵을 돌려서 아이템값을 지정해줘라
// get요청을 하면 보내준다 닉네임같은걸 그값을 유저프로필이라는 스테이트를 만들어서 셋 유저 프로필을 그 값을 넣어준다
// 그럼 그값이 들어간다 맞는 장소에 값을 넣어주면 띄어진다
//쿠키의 바디값이 뭔지 알아야함!!
//리스폰스값
