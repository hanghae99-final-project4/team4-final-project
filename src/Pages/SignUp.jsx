import axios from "axios";
import styled from "styled-components";
import { useEffect } from "react";
import React, { useMemo, useRef, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import useInput from "../MyTools/Hooks/UseInputOrigin";
import BlankImg from "../Assets/Empty_img.jpg";
import { useNavigate } from "react-router-dom";
import infoReq from "../Assets/InfoReq.svg";
import cancle from "../Assets/CancleBtn.svg";
import next from "../Assets/NextBtn.svg";
//섬네일
// const SignUpthumbnail = () => {
//     const inputRef = useRef

//추가정보기입란
const SignUp = () => {
  //취소버튼시 로그아웃하면서 로그인창으로
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  //쿼리 token 가져오기
  let getParameter = (key) => {
    return new URLSearchParams(window.location.search).get(key);
  };
  const code = getParameter("sexybaby");
  // console.log(code);
  //cookie에서 토큰꺼내기
  const cookies = new Cookies();
  const token = cookies.get("token");

  // console.log(token);

  const navigator = useNavigate();
  const [files, setFiles] = useState([]);
  // console.log(files);
  //서버 체인져
  const thURL = process.env.REACT_APP_TH_S_HOST;
  // const thURL = process.env.REACT_APP_YJ_HOST;
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
  const [disable, setDisable] = useState(false);

  // console.log(form);
  //input값 접근
  const inputRef = useRef([]);
  //파일 미리볼 url을 저장해줄 state
  //파일 저장

  //구글,카카오 로그인 할 경우 파라미터 값 가져와서 토큰 쿠키에 장착하기.
  useEffect(() => {
    if (code !== null) {
      removeCookie("token");
      setCookie("token", code, { path: "/" });
    }
  }, []);

  //파일 target
  const onImgChange = (e) => {
    const fileList = e.target.files[0];
    // console.log(fileList);
    // console.log(fileList.name);
    // 하나의 파일만을 올릴 것이기 때문에 fileList배열에는
    //[0]번째 인덱스에 해당하는 공간에만 파일이 존재
    // console.log(fileList);
    //fileList모양
    //File {name: 'profile01.png', lastModified: 1668816585952, lastModifiedDate: Sat Nov 19 2022 09:09:45 GMT+0900 (한국 표준시), webkitRelativePath: '', size: 692520, …}
    const url = URL.createObjectURL(fileList);
    // console.log(url);
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
      // console.log(err);
      const errMsg = err.response.data.error;
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
      const errMsg = err.response.data.error;
      alert(errMsg);
    }
  };

  //업로드 버튼(1) 클릭시
  const onSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    // console.log(fd);
    fd.append("representProfile", fileImg.files);
    fd.append("phoneNumber", form.phoneNumber);
    fd.append("gender", true);
    fd.append("nickname", form.nickname);
    // fd.append("authCode", form.authCode);
    for (let pair of fd.entries()) {
      // console.log(pair);
    }
    try {
      const { data } = await axios.post(`${thURL}/user`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(data);

      if (data.newtoken !== undefined) {
        removeCookie("token");
        setCookie("token", data.newtoken, { path: "/" });
      }
      navigator("/subwaypage");
    } catch (error) {
      console.log(error);
    }
  };
  //---------------------------------------
  const onClickFilesInput = (e) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  //이미지 파일 미리보기 - 이미지가 null값이면
  // console.log(fileImg);
  const showImage = useMemo(() => {
    if (!fileImg && fileImg == null) {
      return <img src={BlankImg} alt="emptyProfile" />;
    } else if (fileImg !== null) {
      return (
        <img
          src={fileImg.thumbnail}
          alt={fileImg.type}
          className="w-[120px] h-[120px] bg-[#D9D9D9] rounded-[5px]"
          onClick={onClickFilesInput}
        />
      );
    }
  }, [fileImg]);

  return (
    <>
      <InfoBox className=" flex-col items-center">
        <div className="relative h-[812px] rounded-[5px] mx-[auto] my-[0px]">
          <div className="h-[45px] flex justify-center items-center bg-[#D9D9D9] text-center text-[1.2rem] font-bold"></div>
          <div className="w-[375px] rounded-[5px] pt-[30px] px-[20px]  mx-[auto] my-[0px]">
            <h1 className="text-[20px] font-bold">기본정보를 입력해주세요!</h1>
            <div className="w-[100%] mx-[auto] mt-[30px] mb-[0px] flex flex-col items-center">
              <div className="w-[120px] h-[120px] mb-[2px]">{showImage}</div>
              <div className="w-[100%] rounded-[10px]">
                <form className="flex flex-col gap-[30px] ">
                  <div className="flex flex-col">
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
                      className="w-[120px] h-[30px] bg-[#C3F4FF] rounded-[5px] mx-[auto] my-[0px] text-[0.8rem] font-bold"
                    >
                      파일업로드
                    </button>
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <div className="flex flex-col">
                      <label className="text-[0.8rem] font-bold">닉네임</label>
                      <input
                        name="nickname"
                        type="text"
                        value={form.nickname}
                        minLength="1"
                        maxLength="10"
                        placeholder="닉네임 입력"
                        onChange={onChangeValue}
                        className="w-[155px] h-[30px] text-[1rem] rounded-[4px] border-b-[1px] focus:border-indigo-500"
                      />
                    </div>
                    {/* onfocus또는 focus css로 포커스되면 뜨게 */}
                    {form.nickname.length === 0 ? (
                      <div className="text-[#FB5002] text-[0.8rem]">
                        닉네임은 1자 이상 10자 이하로 적어주세요
                      </div>
                    ) : form.nickname.length <= 0 ? (
                      <></>
                    ) : (
                      <div></div>
                    )}
                    <div className="flex flex-col gap-[10px]">
                      <div className="flex gap-[10px] mt-[30px]">
                        <input
                          name="phoneNumber"
                          type="text"
                          value={form.phoneNumber}
                          placeholder="휴대폰 11자리"
                          onChange={onChangeValue}
                          className="float-left w-[220px] text-[1rem] border-b-[1px] focus:border-indigo-500"
                        />
                        <button
                          onClick={(e) => onNumberRequest(e)}
                          className="flex justify-center"
                        >
                          <img
                            src={infoReq}
                            alt="inforeq"
                            className="w-[74px] h-[30px]"
                          />
                        </button>
                      </div>
                      <div className="flex gap-[10px]">
                        <input
                          type="text"
                          name="authCode"
                          value={form.authCode}
                          placeholder="인증번호 입력"
                          onChange={onChangeValue}
                          className="w-[220px] text-[1rem] border-b-[1px] focus:border-indigo-500"
                        />
                        <button
                          onClick={(e) => onAuthNumber(e)}
                          className="w-[74px] h-[30px] py-[5px] px-[10px] bg-[#C3F4FF] rounded-[15px] text-[0.8rem] font-bold"
                        >
                          인증확인
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-[10px]">
                      <div className="text-[0.8rem] font-bold mt-[30px]">
                        성별
                      </div>
                      <div className="flex justify-center">
                        <div className="float-left mr-[61px]">
                          <input
                            type="checkbox"
                            name="gender"
                            // checked={check}
                            value={form.gender}
                            // onChange={() => setCheck(true)}
                            onChange={() => setDisable(true)}
                            disabled={disable}
                          />
                          남성
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            // checked={check}
                            name="gender"
                            value={form.gender}
                            // onChange={() => setCheck(false)}
                            onChange={() => setDisable(true)}
                            disabled={disable}
                          />
                          여성
                        </div>
                      </div>
                      <div>
                        <h2 className="text-[0.8rem] font-bold mt-[30px]">
                          카테고리
                        </h2>
                        <div className="text-[#D9D9D9] font-bold">
                          서비스 준비중입니다.
                        </div>
                      </div>
                      <div className="absolute bottom-0">
                        <div className="w-[335px]">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              removeCookie("token", { path: "/" });
                              navigator("/");
                            }}
                            className="w-[160px] float-left"
                          >
                            <img src={cancle} alt="cancle" />
                          </button>
                          <button
                            onClick={(e) => onSubmit(e)}
                            className="w-[160px] float-right"
                          >
                            <img src={next} alt="next" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </InfoBox>
    </>
  );
};

export default SignUp;

const InfoBox = styled.div`
  width: 100%;
  height: 812px;

  @media screen and (min-width: 320px) and (max-width: 375px) {
    font-size: 1.3rem;
  } ;
`;
