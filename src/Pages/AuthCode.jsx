import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import axios from "axios";
import styled from "styled-components";
import { Cookies, useCookies } from "react-cookie";
import useInput from "../MyTools/Hooks/UseInput";
import BlankImg from "../Assets/Empty_img.jpg";
import { useNavigate } from "react-router-dom";
import infoReq from "../Assets/InfoReq.svg";
import next from "../Assets/NextBtn.svg";
import { trainApi, trainApi2 } from "../Redux/Modules/Instance";
import FooterNext from "../Components/Footer/FooterNext";
import FrontHeader from "../Components/Header/FrontHeader";
import signcheck from "../Assets/SignUp/SignCheck.svg";
import signcheckhide from "../Assets/AuthCode/SignCheckHide.svg";
import { ReactComponent as Signcheck } from "../Assets/SignUp/SignCheck.svg";
import phoneauth from "../Assets/SignUp/PhoneAuth.svg";
import norminfo from "../Assets/SubSign/NormInfo.svg";
import { ReactComponent as AuthCodeOk } from "../Assets/AuthCode/AuthCodeOk.svg";
import authCodeOk from "../Assets/AuthCode/AuthCodeOk.svg";

const AuthCode = () => {
  const [, , removeCookie] = useCookies(["token"]);
  // const token = getCookie("token");/
  const cookies = new Cookies();
  const token = cookies.get("token");
  console.log(token);

  const navigator = useNavigate();
  const [files, setFiles] = useState([]);
  console.log(files);

  const inputRef = useRef([]);
  let [fileImg, setFileImg] = useState([]);
  console.log(fileImg);

  const [check, setCheck] = useState(false);
  const [form, setForm, onChangeValue, reset] = useInput({
    representProfile: "",
    phoneNumber: "",
    authCode: "",
    nickname: "",
    gender: check,
  });
  const [OkClick, setOkClick] = useState(false);
  const authcodeOk = () => {
    setOkClick(!OkClick);
    return (
      // <div ">
      <img
        src={signcheckhide}
        alt="sign"
        className="absolute z-100 top-[100px] w-[50%]"
      />
      // </div>
    );
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
      const status = err.response.status;
      const errMsg = err.response.data.error;
      const errMsg_501 = err.response.data.message;
      if (status === 400 && "이미 가입된 번호입니다") {
        alert(errMsg);
      } else if (
        status === 501 &&
        errMsg_501 ===
          "이미 인증번호가 전송된 유저입니다. 3분 뒤 다시 시도해주세요"
      ) {
        alert("이미 인증번호가 전송된 유저입니다. 3분 뒤 다시 시도해주세요");
      } else {
        alert(errMsg);
      }
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
      if (msg === "인증되었습니다") {
        navigator("/addinfo");
        alert(msg);
      }
    } catch (err) {
      console.log(err);
      const status = err.response.status;
      const errMsg = err.response.data.error;
      if (status === 400 && "이미 가입된 번호입니다") {
        alert(errMsg);
      } else {
        alert(errMsg);
      }
    }
  };

  //업로드 버튼(1) 클릭시
  // 3분 타이머

  //---------------------------------------

  return (
    <>
      <InfoBox className="w-[375px] flex flex-col items-center">
        <div className="relative w-[375px] h-[812px] rounded-[5px] mx-[auto] my-[0px]">
          <FrontHeader msg="추가 정보" />
          <div className="w-[375px] rounded-[5px] mx-[auto] my-[0px]">
            <h1 className="text-[1.4rem] pt-[60px] ml-[20px] font-bold items-center">
              <img src={norminfo} alt="normal_info" />
            </h1>
            <div className="w-[100%] mx-[auto] mt-[40%] mb-[0px] flex flex-col items-center">
              <div className="w-[100%] rounded-[10px]  ">
                <form className="flex flex-col">
                  <div className="flex flex-col justify-center items-center gap-[10px]">
                    <div className=" flex flex-col gap-[16px]">
                      <div className="w-[330px] mx-[auto] my-[0px] flex flex-col justify-center gap-[12px]">
                        <h2 className="text-[0.8rem] font-[600]">
                          <img src={phoneauth} alt="phoneauth" />
                        </h2>
                        <div className="w-[330px] pb-[6px] flex flex-row items-center gap-[8px] text-[0.8rem] border-b-[1px] border-[text-[rgba(0,0,0,0.5)]]">
                          <input
                            type="radio"
                            className="float-left w-[18px] h-[18px]"
                          />

                          <label htmlFor="allCheck" className="p-[2px]">
                            <img
                              // src={signcheckhide}
                              src={!OkClick ? authCodeOk : signcheckhide}
                              alt="signcheck"
                              className="absolute z-100 top-[100px] left-[10%] w-[300px]"
                              onClick={authcodeOk}
                            />
                            <img src={signcheck} alt="" onClick={authcodeOk} />
                          </label>
                        </div>
                      </div>
                      <div>
                        <div className="w-[330px] flex gap-[10px] ">
                          <input
                            name="phoneNumber"
                            type="text"
                            value={form.phoneNumber}
                            placeholder="휴대폰 11자리"
                            onChange={onChangeValue}
                            className="float-left w-[240px] pb-[2px] text-[1rem] border-b-[1px] focus:border-indigo-500"
                          />
                          <button
                            onClick={(e) => onNumberRequest(e)}
                            className="rounded-[22px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
                          >
                            <img
                              src={infoReq}
                              alt="inforeq"
                              className="w-[74px] h-[30px]"
                            />
                          </button>
                        </div>
                      </div>
                      {/* 받은 인증번호 입력 */}
                      <div className="flex gap-[10px] border-b-[1px] ">
                        <input
                          type="text"
                          name="authCode"
                          value={form.authCode}
                          placeholder="인증 번호 입력"
                          onChange={onChangeValue}
                          className="w-[330px] pb-[2px] text-[1rem] border-b-[1px] focus:border-indigo-500"
                        />
                      </div>
                      {/* 타이머 3분*/}
                      <div>
                        {/* {minutes}:{seconds < 10 ? `0${seconds}` : seconds} */}
                        {/* {min} : {sec} */}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-[10px]">
                    <div className="mx-[auto] my-[0px]">
                      <div className="w-[335px] mt-[30px] flex flex-col items-center gap-[5px]">
                        <OkBtn
                          onClick={(e) => onAuthNumber(e)}
                          className="w-[74px] h-[30px] bg-[#C3F4FF] rounded-[15px] text-[0.8rem] font-bold"
                        >
                          확인
                        </OkBtn>
                        <CancelBtn
                          onClick={(e) => {
                            e.preventDefault();

                            navigator(-1);
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
  height: 812px;
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
