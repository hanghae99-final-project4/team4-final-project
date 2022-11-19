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
  const inputRef = useRef([]);
  //파일 미리볼 url을 저장해줄 state
  const [files, setFiles] = useState([]);
  const [check, setCheck] = useState(false);
  // const [url, setUrl] = useState("");
  // const [imageFile, setImageFile] = useState(null);
  let [fileImg, setFileImg] = useState([]);
  // const [fileImg, setFileImg] = useState([]);
  console.log(fileImg);
  //파일 저장
  // const saveFileImg = (e) => {
  //   setFileImg(URL.createObjectURL(e.target.files[0]));
  // };
  console.log(files);
  //파일 target
  const onImgChange = async (e) => {
    const fileList = e.target.files[0];
    console.log(fileList);
    console.log(fileList.name);
    // 하나의 파일만을 올릴 것이기 때문에 fileList배열에는
    //[0]번째 인덱스에 해당하는 공간에만 파일이 존재
    // console.log(fileList);
    //fileList모양
    //File {name: 'profile01.png', lastModified: 1668816585952, lastModifiedDate: Sat Nov 19 2022 09:09:45 GMT+0900 (한국 표준시), webkitRelativePath: '', size: 692520, …}
    const url = URL.createObjectURL(fileList);
    console.log(url);
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
    const yjUrl = process.env.REACT_APP_YJ_HOST;
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
      .post(`"${yjUrl}/user"`, fd, {
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
    inputRef.current?.click();
  };

  //이미지 파일 미리보기 - 이미지가 null값이면
  console.log(fileImg);
  const showImage = useMemo(() => {
    if (!fileImg && fileImg == null) {
      return <img src={BlankImg} alt="emptyProfile" />;
    } else if (fileImg !== null) {
      //
      return (
        <img
          src={fileImg.thumbnail}
          alt={fileImg.type}
          onClick={onClickFilesInput}
        />
      );
    }
  }, [fileImg]);

  return (
    <>
      <div className="w-[325px] rounded-[5px] border mx-[auto] my-[25%]">
        <h1>프로필을 설정해주세요!</h1>
        <div className="w-[100%] mx-[auto] my-[0px] border flex flex-col items-center">
          <div className="w-[150px] h-[150px]">{showImage}</div>

          <div className="w-[100%] rounded-[1px] border">
            <form>
              <div>
                {/* 이미지 업로드 */}
                <input
                  type="file"
                  id="img"
                  name="profile"
                  value={form.profileImg}
                  accept="image/*"
                  ref={inputRef}
                  onChange={onImgChange}
                  className=""
                />
                {/* <button
                label="이미지 업로드"
                onClick={onUploadImageButtonClick}
              ></button> */}
                <button type="button" onClick={onClickFilesInput}>
                  파일업로드
                </button>
              </div>
              <div className="flex flex-col">
                <label className="sm:text-sm">닉네임</label>
                <input
                  name="nickname"
                  type="text"
                  value={form.nickname}
                  placeholder="닉네임 입력"
                  onChange={onChangeValue}
                  className="border-b-[1px] focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="sm:text-sm">휴대전화번호</label>
                <input
                  name="phoneNumber"
                  type="text"
                  value={form.phoneNumber}
                  onChange={onChangeValue}
                />
              </div>
              <div className="sm:text-sm">성별</div>
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
      </div>
    </>
  );
};

export default SignUp;
