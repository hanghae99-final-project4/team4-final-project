import axios from "axios";
import styled from "styled-components";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import useInput from "../MyTools/Hooks/UseInput";
import BlankImg from "../Assets/Empty_img.jpg";
import { useNavigate } from "react-router-dom";
import infoReq from "../Assets/InfoReq.svg";
import cancle from "../Assets/SmallCancel.svg";
import next from "../Assets/NextBtn.svg";
import { trainApi, trainApi2 } from "../Redux/Modules/Instance";
import male from "../Assets/Gender/Male.svg";
import female from "../Assets/Gender/Female.svg";
import maleColor from "../Assets/Gender/MaleColor.svg";
import femaleColor from "../Assets/Gender/FemaleColor.svg";
import Headers01 from "../Components/Headers/Headers01";
import InfoCategory from "../Components/InfoCatagory/InfoCategory";
import FrontHeader from "../Components/Header/FrontHeader";

const SignUp = () => {
  const navigator = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("token");
  // const token = getCookie("token");/
  const [, , removeCookie] = useCookies(["token"]);
  const [files, setFiles] = useState([]);
  let [fileImg, setFileImg] = useState([]);
  const [check, setCheck] = useState(false);
  const [form, setForm, onChangeValue, reset] = useInput({
    representProfile: "",
    nickname: "",
    gender: "",
    category: [],
  });
  const [isGender, setIsGender] = useState(false);
  const inputRef = useRef([]);
  const yhURL = process.env.REACT_APP_YH_HOST;

  console.log(token);
  console.log(files);
  console.log(fileImg);
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

  //닉네임 중복
  const authOk = async (e) => {
    e.preventDefault();
    await trainApi
      .postAuthCode({
        nickname: form.nickname,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //업로드 버튼(1) 클릭시
  console.log("0_token", token);
  const onSubmit = async (e) => {
    e.preventDefault();

    console.log("1_token", token);
    const fd = new FormData();
    console.log(fd);
    fd.append("representProfile", fileImg.files);
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
        navigator("/subwaypage");
      })
      .catch((err) => {
        console.log(err);

        const msg = err.response.data.msg;
        const er = err.response.data.error;

        return msg ? (
          alert(msg)
        ) : er ? (
          alert(er)
        ) : err.response.status === 422 ? (
          alert("필수 유저 정보를 입력해주세요.")
        ) : (
          <></>
        );
      });
    // }
  };
  //---------------------------------------
  const onClickFilesInput = (e) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  const showImage = useMemo(() => {
    if (fileImg === undefined) {
      return (
        <img
          src={BlankImg}
          alt={fileImg.type}
          className="w-[120px] h-[120px]"
          onClick={onClickFilesInput}
        />
      );
    } else if (fileImg) {
      return (
        <img
          src={fileImg.thumbnail}
          alt={fileImg.type}
          className="w-[120px] h-[120px]"
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
          <div className="w-[375px] rounded-[5px] pt-[30px] px-[20px]  mx-[auto] my-[0px]">
            <h1 className="text-[20px] font-bold">프로필을 설정해주세요!</h1>
            <div className="w-[100%] mx-[auto] mt-[30px] mb-[0px] flex flex-col items-center">
              <div className="w-[120px] h-[120px] mb-[2px]">{showImage}</div>
              <div className="w-[100%] rounded-[10px]">
                <form className="flex flex-col gap-[20px] ">
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
                      className="w-[100px] h-[20px] flex justify-center items-center bg-[#fffff] shadow-[0px_4px_4px_rgba(0,0,0,0.3)] rounded-[20px] mx-[auto] my-[0px] text-[0.7rem]"
                    >
                      사진첨부
                    </button>
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <div className="flex flex-col">
                      <label className="text-[1rem] font-bold">닉네임</label>
                      <div className="w-[230px]">
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
                        <div className=" w-[74px] h-[30px] float-right flex justify-center items-center bg-[#C3F4FF] rounded-[20px] text-[0.8rem]">
                          <button onClick={(e) => authOk(e)}>중복확인</button>
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
                      <div className="flex justify-center">
                        <div className="float-left mr-[61px]">
                          <label htmlFor="male">
                            <img src={isGender ? male : maleColor} alt="male" />
                            <input
                              type="radio"
                              name="gender"
                              id="male"
                              value="male"
                              onChange={onChangeValue}
                              className=" w-[61px]"
                            />
                          </label>
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="female">
                            <img
                              src={isGender ? female : femaleColor}
                              alt="female"
                            />
                            <input
                              type="radio"
                              name="gender"
                              id="male"
                              value="female"
                              onChange={onChangeValue}
                              className=" w-[61px]"
                            />
                          </label>
                        </div>
                      </div>
                      <div>
                        <h2 className="text-[1rem] font-bold">카테고리</h2>
                        <div className="w-[313px] text-black font-bold">
                          <InfoCategory />
                        </div>
                      </div>
                      <div className="absolute bottom-0">
                        <div className="w-[335px]">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              removeCookie("token", { path: "/" });
                              navigator(-1);
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
  height: 770px;
  @media screen and (min-width: 320px) and (max-width: 375px) {
  } ;
`;
