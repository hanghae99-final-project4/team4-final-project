import axios from "axios";
import styled from "styled-components";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import phoneauth from "../Assets/SignUp/PhoneAuth.svg";
import norminfo from "../Assets/SubSign/NormInfo.svg";

const AuthCode = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);

  // const token = getCookie("token");/
  const cookies = new Cookies();
  const token = cookies.get("token");
  // console.log(token);

  const navigator = useNavigate();
  const [files, setFiles] = useState([]);
  // console.log(files);

  const inputRef = useRef([]);
  let [fileImg, setFileImg] = useState([]);
  // console.log(fileImg);

  const [check, setCheck] = useState(false);
  const [form, setForm, onChangeValue, reset] = useInput({
    representProfile: "",
    phoneNumber: "",
    authCode: "",
    nickname: "",
    gender: check,
  });

  //파라미터 key값 가져오기
  let getParameter = (key) => {
    return new URLSearchParams(window.location.search).get(key);
  };
  const code = getParameter("sexybaby");

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
    //File {name: 'profile01.png', lastModified: 1668816585952, lastModifiedDate: Sat Nov 19 2022 09:09:45 GMT+0900 (한국 표준시), webkitRelativePath: '', size: 692520, …}
    const url = URL.createObjectURL(fileList);
    // console.log(url);
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
      //새로운 토큰 안올때가 undefined 오면 값을 token 저장
      if (data.newtoken !== undefined) {
        removeCookie("token");
        setCookie("token", data.newtoken, { path: "/" });
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
  //인증확인

  const onAuthNumber = async (e) => {
    e.preventDefault();

    try {
      const { data } = await trainApi.postAuthCode({
        phoneNumber: form.phoneNumber,
        authCode: form.authCode,
      });
      // console.log(data);
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
  // console.log("0_token", token);

  // 3분 타이머

  //---------------------------------------

  return (
    <>
      <InfoBox className="w-[375px] flex flex-col items-center">
        <div className="relative w-[375px] h-[770px] rounded-[5px] mx-[auto] my-[0px] shadow-[0px_4px_4px_rgba(0,0,0,0.3)]">
          <FrontHeader msg="회원가입" />
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
                            <img src={signcheck} alt="signcheck" />
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
                          className="w-[330px] pb-[2px] text-[1rem] focus:border-indigo-500"
                        />
                      </div>
                      {/* 타이머 3분*/}
                      <div>
                        {/* {minutes}:{seconds < 10 ? `0${seconds}` : seconds} */}
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
