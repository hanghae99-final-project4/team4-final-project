import axios from "axios";
import styled from "styled-components";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import useOnput from "../MyTools/Hooks/UseOnput";
import BlankImg from "../Assets/Empty_img.jpg";
import { useNavigate } from "react-router-dom";
import infoReq from "../Assets/InfoReq.svg";
import cancle from "../Assets/CancleBtn.svg";
import next from "../Assets/NextBtn.svg";
import { trainApi, trainApi2 } from "../Redux/Modules/Instance";
import FooterNext from "../Components/Footer/FooterNext";
import useInput from "../MyTools/Hooks/UseInput";

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
  const [form, setForm, onChangeValue, reset] = useInput({
    representProfile: "",
    phoneNumber: "",
    authCode: "",
    nickname: "",
    gender: "",
  });
  const [disable, setDisable] = useState(false);

  const inputRef = useRef([]);

  //인증확인 더블클릭시
  const onDoubleClick = (e) => {
    e.preventDefault();
    alert("비정상적인 활동이 발견됐습니다. 다시 로그인해 주세요.");
    removeCookie("token", { path: "/" });
    navigator(-2);
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
    fd.append("gender", form.gender);
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

  //초기값

  return (
    <>
      <InfoBox className=" flex-col items-center">
        <div className="relative h-[812px] rounded-[5px] mx-[auto] my-[0px]">
          <div className="h-[45px] flex justify-center items-center bg-[#D9D9D9] text-center text-[1.2rem] font-bold"></div>
          <div className="w-[375px] rounded-[5px] pt-[30px] px-[20px]  mx-[auto] my-[0px]">
            <h1 className="text-[20px]">기본 정보를 입력해주세요!</h1>
            <div className="w-[100%] mx-[auto] mt-[30px] mb-[0px] flex flex-col items-center">
              <div className="w-[100%] rounded-[10px]">
                <form className="flex flex-col gap-[30px] ">
                  <div className="flex flex-col gap-[4px]">
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
                      <div className="absolute bottom-0">
                        <div className="w-[335px]">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              removeCookie("token", { path: "/" });
                              navigator(-2);
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
                    <div>
                      <input
                        type="radio"
                        name="gender"
                        id="male"
                        value="true"
                        onChange={onChangeValue}
                      />
                      <label htmlFor="radio">남성</label>
                      <input
                        type="radio"
                        name="gender"
                        id="male"
                        value="false"
                        onChange={onChangeValue}
                      />
                      <label htmlFor="radio1">여성</label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </InfoBox>
      <FooterNext />
    </>
  );
};

export default AuthCode;

const InfoBox = styled.div`
  width: 100%;
  height: 812px;
  @media screen and (min-width: 320px) and (max-width: 375px) {
    font-size: 1.3rem;
  } ;
`;
