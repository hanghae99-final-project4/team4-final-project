import React from "react";

import { Wrap } from "../Login/EmailPage";
import Header from "../../Components/Header/Header";
import Signup from "../../Components/Signup/Signup";
import PickProfile from "../../Components/Signup/PickProfile";

const PickProfilePage = () => {
  return (
    <Wrap>
      <Header />
      <PickProfile />
    </Wrap>
  );
};

export default PickProfilePage;
