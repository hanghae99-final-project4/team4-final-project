import axios from "axios";
import styled from "styled-components";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import BlankImg from "../Assets/Empty_img.jpg";
import { useNavigate } from "react-router-dom";
import infoReq from "../Assets/InfoReq.svg";
import cancle from "../Assets/CancleBtn.svg";
import next from "../Assets/NextBtn.svg";
import { trainApi, trainApi2 } from "../Redux/Modules/Instance";
import useInput from "../MyTools/Hooks/UseInput";
import dbOk from "../Assets/NameOk/NameOk.svg";
import male from "../Assets/Gender/Male.svg";
import female from "../Assets/Gender/Female.svg";

const AddInfo = () => {
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

  const [isClick, setClick] = useState(false);
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
                    <div className="w-[130px] flex flex-col">
                      <label className="text-[1rem] font-bold">닉네임</label>
                      <div className="w-[130px] flex flex-row">
                        <input
                          name="nickname"
                          type="text"
                          value={form.nickname}
                          minLength="1"
                          maxLength="10"
                          placeholder="닉네임 입력"
                          onChange={onChangeValue}
                          className="w-[155px] h-[30px] text-[1.2rem] rounded-[4px] border-b-[1px] focus:border-indigo-500"
                        />
                        <div className="float-right">
                          <button>
                            <img src={dbOk} alt="doubleOk" />
                          </button>
                        </div>
                      </div>
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
                      <div className="text-[1rem] font-bold mt-[30px]">
                        성별
                      </div>
                      <div className="flex justify-center gap-[61px]">
                        <div className="float-left flex flex-col">
                          <label htmlFor="male">
                            <img src={male} alt="male" />
                            <input
                              type="radio"
                              name="gender"
                              id="male"
                              value="true"
                              onChange={onChangeValue}
                              className=" w-[61px] h-[95px]"
                            />
                          </label>
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="female">
                            <img src={female} alt="female" />

                            <input
                              type="radio"
                              name="gender"
                              id="male"
                              value="false"
                              onChange={onChangeValue}
                            />
                          </label>
                        </div>
                      </div>
                      <div>
                        <h2 className="text-[1rem] font-bold mt-[30px]">
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

export default AddInfo;

const InfoBox = styled.div`
  width: 100%;
  height: 812px;
  @media screen and (min-width: 320px) and (max-width: 375px) {
    font-size: 1.3rem;
  } ;
`;
