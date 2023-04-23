import React from "react";
import { Wrap } from "./EmailPage";
import Header from "../Components/Header/Header";
import Auth from "../Components/Login/Auth";

const AuthPage = () => {
  return (
    <Wrap>
      <Header msg={""} />
      <Auth />
    </Wrap>
  );
};

export default AuthPage;
