import React, { useState } from "react";
import styled from "styled-components";
import useInput from "../MyTools/Hooks/UseInput";
import FrontHeader from "../Components/Header/FrontHeader";
import { useCookies } from "react-cookie";
import userid from "../Assets/SubSign/UserId.svg";
import pw from "../Assets/SubSign/Password.svg";
import pwConfirm from "../Assets/SubSign/PasswordConfirm.svg";
import norminfo from "../Assets/SubSign/NormInfo.svg";
import { useNavigate } from "react-router-dom";
import { trainApi } from "../apis/Instance";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const SubSign = () => {
  const navigator = useNavigate();
  const [, , removeCookie] = useCookies(["token"]);
  const [Info, setInfo, onChangeValue, reset] = useInput({
    account: "",
    password: "",
    confirmpassword: "",
    nickname: "",
  });
  //yup schema
  const schema = yup.object().shape({
    name: yup
      .string() //문자열 제일먼저 체크

      .required("이름을 입력해주세요.") //다음 빈칸인지 체크
      .matches(/^[가-힣]{2,20}$/, "2~20자로 입력해주세요."), //다음 정규식 체크
    password: yup
      .string() //문자열 체크

      .required("비밀번호를 입력해주세요") // 빈칸인지 체크
      .matches(
        /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,30}$/,
        "비밀번호를 8~30자로 영문 대소문자, 숫자, 특수문자를 조합해서 사용하세요."
      ) // 정규식 체크 후
      .min(8, "비밀번호는 최소 8글자 이상입니다.") //비밀번호 최소 자리 체크
      .max(30, "비밀번호는 최대 30글자 이상입니다."), // 비밀번호 최대 자리 체크
  });
  //react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const pattern_empty = /\s/g;

  // 아이디 중복
  const IdOk = async (e) => {
    e.preventDefault();
    //아이디유효성
    const pattern_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    if (Info.account.trim() === "" || Info.account.trim() === "\n") {
      alert("빈칸을 채워주세요!");
      return;
    } else if (pattern_kor.test(Info.account) === true) {
      alert("6자~15자로 영문 혹은 영문+숫자로 조합해주세요!");
      return;
    } else if (Info.account.length < 6 || Info.account.length > 16) {
      alert("6자~15자로 영문 혹은 영문+숫자로 조합해주세요!");
      return;
    } else if (pattern_empty.test(Info.account) === true) {
      alert("공백을 채워주세요!");
      return;
    }

    await trainApi
      .postUserId({
        account: Info.account,
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
    try {
      e.preventDefault();
      const { data } = await trainApi.postSubSign({
        account: Info.account,
        password: Info.password,
        password2: Info.confirmpassword,
      });
      console.log(data);
      const msg = data.msg;
      if (msg === "성공") {
        alert("회원가입이 되셨습니다.");
        navigator("/");
      }
    } catch (err) {
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
    }
  };

  return (
    <Wrap>
      <SignForm>
        <Emailinput type="text" placeholder="이름" />
        <Emailinput type="text" placeholder="이메일" />
        <Emailinput type="text" placeholder="비밀번호" />
        <Emailinput type="text" placeholder="비밀번호 확인" />
      </SignForm>
      <SignupButton>다음</SignupButton>
    </Wrap>
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

const Emailinput = styled.input`
  border-bottom: 1px solid #e3e3e3;
  width: 343px;
  height: 50px;
  outline: none;
`;
const Wrap = styled.div`
  margin-top: 98px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const SignForm = styled.form`
  gap: 26px;
  display: flex;
  flex-direction: column;
  font-family: Pretendard;
  font-weight: 400;
  font-size: 16px;
`;

const SignupButton = styled.button`
  margin-top: 56px;
  width: 343px;
  height: 50px;
  color: #ffffff;
  background-color: rgba(250, 58, 69, 0.3);
`;
