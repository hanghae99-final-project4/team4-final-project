import React from "react";
import { Wrap } from "../Login/EmailPage";
import Header from "../../Components/Header/Header";
import StationSelect from "../../Components/Main/StationSelect";

const StationSelectPage = () => {
  return (
    <Wrap>
      <Header msg={"역 선택"} margin="101px" />
      <StationSelect />
    </Wrap>
  );
};

export default StationSelectPage;
