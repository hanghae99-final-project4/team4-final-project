import axios from "axios";
import { useEffect } from "react";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import useInput from "../MyTools/Hooks/UseInputOrigin";
import BlankImg from "../Assets/Empty_img.jpg";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
//섬네일
// const SignUpthumbnail = () => {
//     const inputRef = useRef

//추가정보기입란
const SignUp = () => {
  //취소버튼시 로그아웃하면서 로그인창으로
  const [, , removeCookie] = useCookies(["token"]);
  //cookie에서 토큰꺼내기
  const cookies = new Cookies();
  const token = cookies.get("token");
  console.log(token);
  const headers = {
    authorization: `${token}`,
  };
  const navigator = useNavigate();
  //꺼낸 토큰 디코딩하기
  // const accesstoken = jwtDecode(token);
  // console.log(accesstoken);

  const [files, setFiles] = useState([]);
  console.log(files);
  const thURL = process.env.REACT_APP_TH_S_HOST;
  let [fileImg, setFileImg] = useState([]);
  console.log(fileImg);
  const [check, setCheck] = useState(false);
  const [form, onChangeValue, reset] = useInput({
    representProfile: "",
    phoneNumber: "",
    authCode: "",
    nickname: "",
    gender: check,
  });

  console.log(form);
  //input값 접근
  const inputRef = useRef([]);
  //파일 미리볼 url을 저장해줄 state
  // const [url, setUrl] = useState("");
  // const [imageFile, setImageFile] = useState(null);
  // const [fileImg, setFileImg] = useState([]);
  //파일 저장

  //파일 target
  const onImgChange = (e) => {
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
  //인증요청

  const onNumberRequest = async (e) => {
    e.preventDefault();
    // console.log(1);

    try {
      const { data } = await axios.post(`${thURL}/auth2/phone`, {
        phoneNumber: form.phoneNumber,
      });
      // console.log(data);
      alert(data.msg);
    } catch (err) {
      console.log(err);
      const errMsg = err.response.data.errorMessage;
      alert(errMsg);
    }
  };
  //인증확인

  const onAuthNumber = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${thURL}/auth2/compare`, {
        phoneNumber: form.phoneNumber,
        authCode: form.authCode,
      });
      // console.log(data);
      const msg = data.msg;
      alert(msg);
    } catch (err) {
      // console.log(err);
      const msg = err.response.data.error;
      alert(msg);
    }
  };

  //인증확인 더블클릭시
  const onDoubleClick = (e) => {
    e.preventDefault();
    alert("비정상적인 활동이 발견됐습니다. 다시 로그인해 주세요.");
    removeCookie("token", { path: "/" });
    navigator(-2);
  };

  //업로드 버튼 (2) - 다른 버전
  // console.log(inputRef);

  //업로드 버튼(1) 클릭시
  const onSubmit = async (e) => {
    e.preventDefault();
    // inputRef.current.click();

    const fd = new FormData();
    console.log(fd);
    fd.append("representProfile", fileImg.files);
    fd.append("phoneNumber", form.phoneNumber);
    fd.append("gender", true);
    fd.append("nickname", form.nickname);
    for (let pair of fd.entries()) {
      console.log(pair);
    }
    await axios
      .post(`${thURL}/user`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res);

        const msg = res.data.msg;
        alert(msg);
        navigator("/subwaypage");
      })
      .catch((err) => {
        // console.log(err);

        // const status = err.response.status;
        // console.log(status);
        const msg = err.response.data.msg;
        alert(msg);
        return;
      });
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
      <div className="w-[375px] rounded-[5px] border mx-[auto] my-[25%]">
        <h1 className="text-center">회원정보를 입력해주세요!</h1>
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
                  value={form.representProfile}
                  accept="image/*"
                  ref={inputRef}
                  onChange={onImgChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={onClickFilesInput}
                  className="bg-blue-200 rounded-[5px] mx-[auto] my-[0px]"
                >
                  파일업로드
                </button>
              </div>
              <div>
                <div className="flex flex-col">
                  <label className="sm:text-sm">닉네임</label>
                  <input
                    name="nickname"
                    type="text"
                    value={form.nickname}
                    minLength="2"
                    maxLength="10"
                    placeholder="닉네임 입력"
                    onChange={onChangeValue}
                    className="border-b-[1px] focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="hidden sm:text-sm">휴대전화번호</label>
                  <input
                    name="phoneNumber"
                    type="text"
                    value={form.phoneNumber}
                    onChange={onChangeValue}
                  />
                  <button
                    onDoubleClick={onDoubleClick}
                    onClick={(e) => onNumberRequest(e)}
                  >
                    인증요청
                  </button>
                  <input
                    type="text"
                    name="authCode"
                    value={form.authCode}
                    placeholder="인증번호를 입력해주세요"
                    onChange={onChangeValue}
                    className="border-b-[1px]"
                  />
                  <button onClick={(e) => onAuthNumber(e)}>인증확인</button>
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
                <div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeCookie("token", { path: "/" });
                      navigator(-2);
                    }}
                    className="float-left"
                  >
                    취소
                  </button>
                  <button onClick={(e) => onSubmit(e)}>전송</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
