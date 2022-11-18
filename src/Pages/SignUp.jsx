import axios from "axios";
import { useEffect } from "react";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import useInput from "../MyTools/Hooks/UseInput";
import BlankImg from "../Assets/Empty_img.jpg";
//섬네일
// const SignUpthumbnail = () => {
//     const inputRef = useRef

//회원가입
const SignUp = () => {
  const [form, onChangeValue, reset] = useInput({
    profileImg: "",
    phoneNumber: "",
    nickname: "",
    gender: false,
  });

  console.log(form);
  // ();
  const inputRef = useRef();
  //파일 미리볼 url을 저장해줄 state
  const [files, setFiles] = useState([]);
  const [check, setCheck] = useState(false);
  // const [url, setUrl] = useState("");
  // const [imageFile, setImageFile] = useState(null);
  const [fileImg, setFileImg] = useState([]);

  //파일 저장
  // const saveFileImg = (e) => {
  //   setFileImg(URL.createObjectURL(e.target.files[0]));
  // };
  console.log(files);
  //파일 target
  const onImgChange = async (e) => {
    const fileList = e.target.files[0];
    console.log(fileList);
    // 하나의 파일만을 올릴 것이기 때문에 fileList배열에는
    //[0]번째 인덱스에 해당하는 공간에만 파일이 존재
    // console.log(fileList);

    const url = URL.createObjectURL(fileList);
    setFileImg({
      files: fileList,
      thumbnail: url,
      // type: fileList[0].type.slice(0, 5),
    });
  };

  // fd.append('file', e.target.files[0]);
  // return res = await axios.post('http://13.209.17.182/user', fd
  // , {
  //   headers: {
  //     "Content-Type": `multipart/form-data;`,
  //   }
  // }).then((res) => {
  //   if (res.data) {
  //     console.log(res.data)
  //   }
  // })

  // const onformSubmit = (e) => {
  //   setFiles(e.target.files[0]);
  //   setUrl(URL.createObjectURL(e.target.files[0]));

  //업로드 버튼 (2) - 다른 버전
  console.log(inputRef);
  // const onUploadImageButtonClick = useCallback(() => {
  //   if (!inputRef.current) {
  //     return;
  //   }
  //   inputRef.current.click();
  // }, []);

  //업로드 버튼(1) 클릭시
  const onSubmit = async (e) => {
    e.preventDefault();
    // inputRef.current.click();
    const fd = new FormData();
    console.log(fd);
    fd.append("profileImage", fileImg.files);
    fd.append("phoneNumber", form.phoneNumber);
    fd.append("gender", form.gender);
    fd.append("nickname", form.nickname);
    for (let pair of fd.entries()) {
      console.log(pair);
    }
    await axios
      .post("http://54.180.149.56/user", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => alert("접속!"))
      .catch((err) => alert("접속불가!"));
  };
  //---------------------------------------
  const onClickFilesInput = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  //이미지 파일 미리보기
  console.log(fileImg);
  const showImage = useMemo(() => {
    if (!fileImg && fileImg === "") {
      return <img src={BlankImg} alt="emptyProfile" />;
    }
    //db에
    // axios.get()
    return (
      <img
        src={fileImg.thumbnail}
        alt={fileImg.type}
        onClick={onClickFilesInput}
      />
    );
  }, [fileImg]);

  return (
    <>
      <h1>사진첨부</h1>
      <div>
        <div className="w-[150px] h-[150px]">{showImage}</div>

        <div>
          <form>
            <div>
              {/* 이미지 업로드 */}
              <input
                type="file"
                id="img"
                name="profile"
                value={form.profileImg}
                accept="image/*"
                multiple="multiple"
                ref={inputRef}
                onChange={onImgChange}
              />
              {/* <button
                label="이미지 업로드"
                onClick={onUploadImageButtonClick}
              ></button> */}
              <button type="button" onClick={onClickFilesInput}></button>
            </div>
            <label>휴대전화번호</label>
            <input
              name="phoneNumber"
              type="text"
              value={form.phoneNumber}
              onChange={onChangeValue}
            />
            <div>
              <label>닉네임</label>
              <input
                name="nickname"
                type="text"
                value={form.nickname}
                onChange={onChangeValue}
              />
            </div>
            <div>성별</div>
            <input
              type="checkbox"
              name="gender"
              value={form.gender}
              onChange={() => setCheck(false)}
            />
            남성
            <input
              type="checkbox"
              // checked={check}
              name="gender"
              value={form.gender}
              onChange={() => setCheck(true)}
            />
            여성
            <button onClick={(e) => onSubmit(e)}>전송</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
