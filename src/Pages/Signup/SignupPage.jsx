import React from "react";
import { Wrap } from "../Login/EmailPage";
import Header from "../../Components/Header/Header";
import Signup from "../../Components/Signup/Signup";

const SignupPage = () => {
  return (
    <Wrap>
      <Header msg={"가입하기"} margin="94px" />
      <Signup />
    </Wrap>
  );
};

export default SignupPage;
