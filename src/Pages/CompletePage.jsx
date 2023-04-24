import React from "react";
import { Wrap } from "./EmailPage";
import Header from "../Components/Header/Header";
import Complete from "../Components/Login/Complete";

const CompletePage = () => {
  return (
    <Wrap>
      <Header msg={""} />
      <Complete />
    </Wrap>
  );
};

export default CompletePage;
