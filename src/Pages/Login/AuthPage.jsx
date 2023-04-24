import React from "react";

import Auth from "../../Components/Login/Auth";
import { Wrap } from "./EmailPage";
import Header from "../../Components/Header/Header";

const AuthPage = () => {
  return (
    <Wrap>
      <Header msg={""} margin="63px" />
      <Auth />
    </Wrap>
  );
};

export default AuthPage;
