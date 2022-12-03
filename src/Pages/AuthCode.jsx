import axios from "axios";
import styled from "styled-components";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import useOnput from "../MyTools/Hooks/UseOnput";
import BlankImg from "../Assets/Empty_img.jpg";
import { useNavigate } from "react-router-dom";
import infoReq from "../Assets/InfoReq.svg";
import next from "../Assets/NextBtn.svg";
import { trainApi, trainApi2 } from "../Redux/Modules/Instance";
import FooterNext from "../Components/Footer/FooterNext";
import FrontHeader from "../Components/Header/FrontHeader";

const AuthCode = () => {
  const [, , removeCookie] = useCookies(["token"]);

  const cookies = new Cookies();
  const token = cookies.get("token");
  // const token = getCookie("token");/
  console.log(token);

  const navigator = useNavigate();
  const [files, setFiles] = useState([]);
  console.log(files);

  // const thURL = process.env.REACT_APP_TH_S_HOST;
  const yhURL = process.env.REACT_APP_YH_HOST;

  let [fileImg, setFileImg] = useState([]);
  console.log(fileImg);
  const [check, setCheck] = useState(false);
  const [form, onChangeValue, reset] = useOnput({
    representProfile: "",
    phoneNumber: "",
    authCode: "",
    nickname: "",
    gender: check,
  });
  const [disable, setDisable] = useState(false);

  const inputRef = useRef([]);

  //파일 target
  const onImgChange = (e) => {
    const fileList = e.target.files[0];
    //File {name: 'profile01.png', lastModified: 1668816585952, lastModifiedDate: Sat Nov 19 2022 09:09:45 GMT+0900 (한국 표준시), webkitRelativePath: '', size: 692520, …}
    const url = URL.createObjectURL(fileList);
    console.log(url);
    setFileImg({
      files: fileList,
      thumbnail: url,
    });
  };

  //인증확인 더블클릭시
  const onDoubleClick = (e) => {
    e.preventDefault();
    return;
    // alert("비정상적인 활동이 발견됐습니다. 다시 로그인해 주세요.");
    // removeCookie("token", { path: "/" });
    // navigator(-2);
  };

  //인증요청
  const onNumberRequest = async (e) => {
    e.preventDefault();

    try {
      const { data } = await trainApi.postAuthPhone({
        phoneNumber: form.phoneNumber,
      });
      console.log(data);
      alert(data.msg);
    } catch (err) {
      console.log(err);
      const errMsg = err.response.data.error;
      alert(errMsg);
    }
  };
  //인증확인

  const onAuthNumber = async (e) => {
    e.preventDefault();

    try {
      const { data } = await trainApi.postAuthCode({
        phoneNumber: form.phoneNumber,
        authCode: form.authCode,
      });
      console.log(data);
      const msg = data.msg;
      alert(msg);
    } catch (err) {
      console.log(err);
      const errMsg = err.response.data.error;
      alert(errMsg);
    }
  };

  //업로드 버튼(1) 클릭시
  console.log("0_token", token);
  const onSubmit = async (e) => {
    e.preventDefault();

    console.log("1_token", token);
    const fd = new FormData();
    console.log(fd);
    fd.append("representProfile", fileImg.files);
    fd.append("phoneNumber", form.phoneNumber);
    fd.append("gender", true);
    fd.append("nickname", form.nickname);

    for (let pair of fd.entries()) {
      console.log(pair);
    }
    console.log("2_token", token);
    await trainApi2
      .postForm(fd)
      //res 값으로 request에서 에러 처리를
      .then((res) => {
        //new토큰이 들어온 자리
        console.log(res);

        const msg = res.data.msg;
        alert(msg);
        // navigator("/subwaypage");
      })
      .catch((err) => {
        console.log(err);

        const msg = err.response.data.msg;
        const er = err.response.data.error;
        msg ? alert(msg) : er ? alert(er) : <></>;
        return;
      });
    // }
  };
  //---------------------------------------
  const onClickFilesInput = (e) => {
    e.preventDefault();
    inputRef.current?.click();
  };

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
        <div className="relative h-[770px] rounded-[5px] mx-[auto] my-[0px]">
          <FrontHeader msg="회원가입" />
          <div className="w-[375px] after:rounded-[5px] pt-[30px] px-[20px]  mx-[auto] my-[0px]">
            <h1 className="text-[1.4rem] font-bold">
              기본 정보를 입력해주세요!
            </h1>
            <div className="w-[100%] mx-[auto] mt-[30px] mb-[0px] flex flex-col items-center">
              <div className="w-[100%] rounded-[10px]">
                <form className="flex flex-col">
                  <div className="flex flex-col justify-center items-center gap-[10px]">
                    <div className=" flex flex-col gap-[10px] mt-[30px]">
                      <div className="w-[330px] mx-[auto] my-[0px] flex flex-col justify-center ">
                        <h2 className="text-[0.8rem] font-[600]">
                          휴대폰 인증
                        </h2>
                        <div className="w-[330px] flex flex-row items-center gap-[8px] text-[0.8rem] border-b-[1px] ">
                          <input
                            type="radio"
                            className="float-left w-[18px] h-[18px]"
                          />

                          <label htmlFor="allCheck">
                            <p className="text-[1rem]">
                              본인 확인을 위한 약관 모두 동의
                            </p>
                          </label>
                        </div>
                      </div>
                      <div>
                        <div className="flex gap-[10px]">
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
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <div className="absolute bottom-0">
                      <div className="w-[335px] flex flex-col gap-[5px]">
                        <OkBtn onClick={(e) => onSubmit(e)}>확인</OkBtn>
                        <CancelBtn
                          onClick={(e) => {
                            e.preventDefault();
                            removeCookie("token", { path: "/" });
                            navigator(-2);
                          }}
                        >
                          취소
                        </CancelBtn>
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

export default AuthCode;

const InfoBox = styled.div`
  width: 100%;
  height: 770px;
  @media only screen and (min-width: 375px) {
    font-size: 1.3rem;
  } ;
`;

/* 취소 */

const CancelBtn = styled.button`
  width: 320px;
  height: 48px;

  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  line-height: 27px;
  color: #5b5b5b;

  font-size: 1.2rem;
  font-weight: 700;
`;

const OkBtn = styled.button`
  width: 320px;
  height: 48px;

  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  line-height: 27px;
  color: #5b5b5b;

  background-color: #c3f4ff;

  font-size: 1.2rem;
  font-weight: 700;
`;
