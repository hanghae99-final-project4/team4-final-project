import React, { useState } from "react";
import styled from "styled-components";
import useInput from "../../MyTools/Hooks/UseInput";
import { useNavigate } from "react-router-dom";
import { trainApi } from "../../apis/Instance";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const Signup = () => {
  const navigator = useNavigate();
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
        "비밀번호를 8~15자로 영문 대소문자, 숫자, 특수문자를 조합해서 사용하세요."
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

  // 아이디 중복
  const IdOk = async (e) => {
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
  const onSignup = async (data) => {
    const email = data.email;
    const name = data.name;
    const password = data.password;
    const passwordconfirm = data.passwordconfirm;
    try {
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
      <SignForm onSubmit={handleSubmit(onSignup)}>
        <InfoBox>
          <Emailinput type="text" placeholder="이름" {...register("name")} />
          <Errormessage>{errors?.name?.message}</Errormessage>
        </InfoBox>
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
