import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import useInput from "../../MyTools/Hooks/UseInput";
//삼항연산자 엑박 안뜸 해보기 더미 넣기
//보더값 주기

const MyPage = () => {
  const [files, setFiles] = useState([]);
  const [check, setCheck] = useState(false);
  const [url, setUrl] = useState("");
  const [form, OnChangeHandler, reset] = useInput([]);
  console.log(files);

  async function imgSubmitHandler() {
    const formData = new FormData();
    formData.append("profileImage", files);
    formData.append("phoneNumber", form.phoneNumber);
    formData.append("gender", true);
    formData.append("nickname", form.nickname);
    formData.append("comments", form.comment);
    for (var pair of formData.entries()) {
      console.log(pair);
    }
    try {
      const { data } = await axios.post("http://13.209.17.182/user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    // .then((res) => {
    //   setImg(res.data.location);

    //   alert("성공");
    // })
    // .catch((err) => {
    //   alert("실패");
    // });
  }
  const formSubmit = (e) => {
    setFiles(e.target.files[0]);
    setUrl(URL.createObjectURL(e.target.files[0]));
  };
  // 폼데이터를 객체로 한번에 보내주는거 만들기
  // const formData = new FormData();
  // formData.append("file", postPicture[0]);
  // formData.append("postNickname", value.postNickname);
  // formData.append("postGender", value.postGender);

  console.log(url);
  console.log(form);

  return (
    <Wrap>
      프로필
      <div className="logoutbox">
        나의 정보
        <YellowBtn>로그아웃</YellowBtn>
      </div>
      <AttachPicture>
        <div className="img-preview">
          <ImgPreview id="img-preview" src={url} />
        </div>
        <UploadImage
          type="file"
          name="profile"
          value={form.profile}
          accept="image/*"
          multiple="multiple"
          id="img"
          onChange={formSubmit}
        ></UploadImage>
        <button onClick={() => imgSubmitHandler()}>사진변경하기</button>
        <div className="information">
          휴대전화 번호
          <input
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={OnChangeHandler}
          />
          닉네임
          <input
            onChange={OnChangeHandler}
            name="nickname"
            value={form.nickname}
          />
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
          <br />
          <textarea
            placeholder="Comment-plz"
            onChange={OnChangeHandler}
            name="comment"
            value={form.comment}
          >
            코멘트 적는 곳
          </textarea>
        </div>
        {/* 폼데이터 객체로 한번에 보내줘야한다 */}
      </AttachPicture>
      <div></div>
      <div className="client">
        <button>고객유의사항</button>
        <button>고객이용가이드</button>
      </div>
    </Wrap>
  );
};
const Wrap = styled.div`
  text-align: center;
  .logoutbox {
    border: 1px solid black;
    padding: 10px;
  }
  .client > button {
    margin-top: 100px;
  }
`;

const AttachPicture = styled.div`
  .information {
    margin-top: 60px;
  }
  color: gray;
  width: 400px;
  padding: 60px;
  border: 3px solid gray;
  margin: 40px;
  display: inline-block;
`;

const YellowBtn = styled.button`
  text-align: right;
  background: yellow;
  color: black;
  padding: 10px;
`;

const ImgPreview = styled.img`
  border-style: solid;
  border-color: red;
  width: 250px;
  height: 250px;
  margin: 30px;
  position: absolute;
  left: 10%;
  right: 50%;
`;

const UploadImage = styled.input`
  height: 30px;
  position: absolute;
  left: 15%;
  right: 30%;
  margin-top: 300px;
`;

const ViewImage = styled.button`
  height: 30px;
  position: absolute;
  left: 50%;
  right: 35%;
  margin-top: 350px;
`;

export default MyPage;

// app 밑에 넣어주는 코드

// let formData = new FormData();

// const onFileChange = (e) => {
//   console.log(e.target.files[0]);
//   if (e.target && e.target.files[0]) {
//     formData.append("file", e.target.files[0]);
//   }
// };

// const SubmitFileData = () => {
//   Axios.post("https://v2.convertapi.com/upload", { formData })
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

{
  /* 유튜브로 배운 이미지 업로드 코드 */
}
{
  /* <div>
          <input
            type="file"
            accept="image/*"
            name="file_upload"
            onChange={onFileChange}
          />
        </div>
        <div>
          <button onClick={SubmitFileData}>Submit Data</button>
        </div> */
}

{
  /* <form
          action="http://localhost/upload.php"
          method="post"
          enctype="multipart/form-data"
        >
          <input type="file" name="profile" />
          <input type="submit" />
        </form> */
}
