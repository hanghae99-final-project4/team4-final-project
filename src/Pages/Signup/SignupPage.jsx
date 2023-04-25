import React from "react";
import { Wrap } from "../Login/EmailPage";
import Header from "../../Components/Header/Header";
import Agree from "../../Components/Signup/Agree";
import SubSign from "../SubSign";
const SignupPage = () => {
  return (
    <Wrap>
      <Header msg={"가입하기"} margin="94px" />
      <SubSign />
    </Wrap>
  );
};

export default SignupPage;
