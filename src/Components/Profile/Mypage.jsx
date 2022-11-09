import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
//Ref 이나 그런거 미리 작성해놓기
const MyPage = () => {
  const [img, setImg] = useState("");
  const [url, setUrl] = useState("");

  const imgSubmitHandler = () => {
    const formData = new FormData();
    formData.append("file", img);

    axios
      .post("이미지 요청 주소", formData)
      .then((res) => {
        setImg(res.data.location);

        alert("성공");
      })
      .catch((err) => {
        alert("실패");
      });
  };
  const formSubmit = (e) => {
    const img = e.target.files[0];
    setUrl(URL.createObjectURL(e.target.files[0]));
  };

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
          accept="image/*"
          id="img"
          onChange={formSubmit}
        ></UploadImage>
        <button onClick={() => imgSubmitHandler()}>여기누르세요</button>
        <div className="information">
          <div>닉네임</div>
          <div>성별</div>
          <input type="checkbox" name="남성" />
          남성
          <input type="checkbox" name="여성" />
          여성
          <br />
          <textarea placeholder="Comment-plz">코멘트 적는 곳</textarea>
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
  text-align: center;
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
