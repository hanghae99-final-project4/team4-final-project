import React from "react";
import styled from "styled-components";
import useInput from "../MyTools/Hooks/UseInput";
import FrontHeader from "../Components/Header/FrontHeader";
import { trainApi } from "../Redux/Modules/Instance";
import { useCookies } from "react-cookie";
import userid from "../Assets/SubSign/UserId.svg";
import pw from "../Assets/SubSign/Password.svg";
import pwConfirm from "../Assets/SubSign/PasswordConfirm.svg";
import norminfo from "../Assets/SubSign/NormInfo.svg";
import { useNavigate } from "react-router-dom";

const SubSign = () => {
  const navigator = useNavigate();
  const [, , removeCookie] = useCookies(["token"]);
  const [Info, setInfo, onChangeValue, reset] = useInput({
    snsId: "",
    password: "",
    confirmpassword: "",
  });

  // 아이디 중복
  const IdOk = async (e) => {
    e.preventDefault();
    await trainApi
      .postUserId({
        snsId: Info.snsId,
      })
      .then((res) => {
        // console.log(res);
        const msg = res.data.msg;
        alert(msg);
      })
      .catch((err) => {
        // console.log(err.status);
        const status = err.status;
        const msg = err.response.data.error;

        alert(msg);
        return;
      });
  };
  //확인버튼
  const onSignup = async (e) => {
    e.preventDefault();

    // }
    await trainApi
      .postSubSign({
        snsId: Info.snsId,
        password: Info.password,
        confirmpassword: Info.confirmpassword,
      })
      .then((res) => {
        // console.log(res);
        const msg = res.data.msg;
        if (msg === "성공") {
          alert("회원가입이 되셨습니다.");
          navigator("/");
        }
      })
      .catch((err) => {
        // console.log(err);
        const status = err.response.status;
        const errMsg = err.response.data;
        const error = err.response.data.error;
        if (
          status === 422 &&
          errMsg === '"password" is not allowed to be empty'
        ) {
          alert("패스워드는 필수 입력 정보입니다.");
        } else if (
          status === 422 &&
          errMsg === '"confirmpassword" must be [ref:password]'
        ) {
          alert("비밀번호가 일치하지 않습니다.");
        } else if (status === 422) {
          alert(errMsg);
        } else if (status === 400) {
          alert(error);
        }
        return;
      });
  };

  return (
    <InfoBox className=" w-[375px] flex flex-col items-center">
      <div className="relative w-[375px] h-[812px] rounded-[5px] mx-[auto] my-[0px] ">
        <FrontHeader msg="회원가입" />
        <div className="w-[375px] rounded-[5px] mt-[60px] px-[20px] mx-[auto] my-[0px]">
          <h1>
            <img src={norminfo} alt="normal_info" />
          </h1>
          <form className="w-[100%] mx-[auto] mt-[50px] mb-[0px] flex flex-col ">
            <div className="mx-[auto] my-[0px] flex flex-col gap-[30px]">
              <div>
                <div>
                  <label className="text-[1rem]">
                    <img src={userid} alt="UserId" />
                  </label>
                  <div>
                    <div className="mt-[10px] flex justify-center">
                      <input
                        type="text"
                        name="snsId"
                        value={Info.snsId}
                        onChange={onChangeValue}
                        placeholder="아이디 입력"
                        className="w-[253px]  text-[1rem] border-b-[1px] border-[#71C9DD]"
                      />
                      <div className="w-[74px] h-[30px] flex justify-center float-right bg-[#C3F4FF] ml-[4px] p-[4px] rounded-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-[0.9rem] text-center">
                        <button onClick={(e) => IdOk(e)}>중복확인</button>
                      </div>
                    </div>
                  </div>
                </div>

                {Info.snsId.length <= 5 || Info.snsId.length >= 15 ? (
                  <ErrorMessage>
                    아이디는 6자~15자 이내로 영문 혹은 숫자를 조합해주세요.
                  </ErrorMessage>
                ) : (
                  <div></div>
                )}
              </div>
              <div>
                <label>
                  <img src={pw} alt="password" />
                </label>
                <div>
                  <div>
                    <input
                      type="password"
                      name="password"
                      value={Info.password}
                      onChange={onChangeValue}
                      placeholder="비밀번호 입력"
                      className="w-[253px] mt-[10px] pb-[2px] text-[1rem] border-b-[1px]  border-[#71C9DD]"
                    />
                  </div>
                  {Info.snsId.length === 0 ? (
                    <ErrorMessage>
                      비밀번호는 대,소문자 또는 숫자를 포함한 10자~20자 이하로
                      적어주세요
                    </ErrorMessage>
                  ) : Info.password.replace(" ", "").includes(Info.snsId) ? (
                    <ErrorMessage>
                      패스워드에 닉네임이 포함되어있습니다.
                    </ErrorMessage>
                  ) : Info.password.length <= 10 ||
                    Info.password.length >= 20 ? (
                    <ErrorMessage>
                      비밀번호는 대,소문자 또는 숫자를 포함한 10자~20자 이하로
                      적어주세요
                    </ErrorMessage>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div>
                <div>
                  <label className="text-[1rem]">
                    <img src={pwConfirm} alt="pwConfirm" />
                  </label>
                </div>
                <input
                  type="password"
                  name="confirmpassword"
                  value={Info.confirmpassword}
                  onChange={onChangeValue}
                  placeholder="비밀번호 입력"
                  className="w-[253px] mt-[10px] pb-[2px] text-[1rem] border-b-[1px]  border-[#71C9DD]"
                />
                {Info.password !== Info.confirmpassword ? (
                  <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            <div>
              <div className="flex flex-col items-center gap-[10px]">
                <div className="absolute bottom-[60px] w-[335px] mt-[100px] flex flex-col items-center gap-[5px]">
                  <OkBtn onClick={(e) => onSignup(e)}>확인</OkBtn>
                  <CancelBtn
                    onClick={(e) => {
                      e.preventDefault();
                      // removeCookie("token", { path: "/" });
                      navigator("/");
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
    </InfoBox>
  );
};

export default SubSign;
// 에러 메세지
const ErrorMessage = styled.div`
  width: 291px;
  color: #808080;

  margin-top: 4px;
  font-family: "MonoplexKR-Regular";
  font-size: 0.8rem;
`;

const InfoBox = styled.div`
  @media only screen and (min-width: 375px) {
    width: 100%;
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
