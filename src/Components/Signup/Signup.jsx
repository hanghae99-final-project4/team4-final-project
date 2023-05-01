import React, { useState } from "react";
import styled from "styled-components";
import useInput from "../../MyTools/Hooks/UseInput";
import { useNavigate } from "react-router-dom";
import { trainApi } from "../../apis/Instance";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { useAgreeState } from "../../Recoil/userList";

const Signup = () => {
  const navigator = useNavigate();
  const [Info, setInfo, onChangeValue, reset] = useInput({
    account: "",
    password: "",
    confirmpassword: "",
    nickname: "",
  });
  const agreepi = useRecoilValue(useAgreeState);

  //yup schema
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("이메일을 입력해주세요")
      .matches(
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{3}$/,
        "올바른 이메일 형식으로 작성 해주세요."
      ),

    password: yup
      .string() //문자열 체크

      .required("비밀번호를 입력해주세요") // 빈칸인지 체크
      .matches(
        /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,15}$/,
        "영어+숫자를  8글자 이상 입력해주세요"
      ) // 정규식 체크 후
      .min(8, "비밀번호는 최소 8글자 이상입니다.") //비밀번호 최소 자리 체크
      .max(30, "비밀번호는 최대 30글자 이상입니다."), // 비밀번호 최대 자리 체크
    passwordconfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다."),
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
  console.log(errors);

  //확인버튼
  const onSignup = async (data) => {
    const email = data.email;

    const password = data.password;
    const passwordconfirm = data.passwordconfirm;
    try {
      const { data } = await trainApi.postSubSign({
        account: email,
        password: password,
        password2: passwordconfirm,
        agreepi: agreepi,
      });
      console.log(data);
      const msg = data.msg;
      if (msg === "성공") {
        alert("회원가입이 되셨습니다.");
        navigator("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrap>
      <SignForm onSubmit={handleSubmit(onSignup)}>
        <InfoBox>
          <Emailinput type="text" placeholder="이메일" {...register("email")} />
          <Errormessage>{errors?.email?.message}</Errormessage>
        </InfoBox>
        <InfoBox>
          <Emailinput
            type="password"
            placeholder="비밀번호"
            {...register("password")}
          />
          <Errormessage>{errors?.password?.message}</Errormessage>
        </InfoBox>
        <InfoBox>
          <Emailinput
            type="password"
            placeholder="비밀번호 확인"
            {...register("passwordconfirm")}
          />
          <Errormessage>{errors?.passwordconfirm?.message}</Errormessage>
        </InfoBox>
        <SignupButton type="submit">다음</SignupButton>
      </SignForm>
    </Wrap>
  );
};

export default Signup;
// 에러 메세지
const Errormessage = styled.div`
  color: #d14343;
  height: 25px;
  font-weight: 500;
  margin-top: 3.33px;
  font-family: "Pretendard";
  font-size: 14px;
`;
const InfoBox = styled.div`
  width: 343px;
  height: 76px;
  display: flex;
  flex-direction: column;
`;
const Emailinput = styled.input`
  border-bottom: 1px solid #e3e3e3;
  width: 343px;
  height: 50.67px;
  outline: none;
  color: #4d4d4d;
  font-size: 16px;
  font-weight: 400;
`;
const Wrap = styled.div`
  margin-top: 98px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const SignForm = styled.form`
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
